#!/usr/bin/env python3
"""Split a TTS voice-over into one clip per script paragraph and pack it for build.js.
usage: python3 vo-align.py voice.wav script.txt vo.json [silence_db=-40]
 - script.txt: paragraphs separated by blank lines, one paragraph per beat (every beat except cover/end).
 - Finds silences (10 ms RMS frames below silence_db, >= 0.25 s), then picks N-1 of them as paragraph
   breaks with dynamic programming: segment length vs. expected length from the paragraph's character
   count (TTS also pauses inside sentences, so the longest gaps alone are not reliable).
 - Prints each segment with its expected length (<< marks a poor fit) so the split can be sanity-checked.
 - Writes vo.json = {segs: [[start, end], ...] (seconds), b64: mono 64 kbps mp3}; build with --data vo=vo.json.
Needs numpy + ffmpeg (libmp3lame)."""
import sys, json, math, wave, base64, subprocess, tempfile, os
import numpy as np

wav, txt, out = sys.argv[1], sys.argv[2], sys.argv[3]
thr = float(sys.argv[4]) if len(sys.argv) > 4 else -40.0
w = wave.open(wav); sr = w.getframerate(); ch = w.getnchannels()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
if ch > 1: x = x.reshape(-1, ch).mean(1)
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
mp3 = tempfile.mktemp(suffix='.mp3')
subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', wav, '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k', mp3], check=True)
json.dump({'segs': [[round(a, 3), round(b, 3)] for a, b in segs], 'b64': base64.b64encode(open(mp3, 'rb').read()).decode()}, open(out, 'w'))
os.remove(mp3)
print(f'{P} paragraphs, voice {dur:.1f}s -> {out}')
