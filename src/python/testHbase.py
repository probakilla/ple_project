import happybase
import io
from PIL import Image

PIPIN = happybase.Connection('young', 8070).table("pipin")
LAT_LENGHT = 2
LNG_LENGHT = 3

def store_dem(filename):
    im = Image.open(filename)
    lat_lng = filename[1:3] + filename[4:7]
    cf = filename[0] + ":" + filename[3]
    out = io.BytesIO()
    im.save(out, format='png')
    PIPIN.put(lat_lng, {cf : out.getvalue()})


def retrieve_dem(lat, lng):
    lat_row = 'N'
    lng_row = 'E'
    if lat < 0:
        lat_row = 'S'
        lat *= -1
    if lng < 0:
        lng_row = 'W'
        lng *= -1
    cf = lat_row + ":" + lng_row
    str_lat = str(lat).zfill(LAT_LENGHT)
    str_lng = str(lng).zfill(LNG_LENGHT)
    lat_lng = str_lat + str_lng
    row = PIPIN.row(lat_lng, columns=[cf])
    image = Image.open(io.BytesIO(row[str.encode(cf)]))
    return image


if __name__ == "__main__":
    pass
    #store_dem("N45W001.png")
    #image = retrieve_dem(45, -1)
    #image.save("N45W001.png")
    #image.show()
