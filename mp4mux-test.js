/* Round-trip test for VE.mp4.mux (core.js v1.3) — run after any change to the muxer:  node mp4mux-test.js
   ffmpeg encodes a test pattern (H.264, no B-frames, like Chrome's WebCodecs encoders) and a tone (AAC); the elementary streams are
   muxed by VE.mp4.mux with the same chunk shape the page's 'Render MP4' passes (data/key/ts in microseconds), then ffprobe/ffmpeg check
   streams, durations, keyframes, faststart, decoded frame hashes, and the built-in AAC config used when the encoder gives none.
   (The Opus fallback path is not covered here.) */
const fs = require('fs'), os = require('os'), path = require('path'), { execSync } = require('child_process');
global.window = {}; require(path.join(__dirname, 'core.js')); const VE = window.VE;
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mux-')), F = (n) => path.join(dir, n), sh = (c) => execSync(c, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const W = 1080, H = 1920, FPS = 30, SEC = 4, SR = 48000;
let fails = 0; const check = (ok, what) => { console.log((ok ? 'PASS ' : 'FAIL ') + what); if (!ok) fails++; };

function nals(buf) { // Annex B -> NAL units
  const out = []; let i = 0, start = -1;
  while (i + 3 <= buf.length) {
    if (buf[i] === 0 && buf[i + 1] === 0 && (buf[i + 2] === 1 || (buf[i + 2] === 0 && buf[i + 3] === 1))) {
      if (start >= 0) out.push(buf.subarray(start, i)); i += buf[i + 2] === 1 ? 3 : 4; start = i;
    } else i++;
  }
  if (start >= 0) out.push(buf.subarray(start));
  return out.map((n) => { let e = n.length; while (e > 0 && n[e - 1] === 0) e--; return n.subarray(0, e); });
}
function h264(bf) {
  const mp4 = F('ref' + bf + '.mp4'), es = F('ref' + bf + '.h264');
  sh(`ffmpeg -v error -y -f lavfi -i testsrc2=size=${W}x${H}:rate=${FPS} -t ${SEC} -c:v libx264 -preset ultrafast -bf ${bf} -g 60 -pix_fmt yuv420p -x264-params aud=1 ${mp4}`);
  sh(`ffmpeg -v error -y -i ${mp4} -c copy -bsf:v h264_mp4toannexb -f h264 ${es}`);
  const tb = sh(`ffprobe -v error -select_streams v -show_entries stream=time_base -of csv=p=0 ${mp4}`).trim().split('/').map(Number);
  const pk = sh(`ffprobe -v error -select_streams v -show_entries packet=pts,dts -of csv=p=0 ${mp4}`).trim().split('\n').map((l) => l.split(',').map(Number));
  let sps, pps; const aus = []; let cur = null;
  for (const n of nals(fs.readFileSync(es))) {
    const t = n[0] & 31;
    const vcl = (au) => au.some((x) => (x[0] & 31) >= 1 && (x[0] & 31) <= 5);
    if (!cur || (t === 9 && vcl(cur))) { cur = []; aus.push(cur); } // a new access unit starts at each AUD (leading SEI stays with frame 1)
    if (t === 9) continue;
    if (t === 7) { sps = sps || n; continue; } if (t === 8) { pps = pps || n; continue; }
    cur.push(n);
  }
  const avcC = Uint8Array.from([1, sps[1], sps[2], sps[3], 0xff, 0xe1, sps.length >> 8, sps.length & 255, ...sps, 1, pps.length >> 8, pps.length & 255, ...pps]);
  const toTicks = (v) => Math.round(v * tb[0] / tb[1] * 90000), d0 = toTicks(pk[0][0]); // shift so the first frame shows at 0
  const samples = aus.map((au, i) => {
    const len = au.reduce((s, n) => s + 4 + n.length, 0), data = new Uint8Array(len); let p = 0;
    for (const n of au) { data.set([n.length >>> 24, (n.length >> 16) & 255, (n.length >> 8) & 255, n.length & 255], p); data.set(n, p + 4); p += 4 + n.length; }
    return { data, key: au.some((n) => (n[0] & 31) === 5), ts: Math.round((toTicks(pk[i][0]) - d0) / 0.09) };
  });
  return { es, avcC, samples };
}
function aac() {
  const es = F('ref.aac'); sh(`ffmpeg -v error -y -f lavfi -i sine=frequency=440:sample_rate=${SR}:duration=${SEC} -ac 2 -c:a aac -b:a 192k -f adts ${es}`);
  const b = fs.readFileSync(es), samples = []; let i = 0, asc;
  while (i + 7 <= b.length) {
    const prot = b[i + 1] & 1, len = ((b[i + 3] & 3) << 11) | (b[i + 4] << 3) | (b[i + 5] >> 5), hl = prot ? 7 : 9;
    if (!asc) { const prof = (b[i + 2] >> 6) + 1, idx = (b[i + 2] >> 2) & 15, ch = ((b[i + 2] & 1) << 2) | (b[i + 3] >> 6); asc = Uint8Array.from([(prof << 3) | (idx >> 1), ((idx & 1) << 7) | (ch << 3)]); }
    samples.push({ data: b.subarray(i + hl, i + len), dur: 1024 }); i += len;
  }
  return { es, asc, samples };
}

const A = aac(), V = h264(0), us = 1e6 / SR;
const achunks = A.samples.map((s, i) => ({ data: s.data, ts: Math.round(i * 1024 * us), dur: Math.round(1024 * us) }));
for (const desc of ['from encoder', 'built-in']) {
  const out = F('mux-' + desc.replace(/\W/g, '') + '.mp4');
  fs.writeFileSync(out, Buffer.concat(VE.mp4.mux({ W, H, fps: FPS, video: { chunks: V.samples, avcC: V.avcC }, audio: { chunks: achunks, desc: desc === 'built-in' ? null : A.asc, codec: 'aac', sr: SR, ch: 2, bitrate: 192000 } })));
  const tag = ' [AAC config ' + desc + ']', buf = fs.readFileSync(out);
  check(buf.indexOf('moov') < buf.indexOf('mdat'), 'faststart (moov before mdat)' + tag);
  let err = ''; try { err = execSync(`ffmpeg -v error -i ${out} -f null - 2>&1`).toString().trim(); } catch (e) { err = String(e.stdout || e); }
  check(!err, 'decodes without errors' + tag + (err ? ': ' + err.slice(0, 200) : ''));
  const st = JSON.parse(sh(`ffprobe -v error -show_entries stream=codec_name,width,height,nb_frames,duration,sample_rate,channels -of json ${out}`)).streams;
  const v = st.find((s) => s.codec_name === 'h264'), a = st.find((s) => s.codec_name === 'aac');
  check(v && v.width === W && v.height === H && +v.nb_frames === FPS * SEC && Math.abs(v.duration - SEC) < 0.01, 'video h264 ' + (v && v.width + 'x' + v.height + ' ' + v.nb_frames + 'f ' + v.duration + 's') + tag);
  check(a && +a.sample_rate === SR && a.channels === 2 && Math.abs(a.duration - SEC) < 0.05, 'audio aac ' + (a && a.sample_rate + 'Hz ' + a.channels + 'ch ' + a.duration + 's') + tag);
  const keys = sh(`ffprobe -v error -select_streams v -show_entries packet=flags -of csv=p=0 ${out}`).split('\n').filter((l) => l.startsWith('K')).length;
  check(keys === V.samples.filter((s) => s.key).length, 'keyframes ' + keys + tag);
  const fm = (f, m) => sh(`ffmpeg -v error -i ${f} -map 0:${m} -f framemd5 -`).split('\n').filter((l) => l && l[0] !== '#').map((l) => l.split(',').pop().trim());
  const fv = fm(out, 'v'), rv = fm(V.es, 'v');
  check(fv.length === rv.length && fv.every((h, i) => h === rv[i]), 'video frames identical to the reference stream (' + fv.length + ')' + tag);
  const fa = fm(out, 'a'), ra = fm(A.es, 'a');
  check(fa.length === ra.length && fa.every((h, i) => h === ra[i]), 'audio frames identical to the reference stream (' + fa.length + ')' + tag);
  const pts = sh(`ffprobe -v error -select_streams v -show_entries frame=pts_time -of csv=p=0 ${out}`).trim().split('\n').map((l) => parseFloat(l)).sort((x, y) => x - y);
  check(pts.every((p, i) => Math.abs(p - i / FPS) < 0.002), 'frame times 0, 1/30, 2/30 ...' + tag);
}
let threw = ''; try { VE.mp4.mux({ W, H, fps: FPS, video: { chunks: h264(2).samples, avcC: V.avcC }, audio: null }); } catch (e) { threw = e.message; }
check(/out of order/.test(threw), 'B-frame input is refused with a clear error (' + (threw || 'no error') + ')');
if (!process.env.KEEP) fs.rmSync(dir, { recursive: true, force: true });
console.log(fails ? fails + ' FAILED' : 'ALL PASS'); process.exit(fails ? 1 : 0);
