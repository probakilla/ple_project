from PIL import Image

HIGHEST_HEIGHT = 9000
TILE_LENGHT = 1201

LIST_COLOR = [(26, 87, 15), (21, 109, 4), (26, 130, 11), (35, 154, 15), (55, 169, 1), (88, 176, 9), (114, 192, 26), (164, 228, 86), (198, 239, 99), (247, 243, 149), (243, 185, 93), (202, 152, 63), (196, 132, 62), (162, 106, 57), (131, 82, 42), (106, 64, 32), (69, 46, 28), (50, 28, 14), (129, 96, 88), (158, 130, 126), (182, 159, 154), (207, 193, 190), (230, 221, 217), (241, 243, 240), (255, 255, 255)]

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

def getColor(array):
    color = []
    ocean_rgb = (16, 118, 217)
    for i in range(array.__len__()):
        if (test[i] > HIGHEST_HEIGHT or test[i] == 0):
            tmp = ocean_rgb
        elif (0 < test[i] <= 20):
            tmp = LIST_COLOR[0]
        elif (20 < test[i] <= 40):
            tmp = LIST_COLOR[1]
        elif (40 < test[i] <= 70):
            tmp = LIST_COLOR[2]
        elif (70 < test[i] <= 100):
            tmp = LIST_COLOR[3]
        elif (100 < test[i] <= 150):
            tmp = LIST_COLOR[4]
        elif (150 < test[i] <= 200):
            tmp = LIST_COLOR[5]
        elif (200 < test[i] <= 300):
            tmp = LIST_COLOR[6]
        elif (300 < test[i] <= 400):
            tmp = LIST_COLOR[7]
        elif (400 < test[i] <= 500):
            tmp = LIST_COLOR[8]
        elif (500 < test[i] <= 650):
            tmp = LIST_COLOR[9]
        elif (650 < test[i] <= 800):
            tmp = LIST_COLOR[10]
        elif (800 < test[i] <= 1000):
            tmp = LIST_COLOR[11]
        elif (1000 < test[i] <= 1250):
            tmp = LIST_COLOR[12]
        elif (1250 < test[i] <= 1500):
            tmp = LIST_COLOR[13]
        elif (1500 < test[i] <= 1750):
            tmp = LIST_COLOR[14]
        elif (1750 < test[i] <= 2000):
            tmp = LIST_COLOR[15]
        elif (2000 < test[i] <= 2300):
            tmp = LIST_COLOR[16]
        elif (2300 < test[i] <= 2600):
            tmp = LIST_COLOR[17]
        elif (2600 < test[i] <= 3000):
            tmp = LIST_COLOR[18]
        elif (3000 < test[i] <= 3500):
            tmp = LIST_COLOR[19]
        elif (3500 < test[i] <= 4000):
            tmp = LIST_COLOR[20]
        elif (4000 < test[i] <= 5000):
            tmp = LIST_COLOR[21]
        elif (5000 < test[i] <= 6000):
            tmp = LIST_COLOR[22]
        elif (6000 < test[i] < 7000):
            tmp = LIST_COLOR[23]
        elif (7000 < test[i]):
            tmp = LIST_COLOR[24]
        color.append(tmp)
    return color
        


if __name__ == "__main__":
    s = "./dems/N45W001.hgt"
    b_string1 = s.encode('utf-8')
    test = readDem(b_string1)
    color = getColor(test)
    img = Image.new('RGB', (TILE_LENGHT, TILE_LENGHT))
    img.putdata(color)
    img.save('image.png') 