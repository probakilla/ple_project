from pyspark import SparkContext

CLUSTER = "yarn"
APP_NAME = "Demification"
FILENAME_POS = 37

def spark ():
    sc = SparkContext(CLUSTER, APP_NAME, pyFiles=[__file__])
    num_executor = int(sc.getConf().get('spark.executor.instances'))
    binaryFiles_rdd = sc.binaryFiles("../raw_data/dem3/",
        minPartitions=num_executor)
    print(binaryFiles_rdd.take(1)[0][0][FILENAME_POS:])
    print("Number d'executeur", num_executor)
    print("Nombre de partition sur le rdd", binaryFiles_rdd.getNumPartitions())

if __name__ == "__main__":
    spark()
