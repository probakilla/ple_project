from pyspark import SparkContext
from demification import image_from_dem
from hbase_dem import store_dem_img

CLUSTER = "yarn"
APP_NAME = "Demification"
FILENAME_POS = 37

def image_map (value):
    dem_path = value[0]
    len_dem_path = dem_path.__len__()
    dem_name = dem_path[len_dem_path - 11: len_dem_path -4]
    img = image_from_dem(value[1])
    store_dem_img(img, dem_name, "9")
    return (compute_key(dem_name), (dem_name, img))

def compute_key (filename):
    lat = int(filename[1:3])
    if lat % 2 == 1:
        lat -= 1
    lng = int(filename[4:7])
    if lng % 2 == 1:
        lng -= 1
    return str(lat) + str(lng)

def aggregate_map (value):
    return (value)


def spark ():   
    sc = SparkContext(CLUSTER, APP_NAME, pyFiles=[__file__])
    num_executor = int(sc.getConf().get('spark.executor.instances'))
    binary_files_rdd = sc.binaryFiles("../raw_data/dem3/",
        minPartitions=num_executor)
    rdd = binary_files_rdd.map(image_map)#.groupByKey().map(aggregate_map)
    print(rdd.count())
    print("Number d'executeur", num_executor)
    print("Nombre de partition sur le rdd", binary_files_rdd.getNumPartitions())

if __name__ == "__main__":
    spark()
