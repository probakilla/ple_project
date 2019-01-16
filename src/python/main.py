import math
from PIL import Image
# from colour import Color

HIGHEST_HEIGHT = 2550
TILE_LENGHT = 1201

LIST_COLOR = [(174,218,243), (52, 116, 23), (242, 200, 147), (214, 167, 87), (139, 81, 74), (254, 254, 254)]

def readDem (filename):
    test = []
    with open(filename, "rb") as file:
        cpt = 0
        height = []
        filen = filename[filename.__len__() - 11:filename.__len__() - 4].decode("utf8")
        lat = filen[1:2]
        lng = filen[4:7]
        if (filen[0]=='S' or filen[0]=='s'):
            lat *= -1
        if (filen[3]=='W' or filen[3]=='w'):
            lng *= -1
        for i in range(TILE_LENGHT):
            for j in range(TILE_LENGHT):
                buffer = file.read(2)
                if(not buffer):
                    print ("Error reading file!")
                    return -1
                height.append((buffer[0] << 8) | buffer[1])
                test.append(height[cpt])
                # if height[cpt] == 17:
                #     print(str(int(lat) + i * 1. / TILE_LENGHT) + "," + str(int(lng) + j * .001 / TILE_LENGHT) + ","  + str(height[cpt]))
                cpt +=1
        return test

def echelle(color_begin, color_end, n_vals):
    r1, g1, b1 = color_begin
    r2, g2, b2 = color_end
    degrade = []
    etendue = n_vals - 1
    for i in range(n_vals):
        alpha = 1 - i / etendue
        beta = i / etendue
        r = int(r1 * alpha + r2 * beta)
        g = int(g1 * alpha + g2 * beta)
        b = int(b1 * alpha + b2 * beta)
        degrade.append((r, g, b))
    return degrade

# im = Image.new('RGB', (1201, 1201))
# ld = im.load()

# def gaussian(x, a, b, c, d=0):
#     return a * math.exp(-(x - b)**2 / (2 * c**2)) + d

if __name__ == "__main__":
    # listColor = []

    # blanc = (255, 255, 255)
    # bleu = (0, 0, 255)
    # listColor = echelle(bleu, blanc, HIGHEST_HEIGHT)

    # red = Color("black")
    # colors = list(red.range_to(Color("white"),HIGHEST_HEIGHT))
    # for c in colors:
    #     listColor.append((int(c.red*255), int(c.green*255), int(c.blue*255)))

    s = "./dems/N00E006.hgt"
    b_string1 = s.encode('utf-8')
    test = readDem(b_string1)
    listColor = []
    for i in range(test.__len__()):
        color = LIST_COLOR[0]
        if test[i] > 0:
            color = LIST_COLOR[1]
        if test[i] >= 500:
            color = LIST_COLOR[2]
        if test[i] >= 1000:
            color = LIST_COLOR[3]
        if test[i] >= 1500:
            color = LIST_COLOR[4]
        if test[i] >= 2000:
            color = LIST_COLOR[5]
        listColor.append(color)
    img = Image.new('RGB', (TILE_LENGHT, TILE_LENGHT))
    img.putdata(listColor)
    img.save('image.png')
