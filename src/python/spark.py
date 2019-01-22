from pyspark import SparkContext
from demification import image_from_dem
from hbase import store_dem_img

CLUSTER = "yarn"
APP_NAME = "Demification"
FILENAME_POS = 37
PYTHON_PATH = "/autofs/unitytravail/travail/gchupin/M2/PLE/ple_project/src/python/"

def maps (value):
    dem_path = value[0]
    if dem_path == "hdfs://ripoux:9000/user/raw_data/dem3/N00E006.hgt":
        img = image_from_dem(value[1])
        store_dem_img(img, "N00E006", 9)
        return ("test", img)


def spark ():
    sc = SparkContext(CLUSTER, APP_NAME, pyFiles=[__file__,PYTHON_PATH + "demification.py"])
    num_executor = int(sc.getConf().get('spark.executor.instances'))
    binary_files_rdd = sc.binaryFiles("../raw_data/dem3/",
        minPartitions=num_executor)
    rdd = binary_files_rdd.map(maps)
    test = rdd.take(1)
    test[0][1].show()
    print("Number d'executeur", num_executor)
    print("Nombre de partition sur le rdd", binary_files_rdd.getNumPartitions())

if __name__ == "__main__":
    spark()
