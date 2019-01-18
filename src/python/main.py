import math
from PIL import Image
import sys

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

def get_list_pixel(height_array):
    list_pixel = []
    ocean_rgb = (16, 118, 217)
    for i in range(height_array.__len__()):
        pixel = ocean_rgb
        if (height_array[i] != 0 and height_array[i] < HIGHEST_HEIGHT):
            color_index = int(math.sqrt(height_array[i])*(LIST_COLOR.__len__()/math.sqrt(HIGHEST_HEIGHT)))
            pixel = LIST_COLOR[color_index]
        if (height_array[i] > HIGHEST_HEIGHT): # Data error
            pixel = list_pixel[i-1]
        list_pixel.append(pixel)
    return list_pixel


if __name__ == "__main__":
    s = "./dems/" + sys.argv[1] + ".hgt"
    b_string1 = s.encode('utf-8')
    height_list = read_dem(b_string1)
    color = get_list_pixel(height_list)
    img = Image.new('RGB', (TILE_LENGHT, TILE_LENGHT))
    img.putdata(color)
    img.save(sys.argv[1] + '.png')
