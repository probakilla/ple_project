TILE_LENGHT = 1201

def readDem (filename):
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
                if height[cpt] == 17:
                    print(str(int(lat) + i * 1. / TILE_LENGHT) + "," + str(int(lng) + j * .001 / TILE_LENGHT) + ","  + str(height[cpt]))
                cpt +=1

if __name__ == "__main__":
    s = "./dems/N00E006.hgt"
    b_string1 = s.encode('utf-8')
    test = readDem(b_string1)



