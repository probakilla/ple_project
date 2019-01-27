import io
import sys
import base64
import happybase
from PIL import Image

PIPIN = happybase.Connection('ripoux', 8070).table("pipin")
LAT_LENGHT = 2
LNG_LENGHT = 3


def store_dem_img(img, filename, zoom_level):
    cf = "zoom:" + zoom_level
    row_key = filename.upper()
    out = io.BytesIO()
    img.save(out, format='JPEG')
    img_str = base64.b64encode(out.getvalue())
    print(img_str)
    PIPIN.put(row_key, {cf : img_str})

def retrieve_dem(row_key, zoom_level):
    cf = "zoom:" + zoom_level
    return get_image(row_key, cf)

def get_image(row, cf):
    row = PIPIN.row(row, columns=[cf])
    image = Image.open(io.BytesIO(row[str.encode(cf)]))
    return image
