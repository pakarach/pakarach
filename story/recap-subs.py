# Cut a final TTS script (one paragraph per beat: cover, b01.., facts, next, ask) into one-line recap subtitles. Same words; Thai number words become digits.
# usage: python3 story/recap-subs.py script.txt subs.json   (needs: pip install pythainlp). NAMES/KEEP lists are per film: edit them so names are never split.
# Cut the final TTS script into one-line subtitle phrases (words unchanged; Thai number words shown as digits).
import re, json, sys
D = {'ศูนย์':0,'หนึ่ง':1,'เอ็ด':1,'สอง':2,'ยี่':2,'สาม':3,'สี่':4,'ห้า':5,'หก':6,'เจ็ด':7,'แปด':8,'เก้า':9}
U = {'สิบ':10,'ร้อย':100,'พัน':1000,'หมื่น':10000,'แสน':100000}
TOK = re.compile('|'.join(sorted(list(D) + list(U), key=len, reverse=True)))
def num(w):
    if not w or TOK.sub('', w): return None
    parts = TOK.findall(w); total, cur = 0, None
    for p in parts:
        if p in D: cur = D[p]
        else:
            u = U[p]; total += (1 if cur is None else cur) * u; cur = None
    if cur is not None: total += cur
    return total
def digits(text):
    out = []
    for w in text.split(' '):
        n = num(w); out.append(str(n) if n is not None and len(w) > 2 else w)
    return ' '.join(out)
MARK = re.compile('[ัิ-ฺ็-๎]')
glen = lambda s: len(MARK.sub('', s))
from pythainlp.tokenize import word_tokenize, Trie
from pythainlp.corpus.common import thai_words
NAMES = ['แอนทีควอรี่','ซินิสเตอร์','มิสเตอร์ซินิสเตอร์','มาโรเดอร์ส','อันแคนนี่เอ็กซ์เมน','เอ็กซ์เมน','มอร์ล็อค','เซเบอร์ทูธ','อะพอคคาลิปส์','แกมบิท','เรมี่','ฌอง-ลุค','อองรี','จูเลียน','เบลล่า','สตอร์ม','ชาโดว์คิง','ไคโร','นิวออร์ลีนส์','ลุยเซียนา','มิสซิสซิปปี','แอนตาร์กติกา','อีริคเดอะเรด','แม็กนีโต้','ซันไฟร์','ทาโรต์','ไนท์ครอว์เลอร์','จีโนชา','เซนทิเนล','รีเมมเบอร์อิท','เดดพูล','เดอะวอยด์','ฟ็อกซ์','ดิสนีย์','อเวนเจอร์สดูมส์เดย์','ไซคลอปส์','วูล์ฟเวอรีน','จูบิลี่','ไซล็อค','บีสต์','โร้ก','ซาร่าห์','มาร์โรว์','เคจัน','เดธ','มาร์เวล','โคลอสซัส','คิตตี้','สตรีทไฟเตอร์','แคปคอม','เอ็กซ์เมนเลเจนด์','เอ็กซ์เมนโกลด์','เอ็กซ์เมนออริจินส์วูล์ฟเวอรีน','เดดพูลแอนด์วูล์ฟเวอรีน','มิสเตอร์แอนด์มิสซิสเอ็กซ์','ม้าสาวก','ฮันนีมูน']
TRIE = Trie(list(thai_words()) + NAMES)
KEEP = ['เรมี่ เอเตียน เลอโบ','เลอ เดียโบล บลอง','ไมค์ คอลลินส์','คริส แคลร์มอนต์','จิม ลี','ฌอง-ลุค เลอโบ','เรมี่ เลอโบ','เบลล่า ดอนน่า บูโดรซ์','คิตตี้ ไพรด์','เคลลี่ ทอมป์สัน','เทย์เลอร์ คิทช์','แชนนิ่ง เททัม']
GOOD = {'ที่','ให้','ของ','และ','แต่','เพื่อ','จน','ด้วย','กับ','เป็น','จาก','ว่า','ซึ่ง','เพราะ','หรือ','ใน','แล้ว','ก็','คือ','โดย','ถ้า','เหมือน'}
def protect(text):
    for k in KEEP: text = text.replace(k, k.replace(' ', '\u00a0'))
    text = re.sub(r'(ปี|ฉบับที่|ฉบับ|ตอนที่|วันที่) (\d+)', lambda m: m.group(1) + '\u00a0' + m.group(2), text)
    text = re.sub(r'(\d+) (ธันวาคม) (\d+)', '\\1\u00a0\\2\u00a0\\3', text)
    return text
def split_long(t, mx):
    if glen(t) <= mx: return [t]
    ws = word_tokenize(t, custom_dict=TRIE, engine='newmm'); best = None; tot = glen(t); acc = 0
    for i in range(1, len(ws)):
        acc += glen(ws[i - 1]); bal = abs(tot / 2 - acc) - (6 if ws[i] in GOOD else 0)
        if acc >= 8 and tot - acc >= 8 and (best is None or bal < best[0]): best = (bal, i)
    if not best: return [t]
    i = best[1]; return split_long(''.join(ws[:i]), mx) + split_long(''.join(ws[i:]), mx)
def cut(text, mx=34, mn=9):
    toks = [x for t in re.split(r'(?<=,) *| +', protect(text)) if t for x in split_long(t, mx + 6)]
    ph, cur = [], ''
    for t in toks:
        nxt = (cur + ' ' + t).strip()
        if cur and (glen(nxt) > mx and glen(cur) >= mn or glen(nxt) > mx + 12): ph.append(cur); cur = t
        else: cur = nxt
        if cur.endswith(',') and glen(cur) >= mn: ph.append(cur.rstrip(',')); cur = ''
    if cur:
        if ph and glen(cur) < mn and glen(ph[-1] + ' ' + cur) <= mx + 12: ph[-1] += ' ' + cur
        else: ph.append(cur)
    return [p.rstrip(',').replace('\u00a0', ' ') for p in ph]
paras = [p.strip().replace('\n', ' ') for p in open(sys.argv[1]).read().strip().split('\n\n')]
ids = ['cover'] + ['b%02d' % i for i in range(1, len(paras) - 3)] + ['facts', 'next', 'ask']
assert len(paras) == len(ids), len(paras)
res = {i: cut(digits(p)) for i, p in zip(ids, paras)}
json.dump(res, open(sys.argv[2], 'w'), ensure_ascii=False, indent=0)
for i in ids: print(i, ' | '.join(res[i]))
