/* VE core v1.12 (one-size TikTok+Facebook layout: DATA.reel.dy moves captions and the 3D picture down; Reels-safe captions when DATA.reel.on: 30 px lower, 6% smaller, wider side margins; live audio scheduled ~6 s ahead so long voiced clips don't stutter; voice-over plays even when Play is pressed before it finishes decoding; MP4 waits for it; status line while loading; cover voice: DATA.vo.cover [s0,s1] plays at t=0.15 and grows the cover beat; VE.beats, VE.voice, VE.voiceBed shared by both kits; iris without the corner hairline; opaque end card; cover at t=0: captions with instant:true skip the pop-in, cfg.coverAt0 shows the series badge from frame 0; landscape-safe end frame + caption width; custom bed: {play(base,from,A)} for pre-rendered music; Render MP4 in the browser; bed vol; cfg.brandBar:false hides the top brand bar for calm/long-form videos) — shared engine for Dan's two shorts channels.
   Provides: canvas compositing, captions, brand intro/end frame, transitions,
   Web Audio (SFX library, beds, brand motif), transport UI,
   'Render MP4' (frame-by-frame WebCodecs H.264 + AAC, offline soundtrack) and 'WebM (real-time)' fallback.
   A video file only supplies data + scene builders: VE.run({...}). */
(function () {
  const VE = (window.VE = {});
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeBack = (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
  VE.u = { clamp, lerp, easeOut, easeIO, easeBack };

  /* ---------- camera keyframes: [{t,pos:[x,y,z],look:[x,y,z],fov}] ---------- */
  VE.camAt = function (keys, t, cam, drift) {
    let a = keys[0], b = keys[keys.length - 1];
    if (t <= a.t) b = a; else if (t >= b.t) a = b;
    else for (let i = 0; i < keys.length - 1; i++) if (t >= keys[i].t && t < keys[i + 1].t) { a = keys[i]; b = keys[i + 1]; break; }
    const k = a === b ? 0 : easeIO((t - a.t) / (b.t - a.t));
    const L = (p, q) => p.map((v, i) => lerp(v, q[i], k));
    const pos = L(a.pos, b.pos), look = L(a.look, b.look), d = drift || 0;
    cam.position.set(pos[0] + Math.sin(t * 0.5) * d, pos[1] + Math.cos(t * 0.4) * d * 0.5, pos[2]);
    cam.lookAt(look[0], look[1], look[2]);
    const fov = lerp(a.fov || 40, b.fov || a.fov || 40, k);
    if (Math.abs(cam.fov - fov) > 1e-3) { cam.fov = fov; cam.updateProjectionMatrix(); }
  };

  /* ---------- audio ---------- */
  const A = {};
  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const midiHz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const noteHz = (n) => { const m = /^([A-G])(#|b)?(\d)$/.exec(n); return midiHz(12 * (+m[3] + 1) + NOTE[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0)); };
  VE.noteHz = noteHz; VE.midiHz = midiHz;

  function ensure() {
    if (A.ctx) return A.ctx;
    const C = window.AudioContext || window.webkitAudioContext;
    A.ctx = new C();
    A.master = A.ctx.createGain(); A.master.gain.value = 0.8;
    const comp = A.ctx.createDynamicsCompressor();
    A.master.connect(comp); comp.connect(A.ctx.destination);
    A.dest = A.ctx.createMediaStreamDestination(); comp.connect(A.dest);
    const n = A.ctx.sampleRate * 2, buf = A.ctx.createBuffer(1, n, A.ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    A.noise = buf;
    LAZY.timer = setInterval(flushLazy, 400);
    return A.ctx;
  }
  /* v1.10: live playback creates music/SFX nodes only ~6 s ahead (a long clip used to schedule ~900 sources at once,
     which can starve the real-time audio thread and make the voice-over stutter). Offline renders (MP4) are not deferred. */
  const LAZY = { q: [], ahead: 6, timer: 0 };
  const defer = (t0, fn) => { if (!A.ctx || A.ctx instanceof OfflineAudioContext || t0 <= A.ctx.currentTime + LAZY.ahead) return false; LAZY.q.push([t0, fn, A.bus]); return true; };
  function flushLazy() { if (!LAZY.q.length || !A.ctx) return; const lim = A.ctx.currentTime + LAZY.ahead, keep = []; for (const it of LAZY.q) { if (it[2] !== A.bus || !A.bus) continue; if (it[0] <= lim) it[1](); else keep.push(it); } LAZY.q = keep; }
  function tone(t0, f, dur, o = {}) {
    if (defer(t0, () => tone(t0, f, dur, o))) return;
    const c = A.ctx, os = c.createOscillator(), g = c.createGain();
    const vol = o.vol == null ? 0.2 : o.vol, att = o.att || 0.005, rel = o.rel == null ? 0.1 : o.rel;
    os.type = o.type || 'sine'; os.frequency.setValueAtTime(f, t0);
    if (o.f2) os.frequency.exponentialRampToValueAtTime(o.f2, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(vol, t0 + att);
    g.gain.setValueAtTime(vol, t0 + Math.max(att, dur - 0.02));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + rel);
    os.connect(g); g.connect(A.bus); os.start(t0); os.stop(t0 + dur + rel + 0.05);
  }
  function noise(t0, dur, o = {}) {
    if (defer(t0, () => noise(t0, dur, o))) return;
    const c = A.ctx, s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
    s.buffer = A.noise; s.loop = true; fl.type = o.type || 'lowpass';
    fl.frequency.setValueAtTime(o.f || 2000, t0); if (o.f2) fl.frequency.exponentialRampToValueAtTime(o.f2, t0 + dur);
    fl.Q.value = o.q || 1;
    const vol = o.vol == null ? 0.2 : o.vol;
    g.gain.setValueAtTime(0.0001, t0); g.gain.linearRampToValueAtTime(vol, t0 + (o.att || 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(fl); fl.connect(g); g.connect(A.bus); s.start(t0, Math.random()); s.stop(t0 + dur + 0.05);
  }
  VE.audio = { tone, noise };

  VE.sfx = {
    pop: (t, o) => tone(t, 420, 0.08, { type: 'sine', f2: 900, vol: 0.18 }),
    whoosh: (t, o) => noise(t, (o && o.dur) || 0.5, { type: 'bandpass', f: 400, f2: 2600, q: 0.8, vol: 0.14 }),
    tick: (t) => tone(t, 1800, 0.02, { type: 'square', vol: 0.05, rel: 0.02 }),
    thump: (t) => tone(t, 120, 0.25, { f2: 45, vol: 0.4 }),
    ding: (t) => { tone(t, 880, 0.5, { vol: 0.14, rel: 0.3 }); tone(t, 1320, 0.4, { vol: 0.08, rel: 0.3 }); },
    boom: (t) => { tone(t, 90, 1, { f2: 30, vol: 0.5, rel: 0.3 }); noise(t, 0.8, { f: 400, vol: 0.3 }); },
    shimmer: (t) => { for (let i = 0; i < 6; i++) tone(t + i * 0.06, 1200 + i * 300, 0.4, { vol: 0.05, rel: 0.3 }); },
    riser: (t, o) => { const d = (o && o.dur) || 1.2; noise(t, d, { type: 'bandpass', f: 300, f2: 5000, q: 1.5, vol: 0.12, att: d * 0.8 }); tone(t, 200, d, { type: 'sawtooth', f2: 1200, vol: 0.05, att: d * 0.8, rel: 0.02 }); },
    heartbeat: (t) => { tone(t, 90, 0.12, { f2: 50, vol: 0.35 }); tone(t + 0.18, 80, 0.12, { f2: 45, vol: 0.25 }); },
    twinkle: (t) => [1568, 2093, 2637].forEach((f, i) => tone(t + i * 0.07, f, 0.2, { vol: 0.08, rel: 0.25 })),
    giggle: (t) => [600, 760, 640, 820].forEach((f, i) => tone(t + i * 0.09, f, 0.07, { type: 'triangle', vol: 0.12 })),
    boing: (t) => tone(t, 200, 0.25, { f2: 700, vol: 0.18 }),
    warn: (t) => { tone(t, 440, 0.14, { type: 'square', vol: 0.08 }); tone(t + 0.2, 330, 0.14, { type: 'square', vol: 0.08 }); },
  };
  /* VE.beats(BEATS[, voData]) -> { at, end, dur, DUR }. BEATS = [[id, seconds], ...] in play order (start with 'cover', end with 'end').
     When voData (DATA.vo) is given, each spoken beat grows to fit its clip BEFORE times are computed. */
  VE.beats = function (BEATS, vo, lead) {
    lead = lead == null ? 0.3 : lead;
    const ids = BEATS.filter(([id]) => id !== 'cover' && id !== 'end').map(([id]) => id), segs = (vo && vo.segs) || [];
    if (vo && vo.cover) { const c = BEATS.find((x) => x[0] === 'cover'); if (c) c[1] = Math.max(c[1], +(vo.cover[1] - vo.cover[0] + 0.15 + 0.45).toFixed(2)); }
    if (segs.length) ids.forEach((id, i) => { const s = segs[i]; if (!s) return; const b = BEATS.find((x) => x[0] === id); b[1] = Math.max(b[1], +(s[1] - s[0] + lead + 0.6).toFixed(2)); });
    const START = {}, LEN = {}; let acc = 0; for (const [id, d] of BEATS) { START[id] = acc; LEN[id] = d; acc += d; }
    const at = (id, off) => { if (!(id in START)) throw new Error('beat ' + id); return START[id] + (off || 0); };
    return { at, end: (id) => at(id) + LEN[id], dur: (id) => LEN[id], DUR: acc, ids, lead };
  };
  /* Voice-over clips: VE.voice(DATA.vo, B) where B = FK.beats(BEATS, DATA.vo). Decodes the embedded mp3 once; fact kit: chillBed({voice}); clay kit: VE.voiceBed(voice) as the first bed entry. */
  VE.voice = function (vo, B, gain) {
    const V = { ready: false, play() {} }; if (!vo || !vo.b64) return V;
    const bin = atob(vo.b64), u8 = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    let PCM = null; const pending = [];
    const say = (txt) => { const m = document.getElementById('msg'); if (m) m.textContent = txt; };
    window.__voicePromise = new OfflineAudioContext(1, 1, 24000).decodeAudioData(u8.buffer).then((b) => {
      PCM = { sr: b.sampleRate, data: b.getChannelData(0).slice() }; V.ready = true; window.__voiceOk = PCM.data.length / PCM.sr; say('');
      // Play was pressed before the voice finished decoding: schedule it now for the part that is still ahead
      pending.splice(0).forEach(([base, from, A, bus]) => { if (A.bus === bus && A.ctx && A.ctx.currentTime !== undefined) doPlay(base, Math.max(from, A.ctx.currentTime - base + 0.05), A); });
    }).catch((e) => { console.error('voice decode failed', e); say('Voice-over decode failed: ' + (e && e.message || e)); });
    setTimeout(() => { if (!PCM) say('Loading voice-over…'); }, 300);
    function doPlay(base, from, A) {
      const buf = A.ctx.createBuffer(1, PCM.data.length, PCM.sr); buf.copyToChannel(PCM.data, 0);
      const g = A.ctx.createGain(); g.gain.value = gain == null ? 1.5 : gain; g.connect(A.bus);
      const clip = (t0, s0, s1) => { const len = s1 - s0 + 0.12; if (t0 + len <= from) return; const skip = Math.max(0, from - t0), src = A.ctx.createBufferSource(); src.buffer = buf; src.connect(g); src.start(base + t0 + skip, Math.max(0, s0 - 0.06) + skip, len - skip); };
      if (vo.cover) clip(0.15, vo.cover[0], vo.cover[1]);
      B.ids.forEach((id, i) => { const s = vo.segs[i]; if (s) clip(B.at(id, B.lead), s[0], s[1]); });
    }
    V.play = function (base, from, A) {
      if (!A || !A.ctx) return;
      if (!PCM) { pending.push([base, from, A, A.bus]); return; }
      doPlay(base, from, A);
    };
    return V;
  };
  /* VE.voiceBed(voice, gain=0.75) -> bed entry that sets the bus gain and plays the voice clips; put it first in `bed` next to the music beds (clay kit). */
  VE.voiceBed = function (voice, gain) { return { play(base, from, A) { if (A && A.bus) { const g = gain == null ? 0.75 : gain; A.bus.gain.setValueAtTime(g, base + Math.max(0, from)); A.bus.gain.setValueAtTime(g, base + (window.__ve && __ve.DUR || 0) - 0.6); } if (voice) voice.play(base, from, A); } }; };
  VE.registerSfx = (name, fn) => { VE.sfx[name] = fn; };

  const MOODS = {
    drive: { bpm: 112, root: 43, prog: [0, 0, 5, 7], arp: [0, 7, 12, 7, 0, 7, 12, 15], bass: 'sawtooth', lead: 'square', arpVol: 0.035, bassVol: 0.1 },
    light: { bpm: 92, root: 60, prog: [0, 5, 7, 5], arp: [0, 4, 7, 12, 7, 4, 7, 4], bass: 'sine', lead: 'triangle', arpVol: 0.05, bassVol: 0.07 },
    warm: { bpm: 80, root: 57, prog: [0, 5, 3, 7], arp: [0, 7, 12, 7, 4, 7, 12, 7], bass: 'sine', lead: 'sine', arpVol: 0.045, bassVol: 0.07 },
    tense: { bpm: 100, root: 45, prog: [0, 0, 1, 0], arp: [0, 0, 0, 1, 0, 0, 1, 0], bass: 'sawtooth', lead: 'triangle', arpVol: 0.03, bassVol: 0.09 },
    dark: { bpm: 72, root: 40, prog: [0, 0, 1, 0], arp: [0, 3, 0, 3, 0, 3, 0, 1], bass: 'sawtooth', lead: 'sine', arpVol: 0.025, bassVol: 0.1 },
  };
  function bed(base, from, b) { // b.vol (0..1, default 1) scales the music under the SFX
    const m = MOODS[b.mood] || MOODS.light, step = 60 / (b.bpm || m.bpm) / 2, bv = b.vol == null ? 1 : b.vol;
    for (let k = 0, tt = b.t0; tt < b.t1 - 0.01; tt += step, k++) {
      if (tt < from - 0.01) continue;
      const bar = Math.floor(k / 8), off = m.prog[bar % 4], at = base + tt;
      if (k % 2 === 0) tone(at, midiHz(m.root - 12 + off), step * 1.6, { type: m.bass, vol: m.bassVol * bv, rel: 0.05 });
      if (b.mood !== 'tense' && b.mood !== 'dark' || k % 2) tone(at, midiHz(m.root + 12 + off + m.arp[k % 8]), step * 0.9, { type: m.lead, vol: m.arpVol * bv, rel: 0.05 });
    }
  }

  function motif(at, brand, hold) {
    const m = brand.motif;
    m.notes.forEach((n, i) => {
      const last = i === m.notes.length - 1, f = noteHz(n), t = at + i * m.gap, d = last && hold ? hold : 0.18;
      if (m.timbre === 'bell') { tone(t, f, d, { vol: 0.14, rel: 0.5 }); tone(t, f * 2, d, { vol: 0.05, rel: 0.4 }); tone(t, f * 3.01, d * 0.6, { vol: 0.02, rel: 0.3 }); }
      else { tone(t, f, d, { type: 'triangle', vol: 0.14, rel: 0.12 }); tone(t, f, d, { type: 'square', vol: 0.04, rel: 0.1 }); }
    });
    if (m.timbre !== 'bell') noise(at, 0.35, { type: 'bandpass', f: 600, f2: 3000, vol: 0.06 });
    else VE.sfx.twinkle(at + m.gap * m.notes.length);
  }

  /* ---------- MP4 muxer (H.264 + AAC/Opus, moov first, samples interleaved by time) ----------
     mux({W,H,fps,video:{chunks:[{data,key,ts}],avcC},audio:{chunks:[{data,ts,dur}],desc,codec,sr,ch}|null}) -> [Uint8Array parts] */
  VE.mp4 = (function () {
    const te = new TextEncoder();
    const u8 = (n) => [n & 255], u16 = (n) => [(n >> 8) & 255, n & 255], u24 = (n) => [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    const u32 = (n) => [(n >>> 24) & 255, (n >> 16) & 255, (n >> 8) & 255, n & 255];
    const str = (s) => Array.from(te.encode(s)), zeros = (n) => new Array(n).fill(0);
    function cat(parts, out) {
      out = out || [];
      for (const p of parts) {
        if (typeof p === 'number') out.push(p);
        else if (p instanceof Uint8Array) { for (let i = 0; i < p.length; i++) out.push(p[i]); }
        else cat(p, out);
      }
      return out;
    }
    const box = (type, ...parts) => { const body = cat(parts); return cat([u32(body.length + 8), str(type), body]); };
    const fbox = (type, v, f, ...parts) => box(type, u8(v), u24(f), ...parts);
    const MATRIX = [u32(0x10000), u32(0), u32(0), u32(0), u32(0x10000), u32(0), u32(0), u32(0), u32(0x40000000)];
    function runs(ds) { const out = []; for (const d of ds) { const l = out[out.length - 1]; if (l && l[1] === d) l[0]++; else out.push([1, d]); } return out; }
    function stbl(entry, durs, sizes, offs, keys) {
      const r = runs(durs), parts = [fbox('stsd', 0, 0, u32(1), entry), fbox('stts', 0, 0, u32(r.length), r.map(([c, d]) => [u32(c), u32(d)]))];
      if (keys) parts.push(fbox('stss', 0, 0, u32(keys.length), keys.map((k) => u32(k))));
      parts.push(fbox('stsc', 0, 0, u32(1), u32(1), u32(1), u32(1)));
      parts.push(fbox('stsz', 0, 0, u32(0), u32(sizes.length), sizes.map((s) => u32(s))));
      parts.push(fbox('stco', 0, 0, u32(offs.length), offs.map((o) => u32(o))));
      return box('stbl', ...parts);
    }
    function trak(id, vid, tsc, mediaDur, movieDur, entry, durs, sizes, offs, keys, W, H) {
      const tkhd = fbox('tkhd', 0, 3, u32(0), u32(0), u32(id), u32(0), u32(movieDur), zeros(8), u16(0), u16(0), u16(vid ? 0 : 0x100), u16(0), MATRIX, u32(vid ? W * 65536 : 0), u32(vid ? H * 65536 : 0));
      const mdhd = fbox('mdhd', 0, 0, u32(0), u32(0), u32(tsc), u32(mediaDur), u16(0x55c4), u16(0));
      const hdlr = fbox('hdlr', 0, 0, u32(0), str(vid ? 'vide' : 'soun'), zeros(12), str(vid ? 'VideoHandler' : 'SoundHandler'), [0]);
      const mhd = vid ? fbox('vmhd', 0, 1, zeros(8)) : fbox('smhd', 0, 0, zeros(4));
      const dinf = box('dinf', fbox('dref', 0, 0, u32(1), fbox('url ', 0, 1)));
      return box('trak', tkhd, box('mdia', mdhd, hdlr, box('minf', mhd, dinf, stbl(entry, durs, sizes, offs, keys))));
    }
    const avc1 = (W, H, avcC) => box('avc1', zeros(6), u16(1), u16(0), u16(0), zeros(12), u16(W), u16(H), u32(0x480000), u32(0x480000), u32(0), u16(1), zeros(32), u16(0x18), u16(0xffff), box('avcC', avcC));
    function esds(asc, br) {
      const dsi = [0x05, asc.length, asc];
      const dcd = [0x04, 13 + 2 + asc.length, 0x40, 0x15, u24(0), u32(br), u32(br), dsi];
      return fbox('esds', 0, 0, 0x03, 3 + (2 + 13 + 2 + asc.length) + 3, u16(0), 0, dcd, 0x06, 0x01, 0x02);
    }
    const audioEntry = (type, ch, sr, extra) => box(type, zeros(6), u16(1), zeros(8), u16(ch), u16(16), u16(0), u16(0), u32(sr * 65536), extra);
    const SRI = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000];
    function audioSampleEntry(a) {
      if (a.codec === 'opus') {
        let pre = 312, inSr = 48000;
        const d = a.desc;
        if (d && d.length >= 19 && String.fromCharCode(...d.slice(0, 8)) === 'OpusHead') { pre = d[10] | (d[11] << 8); inSr = (d[12] | (d[13] << 8) | (d[14] << 16) | (d[15] << 24)) >>> 0; }
        return audioEntry('Opus', a.ch, 48000, box('dOps', [0, a.ch], u16(pre), u32(inSr), u16(0), [0]));
      }
      let asc = a.desc && a.desc.length >= 2 ? a.desc : null;
      if (!asc) { const v = (2 << 11) | (Math.max(0, SRI.indexOf(a.sr)) << 7) | (a.ch << 3); asc = new Uint8Array([v >> 8, v & 255]); }
      return audioEntry('mp4a', a.ch, a.sr, esds(asc, a.bitrate || 192000));
    }
    function mux(o) {
      const V = o.video, Au = o.audio && o.audio.chunks.length ? o.audio : null, fps = o.fps, vts = Math.round(fps * 1000);
      const vt = V.chunks.map((c) => Math.round(c.ts * vts / 1e6));
      for (let i = 1; i < vt.length; i++) if (vt[i] <= vt[i - 1]) throw new Error('video frames out of order');
      const vd = vt.map((t, i) => (i < vt.length - 1 ? vt[i + 1] - t : Math.round(vts / fps)));
      const vDur = vd.reduce((a, b) => a + b, 0), keys = [];
      V.chunks.forEach((c, i) => { if (c.key) keys.push(i + 1); });
      const ad = Au ? Au.chunks.map((c) => (c.dur ? Math.round(c.dur * Au.sr / 1e6) : Au.codec === 'opus' ? 960 : 1024)) : [];
      const aDur = ad.reduce((a, b) => a + b, 0);
      const order = V.chunks.map((c, i) => ({ t: c.ts, a: 0, i }));
      if (Au) Au.chunks.forEach((c, i) => order.push({ t: c.ts, a: 1, i }));
      order.sort((p, q) => p.t - q.t || p.a - q.a);
      const vOff = [], aOff = []; let pos = 0;
      for (const s of order) { const c = (s.a ? Au : V).chunks[s.i]; (s.a ? aOff : vOff)[s.i] = pos; pos += c.data.length; }
      const ms = (d, tsc) => Math.round(d * 1000 / tsc);
      const vEntry = avc1(o.W, o.H, V.avcC), aEntry = Au ? audioSampleEntry(Au) : null;
      const build = (base) => {
        const tr = [trak(1, true, vts, vDur, ms(vDur, vts), vEntry, vd, V.chunks.map((c) => c.data.length), vOff.map((x) => x + base), keys, o.W, o.H)];
        if (Au) tr.push(trak(2, false, Au.sr, aDur, ms(aDur, Au.sr), aEntry, ad, Au.chunks.map((c) => c.data.length), aOff.map((x) => x + base), null));
        const dur = Math.max(ms(vDur, vts), Au ? ms(aDur, Au.sr) : 0);
        return box('moov', fbox('mvhd', 0, 0, u32(0), u32(0), u32(1000), u32(dur), u32(0x10000), u16(0x100), zeros(10), MATRIX, zeros(24), u32(Au ? 3 : 2)), ...tr);
      };
      const ftyp = box('ftyp', str('isom'), u32(512), str('isom'), str('iso2'), str('avc1'), str('mp41'));
      const base = ftyp.length + build(0).length + 8, moov = build(base);
      const head = new Uint8Array(base);
      head.set(ftyp, 0); head.set(moov, ftyp.length); head.set(cat([u32(pos + 8), str('mdat')]), ftyp.length + moov.length);
      return [head].concat(order.map((s) => (s.a ? Au : V).chunks[s.i].data));
    }
    return { mux };
  })();

  /* ---------- main ---------- */
  VE.run = function (cfg) {
    const W = cfg.W || 1080, H = cfg.H || 1920, DUR = cfg.DUR, ENDLEN = cfg.endLen == null ? 1.5 : cfg.endLen;
    const brand = Object.assign({ name: 'Channel', series: '', color: '#2ee6c5', bg: ['#0f1630', '#1b2a55'], icon: 'globe', endLine: '', slug: 'clip', motif: {} }, cfg.brand);
    brand.motif = Object.assign({ notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' }, brand.motif);
    document.body.style.cssText = 'margin:0;background:#0b0d14;color:#fff;font-family:Kanit,sans-serif;display:flex;justify-content:center';
    document.body.innerHTML = '<div id="app" style="display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px"><canvas id="cv" width="' + W + '" height="' + H + '" style="height:min(86vh,900px);max-width:96vw;aspect-ratio:' + W + '/' + H + ';background:#000;border-radius:8px"></canvas><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center"><button id="pb">Play</button><input id="sc" type="range" min="0" max="1000" value="0" style="width:260px"><span id="tm" style="font-size:14px;min-width:90px">0.0/' + DUR + 's</span><button id="mp4" style="font-weight:700">Render MP4</button><button id="ex">WebM (real-time)</button></div><div id="msg" style="font-size:13px;opacity:.7"></div></div>';
    const cv = document.getElementById('cv'), g = cv.getContext('2d');
    const THREE = window.THREE;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(1); renderer.setSize(W, H, false);
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 500);
    /* one-size safe layout (DATA.reel.dy, Nov 2026): whole 3D picture moves down by dy-30 px via the camera view offset (projected HUD labels follow); captions move down by dy */
    const RDY = (window.DATA && window.DATA.reel && window.DATA.reel.on && window.DATA.reel.dy != null) ? window.DATA.reel.dy : 30; VE.reelDy = RDY;
    if (RDY !== 30) camera.setViewOffset(W, H, 0, -(RDY - 30), W, H);
    let state = {}; // built in start(), after Kanit has loaded (labels draw text into canvases)

    /* --- 2D helpers --- */
    function grad(c1, c2) { const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, c1); gr.addColorStop(1, c2); return gr; }
    function drawIcon(x, y, r, rot, color) {
      g.save(); g.translate(x, y); g.strokeStyle = color; g.fillStyle = color; g.lineWidth = Math.max(3, r * 0.1); g.lineJoin = 'round';
      if (brand.icon === 'heart') {
        g.beginPath(); g.moveTo(0, r * 0.9); g.bezierCurveTo(-r * 1.4, 0, -r * 0.8, -r * 1.1, 0, -r * 0.35); g.bezierCurveTo(r * 0.8, -r * 1.1, r * 1.4, 0, 0, r * 0.9); g.globalAlpha = 0.9; g.fill();
      } else {
        g.beginPath(); for (let i = 0; i < 6; i++) { const a = rot + i * Math.PI / 3; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); g.stroke();
        // RuNgee mark v2 (Oct 2026): spokes stop short of the centre + small gold hexagon (avoids the wheel/hub look)
        const ga = g.globalAlpha, gap = r * 0.394, hr = r * 0.218;
        g.beginPath(); for (let i = 0; i < 6; i++) { const a = rot + i * Math.PI / 3; g.moveTo(Math.cos(a) * gap, Math.sin(a) * gap); g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.lineCap = 'round'; g.globalAlpha = ga * 0.5; g.stroke();
        g.beginPath(); for (let i = 0; i < 6; i++) { const a = rot - Math.PI / 6 + i * Math.PI / 3; g.lineTo(Math.cos(a) * hr, Math.sin(a) * hr); } g.closePath();
        g.fillStyle = brand.accent || '#ffc94a'; g.strokeStyle = g.fillStyle; g.lineWidth = Math.max(1.5, r * 0.03); g.globalAlpha = ga; g.fill(); g.stroke();
      }
      g.restore();
    }
    function text(str, x, y, size, color, weight, align) {
      g.font = (weight || 800) + ' ' + size + 'px Kanit,sans-serif'; g.textAlign = align || 'center'; g.textBaseline = 'middle';
      g.lineJoin = 'round'; g.lineWidth = size * 0.16; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(str, x, y); g.fillStyle = color; g.fillText(str, x, y);
    }
    VE.draw = { text, icon: drawIcon, grad };

    /* Facebook Reels-safe build (--data reel=reel.json with {"on":true}): captions 30 px lower, 6% smaller, 120 px side margins (FB overlays more UI than TikTok). */
    const REELS = !!(window.DATA && window.DATA.reel && window.DATA.reel.on); VE.reels = REELS;
    function drawCaps(t) {
      for (const c0 of cfg.caps || []) {
        const c = REELS ? Object.assign({}, c0, { y: c0.y + RDY }) : c0;
        if (t < c.t0 || t >= c.t1) continue;
        const p = c.instant ? 1 : clamp((t - c.t0) / 0.35), sc = 0.72 + 0.28 * easeBack(p), a = (c.instant ? 1 : clamp((t - c.t0) / 0.12)) * clamp((c.t1 - t) / 0.2);
        g.save(); g.globalAlpha = a; g.translate(W / 2, c.y); g.scale(sc, sc); g.translate(-W / 2, -c.y);
        let y = c.y, prev = 0;
        for (const line of c.lines) {
          const size0 = REELS ? Math.round(line[0] * 0.94) : line[0], segs = line.slice(1).map((s) => ({ t: typeof s[0] === 'function' ? s[0](t) : s[0], c: s[1] || '#fff', w: s[2] || 800 }));
          if (prev) y += (prev + size0) / 2 * 1.34; // space by both line heights so a small line never sits inside a big one (Thai marks above/below)
          let size = size0, tw = 0;
          const meas = (sz) => segs.reduce((acc, s) => { g.font = s.w + ' ' + sz + 'px Kanit,sans-serif'; return acc + g.measureText(s.t).width; }, 0);
          const MW = W - (REELS ? 240 : 160); tw = meas(size); if (tw > MW) { size = size0 * MW / tw; tw = MW; }
          let x = W / 2 - tw / 2;
          for (const s of segs) {
            g.font = s.w + ' ' + size + 'px Kanit,sans-serif'; const w = g.measureText(s.t).width;
            g.textAlign = 'left'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = size * 0.16; g.strokeStyle = 'rgba(10,12,30,.85)';
            g.shadowColor = 'rgba(0,0,0,.45)'; g.shadowBlur = 12; g.shadowOffsetY = 4; g.strokeText(s.t, x, y); g.shadowColor = 'transparent';
            g.fillStyle = s.c; g.fillText(s.t, x, y); x += w;
          }
          prev = size0;
        }
        if (c.foot) { g.font = '400 28px Kanit,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 6; g.strokeStyle = 'rgba(10,12,30,.7)'; g.strokeText(c.foot, W / 2, y + prev * 0.7 + 26); g.fillStyle = 'rgba(255,255,255,.95)'; g.fillText(c.foot, W / 2, y + prev * 0.7 + 26); }
        g.restore();
      }
    }
    function drawBrand(t) {
      g.font = '800 44px Kanit,sans-serif'; const w = g.measureText(brand.name).width;
      g.save(); g.globalAlpha = 0.95; drawIcon(W / 2 - w / 2 - 40, 118, 24, t * 0.4, brand.color); text(brand.name, W / 2 + 4, 118, 44, brand.color, 800); g.restore();
      if (brand.series && t < 3) {
        const a = (cfg.coverAt0 ? 1 : clamp(t / 0.3)) * clamp((3 - t) / 0.4); g.save(); g.globalAlpha = a;
        g.font = '600 28px Kanit,sans-serif'; const bw = g.measureText(brand.series).width + 44;
        g.fillStyle = brand.color; g.beginPath(); g.roundRect ? g.roundRect(W / 2 - bw / 2, 160, bw, 44, 22) : g.rect(W / 2 - bw / 2, 160, bw, 44); g.fill();
        g.fillStyle = '#0f1630'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(brand.series, W / 2, 183); g.restore();
      }
    }
    function drawEnd(t) {
      if (t < DUR - ENDLEN) return; const a = clamp((t - (DUR - ENDLEN)) / 0.25);
      g.save(); g.fillStyle = grad(brand.bg[0], brand.bg[1]); g.fillRect(0, 0, W, H); g.globalAlpha = a; // opaque card, only the mark fades in: no see-through cross-fade over the last scene
      const k = H / 1920; // same layout in portrait (1080x1920) and landscape (1920x1080)
      drawIcon(W / 2, 720 * k, 150 * k, t * 0.8, brand.color);
      text(brand.name, W / 2, 1000 * k, 96 * k, '#fff', 800);
      if (brand.series) text(brand.series, W / 2, 1090 * k, 40 * k, brand.color, 600);
      if (brand.endLine) text(brand.endLine, W / 2, 1170 * k, 38 * k, '#fff', 400);
      g.restore();
    }
    function drawTrans(t) {
      for (const tr of cfg.trans || []) {
        const p = (t - tr.t) / tr.dur; if (p < 0 || p > 1) continue;
        if (tr.type === 'flash') { g.fillStyle = 'rgba(255,255,255,' + 0.9 * (1 - p) + ')'; g.fillRect(0, 0, W, H); }
        else if (tr.type === 'fade') { g.fillStyle = 'rgba(0,0,0,' + (1 - Math.abs(2 * p - 1)) + ')'; g.fillRect(0, 0, W, H); }
        else { const R = Math.hypot(W, H) / 2, r = R * Math.abs(2 * p - 1); g.save(); g.fillStyle = tr.color || brand.bg[0]; g.beginPath(); g.rect(0, 0, W, H); g.moveTo(W / 2 + r, H / 2); g.arc(W / 2, H / 2, r, 0, 6.2832, true); g.fill('evenodd'); g.restore(); }
      }
    }

    function renderFrame(t) {
      const bgc = cfg.bgAt ? cfg.bgAt(t) : brand.bg;
      g.globalAlpha = 1; g.fillStyle = grad(bgc[0], bgc[1]); g.fillRect(0, 0, W, H);
      if (cfg.update) cfg.update(t, state, { THREE, scene, camera, W, H });
      renderer.render(scene, camera); g.drawImage(renderer.domElement, 0, 0, W, H);
      const vg = g.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, cfg.vignette || 'rgba(0,0,0,.35)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
      if (cfg.danger) { const d = clamp(cfg.danger(t)); if (d > 0) { const beat = 1 + 0.35 * Math.max(0, Math.sin(t * 7.5)); const dv = g.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.7); dv.addColorStop(0, 'rgba(200,0,30,0)'); dv.addColorStop(1, 'rgba(200,0,30,' + 0.5 * d * beat + ')'); g.fillStyle = dv; g.fillRect(0, 0, W, H); } }
      if (cfg.hud) cfg.hud(g, t, { W, H, text, icon: drawIcon });
      drawCaps(t); if (cfg.brandBar !== false) drawBrand(t); drawTrans(t); drawEnd(t);
    }
    window.__renderAt = (t) => { renderFrame(t); };

    /* --- transport --- */
    const S = { t: 0, playing: false, exporting: false, base: 0, onEnd: null };
    const pb = document.getElementById('pb'), sc = document.getElementById('sc'), tm = document.getElementById('tm'), ex = document.getElementById('ex'), mp4b = document.getElementById('mp4'), msg = document.getElementById('msg');
    function ui() { sc.value = Math.round(S.t / DUR * 1000); tm.textContent = S.t.toFixed(1) + '/' + DUR + 's'; pb.textContent = S.playing ? 'Pause' : 'Play'; }
    function stopAudio() { if (A.bus) { try { A.bus.disconnect(); } catch (e) {} A.bus = null; } }
    function schedule(from) {
      const c = ensure(); if (c.state === 'suspended') c.resume();
      stopAudio(); A.bus = c.createGain(); A.bus.connect(A.master);
      S.base = c.currentTime + 0.05 - from;
      scheduleAll(S.base, from);
    }
    function scheduleAll(base, from) { // shared by live playback and the offline MP4 soundtrack
      A.bus.gain.setValueAtTime(1, base + DUR - 0.6); A.bus.gain.linearRampToValueAtTime(0, base + DUR);
      if (from < 0.9) motif(base, brand, 0);
      if (from < DUR - ENDLEN + 0.05) motif(base + DUR - ENDLEN, brand, 0.5);
      for (const b of cfg.bed || []) { if (typeof b.play === 'function') b.play(base, from, A); else bed(base, from, b); }
      for (const e of cfg.audio || []) { if (e[0] >= from - 0.001 && VE.sfx[e[1]]) VE.sfx[e[1]](base + e[0], e[2] || {}); }
    }
    function pause() { S.playing = false; stopAudio(); ui(); }
    function play(from, onEnd) { S.t = from; S.onEnd = onEnd || null; schedule(from); S.playing = true; ui(); requestAnimationFrame(loop); }
    function loop() {
      if (!S.playing) return;
      S.t = Math.max(S.t, A.ctx.currentTime - S.base);
      if (S.t >= DUR) { S.t = DUR; renderFrame(DUR - 0.001); S.playing = false; stopAudio(); ui(); const f = S.onEnd; S.onEnd = null; if (f) f(); return; }
      renderFrame(S.t); ui(); requestAnimationFrame(loop);
    }
    pb.onclick = () => { if (S.exporting) return; if (S.playing) pause(); else play(S.t >= DUR - 0.05 ? 0 : S.t); };
    sc.oninput = () => { if (S.exporting) return; pause(); S.t = sc.value / 1000 * DUR; renderFrame(S.t); ui(); };
    const fname = (ext) => (cfg.file || brand.slug + '-clip') + ext;
    function download(blob, name) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 60000); }
    function busy(on) { S.exporting = on; [pb, sc, ex, mp4b].forEach((el) => { el.disabled = on; }); }

    /* Record WebM: real-time MediaRecorder (fallback for browsers without WebCodecs) */
    ex.onclick = () => { // id 'ex' kept: mp4.js clicks it to capture the soundtrack
      if (S.exporting) return; pause(); ensure();
      const stream = cv.captureStream(60); A.dest.stream.getAudioTracks().forEach((tr) => stream.addTrack(tr));
      const mt = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'].find((m) => MediaRecorder.isTypeSupported(m));
      const rec = new MediaRecorder(stream, { mimeType: mt, videoBitsPerSecond: 14e6 }), chunks = [];
      rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
      rec.onstop = () => { download(new Blob(chunks, { type: 'video/webm' }), fname('.webm')); busy(false); msg.textContent = 'WebM saved.'; };
      busy(true); msg.textContent = 'Recording in real time (' + DUR + 's). Do not switch tabs.'; rec.start(); play(0, () => setTimeout(() => rec.stop(), 300));
    };

    /* Render MP4: frame by frame with WebCodecs (H.264 + AAC), independent of real time, so no dropped frames */
    const yieldNow = () => new Promise((r) => { const ch = new MessageChannel(); ch.port1.onmessage = () => r(); ch.port2.postMessage(0); });
    const toU8 = (d) => (d ? (d instanceof ArrayBuffer ? new Uint8Array(d.slice(0)) : new Uint8Array(d.buffer.slice(d.byteOffset, d.byteOffset + d.byteLength))) : null);
    async function videoConfigs(fps) {
      const out = [], bitrate = cfg.bitrate || 10e6;
      for (const hw of ['no-preference', 'prefer-software']) for (const codec of ['avc1.640028', 'avc1.64002a', 'avc1.4d0028', 'avc1.420028', 'avc1.640033']) {
        const c = { codec, width: W, height: H, bitrate, bitrateMode: 'variable', framerate: fps, latencyMode: 'quality', avc: { format: 'avc' }, hardwareAcceleration: hw };
        try { const r = await VideoEncoder.isConfigSupported(c); if (r.supported) { out.push(c); break; } } catch (e) {}
      }
      return out;
    }
    async function renderAudio(sr) {
      if (window.__voicePromise) await window.__voicePromise; // MP4 soundtrack must include the voice-over
      const off = new OfflineAudioContext(2, Math.ceil(DUR * sr), sr), keep = { ctx: A.ctx, master: A.master, bus: A.bus, noise: A.noise };
      try {
        A.ctx = off; A.master = off.createGain(); A.master.gain.value = 0.8;
        const comp = off.createDynamicsCompressor(); A.master.connect(comp); comp.connect(off.destination);
        const n = sr * 2, buf = off.createBuffer(1, n, sr), d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
        A.noise = buf; A.bus = off.createGain(); A.bus.connect(A.master);
        scheduleAll(0, 0);
      } finally { Object.assign(A, keep); }
      return off.startRendering();
    }
    async function encodeAudio(buf) {
      const sr = buf.sampleRate;
      let acfg = null;
      for (const c of [{ codec: 'mp4a.40.2', sampleRate: sr, numberOfChannels: 2, bitrate: 192000 }, { codec: 'opus', sampleRate: sr, numberOfChannels: 2, bitrate: 160000 }]) {
        try { if ((await AudioEncoder.isConfigSupported(c)).supported) { acfg = c; break; } } catch (e) {}
      }
      if (!acfg) return null;
      const chunks = []; let desc = null, err = null;
      const enc = new AudioEncoder({ output: (ch, meta) => { if (!desc && meta && meta.decoderConfig) desc = toU8(meta.decoderConfig.description); const b = new Uint8Array(ch.byteLength); ch.copyTo(b); chunks.push({ data: b, ts: ch.timestamp, dur: ch.duration }); }, error: (e) => { err = e; } });
      enc.configure(acfg);
      const L = buf.length, c0 = buf.getChannelData(0), c1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : c0;
      for (let o = 0; o < L; o += sr) {
        const n = Math.min(sr, L - o), data = new Float32Array(n * 2);
        data.set(c0.subarray(o, o + n), 0); data.set(c1.subarray(o, o + n), n);
        const a = new AudioData({ format: 'f32-planar', sampleRate: sr, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round(o * 1e6 / sr), data });
        enc.encode(a); a.close();
        if (err) throw err;
      }
      await enc.flush(); enc.close(); if (err) throw err;
      return { chunks, desc, codec: acfg.codec === 'opus' ? 'opus' : 'aac', sr, ch: 2, bitrate: acfg.bitrate };
    }
    async function encodeVideo(vcfg, fps, N, onProgress) {
      const chunks = []; let avcC = null, err = null;
      const enc = new VideoEncoder({ output: (ch, meta) => { if (!avcC && meta && meta.decoderConfig) avcC = toU8(meta.decoderConfig.description); const b = new Uint8Array(ch.byteLength); ch.copyTo(b); chunks.push({ data: b, key: ch.type === 'key', ts: ch.timestamp }); }, error: (e) => { err = e; } });
      enc.configure(vcfg);
      const waitQueue = () => new Promise((r) => { enc.addEventListener('dequeue', r, { once: true }); setTimeout(r, 50); });
      for (let i = 0; i < N; i++) {
        if (err) throw err;
        renderFrame(Math.min(i / fps, DUR - 0.001));
        const fr = new VideoFrame(cv, { timestamp: Math.round(i * 1e6 / fps), duration: Math.round(1e6 / fps) });
        enc.encode(fr, { keyFrame: i % (fps * 2) === 0 }); fr.close();
        while (enc.encodeQueueSize > 6 && !err) await waitQueue();
        if (i % 3 === 0) { onProgress(i + 1); await yieldNow(); }
      }
      await enc.flush(); enc.close(); if (err) throw err;
      if (!avcC) throw new Error('encoder gave no H.264 config');
      return { chunks, avcC };
    }
    async function exportMp4(opt) {
      opt = opt || {};
      if (!window.VideoEncoder || !window.AudioEncoder || !window.OfflineAudioContext) throw new Error('this browser has no WebCodecs; use Chrome or Edge on a computer, or WebM (real-time)');
      const fps = cfg.fps || 30, N = Math.round(DUR * fps), sr = 48000, t0 = performance.now();
      const configs = await videoConfigs(fps);
      if (!configs.length) throw new Error('this browser cannot encode H.264 at ' + W + 'x' + H);
      msg.textContent = 'Rendering sound…';
      const audio = await encodeAudio(await renderAudio(sr));
      let video = null, lastErr = null;
      for (const vcfg of configs) {
        try {
          video = await encodeVideo(vcfg, fps, N, (k) => {
            const p = k / N, el = (performance.now() - t0) / 1000, left = p > 0.02 ? Math.round(el / p - el) : null;
            msg.textContent = 'Rendering MP4: frame ' + k + '/' + N + ' (' + Math.round(p * 100) + '%)' + (left != null ? ', about ' + left + 's left' : '') + '. Keep this tab open.';
            document.title = Math.round(p * 100) + '% rendering…';
          });
          break;
        } catch (e) { lastErr = e; console.warn('MP4 encoder config failed, trying next', vcfg, e); }
      }
      if (!video) throw lastErr || new Error('video encoding failed');
      const parts = VE.mp4.mux({ W, H, fps, video, audio });
      const blob = new Blob(parts, { type: 'video/mp4' });
      const info = { bytes: blob.size, seconds: (performance.now() - t0) / 1000, frames: N, video: video.chunks.length, audio: audio ? audio.codec : 'none' };
      if (!opt.noDownload) download(blob, fname('.mp4'));
      return Object.assign(info, { blob });
    }
    mp4b.onclick = async () => {
      if (S.exporting) return; pause(); busy(true);
      const title = document.title;
      try {
        const r = await exportMp4();
        msg.textContent = 'MP4 saved: ' + W + 'x' + H + ', ' + DUR + 's, ' + (r.bytes / 1048576).toFixed(1) + ' MB, rendered in ' + Math.round(r.seconds) + 's' + (r.audio === 'aac' ? '' : ' (sound: ' + r.audio + ')') + '.';
      } catch (e) {
        console.error(e); msg.textContent = 'MP4 failed: ' + (e && e.message ? e.message : e) + '. Use WebM (real-time) instead.';
      } finally { document.title = title; busy(false); renderFrame(S.t); ui(); }
    };
    window.__ve = { S, renderFrame, play, pause, DUR, exportMp4 };

    const start = () => { state = cfg.setup ? cfg.setup({ THREE, scene, camera, renderer, W, H }) || {} : {}; renderFrame(0); ui(); window.__veReady = true; };
    Promise.race([Promise.all(['400', '600', '800'].map((w) => document.fonts.load(w + ' 40px Kanit', 'ก A1'))), new Promise((r) => setTimeout(r, 3000))]).then(start, start);
  };
})();
