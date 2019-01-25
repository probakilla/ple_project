import io
import sys
import happybase
from PIL import Image

PIPIN = happybase.Connection('ripoux', 8070).table("pipin")
LAT_LENGHT = 2
LNG_LENGHT = 3


def store_dem_img(img, filename, zoom_level):
    cf = "zoom:" + zoom_level
    row_key = filename[1:3] + filename[4:7]
    out = io.BytesIO()
    img.save(out, format='jpeg')
    PIPIN.put(row_key, {cf : out.getvalue()})

def retrieve_dem(lat, lng, zoom_level):
    if lat < 0:
        lat *= -1
    if lng < 0:
        lng *= -1
    cf = "zoom:" + zoom_level
    str_lat = str(lat).zfill(LAT_LENGHT)
    str_lng = str(lng).zfill(LNG_LENGHT)
    lat_lng = str_lat + str_lng
    return get_image(lat_lng, cf)

def get_image(row, cf):
    row = PIPIN.row(row, columns=[cf])
    image = Image.open(io.BytesIO(row[str.encode(cf)]))
    return image