from pyspark import SparkContext
from demification import image_from_dem
from hbase_dem import store_dem_img

CLUSTER = "yarn"
APP_NAME = "Demification"
FILENAME_POS = 37

def maps (value):
    dem_path = value[0]
    dem_name = dem_path[dem_path.__len__() - 11:]
    img = image_from_dem(value[1])
    store_dem_img(img, dem_name, "9")
    return (dem_name, img)


def spark ():
    sc = SparkContext(CLUSTER, APP_NAME, pyFiles=[__file__])
    num_executor = int(sc.getConf().get('spark.executor.instances'))
    binary_files_rdd = sc.binaryFiles("../raw_data/dem3/",
        minPartitions=num_executor)
    rdd = binary_files_rdd.map(maps)
    print(rdd.count())
    print("Number d'executeur", num_executor)
    print("Nombre de partition sur le rdd", binary_files_rdd.getNumPartitions())

if __name__ == "__main__":
    spark()
