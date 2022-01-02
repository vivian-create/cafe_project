import os

def batch_rename(path):
    count = 0
    for fname in os.listdir(path):
        if(fname.endswith('.jpg')):
            new_fname = fname.replace(".jpg",".png")
           
            os.rename(os.path.join(path, fname), os.path.join(path, new_fname))
        count = count + 1     

batch_rename("./img")