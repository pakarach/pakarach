import sys
from PIL import Image
out,sc,cols=sys.argv[1],float(sys.argv[2]),int(sys.argv[3]);fs=sys.argv[4:]
ims=[Image.open(f).convert('RGB') for f in fs];w,h=int(ims[0].width*sc),int(ims[0].height*sc)
rows=(len(ims)+cols-1)//cols;S=Image.new('RGB',(w*cols,h*rows),(20,20,20))
for i,im in enumerate(ims):S.paste(im.resize((w,h)),((i%cols)*w,(i//cols)*h))
S.save(out)