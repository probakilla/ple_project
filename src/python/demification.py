import math
import numpy as np
from PIL import Image
from io import BytesIO

HIGHEST_HEIGHT = 9000
TILE_LENGHT = 1201


LIST_COLOR = [(26, 87, 15), (21, 109, 4), (26, 130, 11), (35, 154, 15),
    (55, 169, 1), (88, 176, 9), (114, 192, 26), (164, 228, 86), (198, 239, 99),
    (247, 243, 149), (243, 185, 93), (202, 152, 63), (196, 132, 62),
    (162, 106, 57), (131, 82, 42), (106, 64, 32), (69, 46, 28), (50, 28, 14),
    (63, 39, 25), (74, 49, 34), (82, 56, 41), (96, 66, 52), (105, 77, 61),
    (128, 100, 83), (145, 118, 102), (162, 138, 124), (185, 163, 153),
    (195, 177, 167), (216, 206, 199), (230, 224, 220), (255, 255, 255)]

def convert_dem (binary_dem):
    list_height = []
    cpt = 0
    file = BytesIO(binary_dem)
    height = []
    for i in range(TILE_LENGHT):
        for j in range(TILE_LENGHT):
            buffer = file.read(2)
            print (buffer)
            if(not buffer):
                print ("Error reading file!")
                return -1
            height.append((ord(buffer[0]) << 8) | ord(buffer[1]))
            list_height.append(height[cpt])
            cpt +=1
    return list_height

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

def aggregate_dem(nw_image, ne_image, se_image, sw_image):
    north_imgs_comb = np.hstack( (np.asarray( nw_image ), np.asarray( ne_image) ) )
    south_imgs_comb = np.hstack( (np.asarray( sw_image ), np.asarray( se_image) ) )
    imgs_comb = np.vstack( (north_imgs_comb, south_imgs_comb ) )
    imgs_comb = Image.fromarray( imgs_comb)
    imgs_comb = imgs_comb.resize((TILE_LENGHT, TILE_LENGHT))
    return imgs_comb

def image_from_dem (s):
    height_list = convert_dem(s)
    if (height_list == -1):
        sys.exit(1)
    color = get_list_pixel(height_list)
    img = Image.new('RGB', (TILE_LENGHT, TILE_LENGHT))
    img.putdata(color)
    return img
