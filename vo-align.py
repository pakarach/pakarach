#!/usr/bin/env python3
"""Split a TTS voice-over into one clip per script paragraph and pack it for build.js.
usage: python3 vo-align.py voice.wav script.txt vo.json [silence_db=-40] [--cover cover.wav]
 - script.txt: paragraphs separated by blank lines, one paragraph per beat (every beat except cover/end).
 - Cover voice (series name / title read on frame 0): either start script.txt with a paragraph "COVER: <text>"
   (same audio file, first clip goes to the cover beat) or pass --cover cover.wav (a separate short file,
   prepended to the mp3). Either way vo.json gets "cover": [start, end] and the engine plays it at t=0.15.
 - Finds silences (10 ms RMS frames below silence_db, >= 0.25 s), then picks N-1 of them as paragraph
   breaks with dynamic programming: segment length vs. expected length from the paragraph's character
   count (TTS also pauses inside sentences, so the longest gaps alone are not reliable).
 - Prints each segment with its expected length (<< marks a poor fit) so the split can be sanity-checked.
 - Writes vo.json = {segs: [[start, end], ...] (seconds), b64: mono 64 kbps mp3}; build with --data vo=vo.json.
Needs numpy + ffmpeg (libmp3lame)."""
import sys, json, math, wave, base64, subprocess, tempfile, os
import numpy as np

args = sys.argv[1:]; cover_wav = None
if '--cover' in args: i = args.index('--cover'); cover_wav = args[i + 1]; del args[i:i + 2]
wav, txt, out = args[0], args[1], args[2]
thr = float(args[3]) if len(args) > 3 else -40.0
def load(path, sr=24000):  # any input -> mono float32 at sr (via ffmpeg)
    tmp = tempfile.mktemp(suffix='.wav'); subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', path, '-ac', '1', '-ar', str(sr), '-c:a', 'pcm_s16le', tmp], check=True)
    w = wave.open(tmp); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768; w.close(); os.remove(tmp); return a
sr = 24000; x = load(wav, sr)
hop = int(sr * 0.01); n = len(x) // hop
db = 20 * np.log10(np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9)
sil = db < thr; runs = []; i = 0
while i < n:
    if sil[i]:
        j = i
        while j < n and sil[j]: j += 1
        runs.append((i / 100, j / 100)); i = j
    else: i += 1
dur = len(x) / sr
paras = [p.strip() for p in open(txt, encoding='utf8').read().split('\n\n') if p.strip()]
cover_para = bool(paras) and paras[0].upper().startswith('COVER:')
if cover_para: paras[0] = paras[0].split(':', 1)[1].strip()
start = runs[0][1] if runs and runs[0][0] < 0.05 else 0.0
endt = runs[-1][0] if runs and runs[-1][1] > dur - 0.05 else dur
cand = [r for r in runs if r[0] > 0.05 and r[1] < dur - 0.05 and r[1] - r[0] >= 0.25]
P, N = len(paras), len(cand)
if N < P - 1: sys.exit(f'only {N} pauses for {P} paragraphs: ask for longer pauses between paragraphs or raise silence_db')
chars = [len(p.replace(' ', '')) + 2 * p.count(' ') for p in paras]
gap = np.mean(sorted([b - a for a, b in cand], reverse=True)[:P - 1])
rate = sum(chars) / (endt - start - gap * (P - 1)); exp = [c / rate for c in chars]
INF = 1e18
sc = lambda d, k: 4 * math.log(max(d, 0.05) / exp[k]) ** 2
dp = np.full((P, N), INF); bp = np.zeros((P, N), int)
for j in range(N): dp[0][j] = sc(cand[j][0] - start, 0) - 1.5 * (cand[j][1] - cand[j][0])
for k in range(1, P - 1):
    for j in range(k, N):
        best, bi = INF, -1
        for i2 in range(k - 1, j):
            if dp[k - 1][i2] >= INF: continue
            v = dp[k - 1][i2] + sc(cand[j][0] - cand[i2][1], k)
            if v < best: best, bi = v, i2
        dp[k][j] = best - 1.5 * (cand[j][1] - cand[j][0]); bp[k][j] = bi
best, bj = INF, -1
for j in range(N):
    if dp[P - 2][j] < INF:
        v = dp[P - 2][j] + sc(endt - cand[j][1], P - 1)
        if v < best: best, bj = v, j
chs = [bj]
for k in range(P - 2, 0, -1): chs.append(bp[k][chs[-1]])
chs = chs[::-1]; segs = []; a = start
for j in chs: segs.append((a, cand[j][0])); a = cand[j][1]
segs.append((a, endt))
for k, (a, b) in enumerate(segs):
    r = (b - a) / exp[k]
    print(f'{k:3d} {a:7.2f} {b - a:5.2f}s exp {exp[k]:4.2f}{"  <<" if r < 0.6 or r > 1.6 else ""}  {paras[k][:30]}')
cover = None
if cover_para: cover, segs = segs[0], segs[1:]
if cover_wav:  # prepend the separate cover clip + 0.5 s silence
    cx = load(cover_wav, sr); cdb = 20 * np.log10(np.abs(cx) + 1e-9); loud = np.where(cdb > thr)[0]
    cover = (loud[0] / sr, loud[-1] / sr) if len(loud) else (0.0, len(cx) / sr)
    off = len(cx) / sr + 0.5; x = np.concatenate([cx, np.zeros(int(sr * 0.5), np.float32), x]); segs = [(a + off, b + off) for a, b in segs]
    print(f'cover {cover[0]:.2f}-{cover[1]:.2f}s ({cover[1] - cover[0]:.2f}s) prepended, main shifted +{off:.2f}s')
elif cover: print(f'cover clip {cover[0]:.2f}-{cover[1]:.2f}s')
tw = tempfile.mktemp(suffix='.wav'); ww = wave.open(tw, 'wb'); ww.setnchannels(1); ww.setsampwidth(2); ww.setframerate(sr); ww.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); ww.close()
mp3 = tempfile.mktemp(suffix='.mp3')
subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', tw, '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k', mp3], check=True)
data = {'segs': [[round(a, 3), round(b, 3)] for a, b in segs], 'b64': base64.b64encode(open(mp3, 'rb').read()).decode()}
if cover: data['cover'] = [round(cover[0], 3), round(cover[1], 3)]
json.dump(data, open(out, 'w')); os.remove(mp3); os.remove(tw)
print(f'{P} paragraphs, voice {dur:.1f}s -> {out}')
