import happybase
import io
from PIL import Image

PIPIN = happybase.Connection('young', 8070).table("pipin")
LAT_LENGHT = 2
LNG_LENGHT = 3

def store_dem_img(img, filename, zoom_level):
    #im = Image.open(filename)
    row_key = filename[1:3] + filename[4:7] + zoom_level
    cf = filename[0] + ":" + filename[3]
    out = io.BytesIO()
    img.save(out, format='png')
    PIPIN.put(row_key, {cf : out.getvalue()})


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
    return get_image(lat_lng, cf)

def get_image(row, cf):
    row = PIPIN.row(row, columns=[cf])
    image = Image.open(io.BytesIO(row[str.encode(cf)]))
    return image

if __name__ == "__main__":

    #store_dem(img, "N45W001.png")
    image = retrieve_dem(69, -69)
    #image.save("N45W001.png")
    image.show()
