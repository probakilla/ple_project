from PIL import Image

HIGHEST_HEIGHT = 9000
TILE_LENGHT = 1201

LIST_COLOR = [(26, 87, 15), (21, 109, 4), (26, 130, 11), (35, 154, 15),
    (55, 169, 1), (88, 176, 9), (114, 192, 26), (164, 228, 86), (198, 239, 99),
    (247, 243, 149), (243, 185, 93), (202, 152, 63), (196, 132, 62),
    (162, 106, 57), (131, 82, 42), (106, 64, 32), (69, 46, 28), (50, 28, 14),
    (63, 39, 25), (74, 49, 34), (82, 56, 41), (96, 66, 52), (105, 77, 61),
    (128, 100, 83), (145, 118, 102), (162, 138, 124), (185, 163, 153),
    (195, 177, 167), (216, 206, 199), (230, 224, 220), (255, 255, 255)]

def read_dem (filename):
    test = []
    with open(filename, "rb") as file:
        cpt = 0
        height = []
        name_size = filename.__len__()
        filen = filename[name_size - 11:name_size - 4].decode("utf8")
        # lat = filen[1:2]
        # lng = filen[4:7]
        # if (filen[0]=='S' or filen[0]=='s'):
        #     lat *= -1
        # if (filen[3]=='W' or filen[3]=='w'):
        #     lng *= -1
        for i in range(TILE_LENGHT):
            for j in range(TILE_LENGHT):
                buffer = file.read(2)
                if(not buffer):
                    print ("Error reading file!")
                    return -1
                height.append((buffer[0] << 8) | buffer[1])
                test.append(height[cpt])
                # if height[cpt] == 17:
                # latStr = str(int(lat) + i * 1. / TILE_LENGHT)
                # lngStr = str(int(lng) + j * .001 / TILE_LENGHT)
                # print(latStr + "," + lngStr + ","  + str(height[cpt]))
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
        elif (3000 < test[i] <= 3400):
            tmp = LIST_COLOR[19]
        elif (3400 < test[i] <= 3800):
            tmp = LIST_COLOR[20]
        elif (3800 < test[i] <= 4200):
            tmp = LIST_COLOR[21]
        elif (4200 < test[i] <= 4600):
            tmp = LIST_COLOR[22]
        elif (4600 < test[i] < 5000):
            tmp = LIST_COLOR[23]
        elif (5000 < test[i] < 5400):
            tmp = LIST_COLOR[24]
        elif (5400 < test[i] < 5800):
            tmp = LIST_COLOR[25]
        elif (5800 < test[i] < 6200):
            tmp = LIST_COLOR[26]
        elif (6200 < test[i] < 6600):
            tmp = LIST_COLOR[27]
        elif (6600 < test[i] < 7000):
            tmp = LIST_COLOR[28]
        elif (7000 < test[i] < 7400):
            tmp = LIST_COLOR[29]
        elif (7400 < test[i] < 7800):
            tmp = LIST_COLOR[30]
        color.append(tmp)
    return color
        


if __name__ == "__main__":
    s = "./dems/N00E006.hgt"
    b_string1 = s.encode('utf-8')
    test = read_dem(b_string1)
    color = getColor(test)
    img = Image.new('RGB', (TILE_LENGHT, TILE_LENGHT))
    img.putdata(color)
    img.save('image.png') 