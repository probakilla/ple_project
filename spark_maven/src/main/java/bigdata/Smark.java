package bigdata;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.input.PortableDataStream;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Iterator;

import scala.Tuple2;

public class Smark {
	
	private static BufferedImage DEFAULT_IMAGE = Hbase.HBaseProg.getZidane();
	private static int MAX_ZOOM = 9;
	
	private static String computeKey (String key, int zoomLevel) {
		String[] latLng = key.split("-");
		int lat = Integer.parseInt(latLng[0]);
		int lng = Integer.parseInt(latLng[1]);
		int modulo = (int) Math.pow(2, zoomLevel);
		if (lat % modulo == modulo / 2) {
			lat -= 1 * zoomLevel;
		}
		if (lng % modulo == modulo / 2) {
			lng -= 1 * zoomLevel;
		}
		return new StringBuffer(Integer.toString(lat)).append("-").append(Integer.toString(lng)).toString();
	}
	
	public static String latLngToRowKey (int lat, int lng)
	{
		String latStr = Integer.toString(lat);
		String lngStr = Integer.toString(lng);
		return new StringBuffer(latStr).append("-").append(lngStr).toString();
	}
	
	private static Tuple2<Integer, Integer> rowKeyToLatLng (String rowKey)
	{
		String [] latLng = rowKey.split("-");
		int lat = Integer.parseInt(latLng[0]);
		int lng = Integer.parseInt(latLng[1]);
		return new Tuple2<Integer, Integer>(lat, lng);	
	}
	
	private static String aggregateKey (String key) {
		String[] latLng = key.split("-");
		int lat = Integer.parseInt(latLng[0])/2;
		int lng = Integer.parseInt(latLng[1])/2;
		return latLngToRowKey(lat, lng);
	}
	
	private static JavaPairRDD<String, Iterable<String>> rddAggregation (JavaPairRDD<String, Iterable<String>> rdd, int zoomLevel) {
		return rdd.mapToPair(value -> {
			Iterable<String> listDem = value._2;
			String key = value._1;
			String northWestStr = key;
			String latLng [] = key.split("-");
			String northEastStr = latLngToRowKey (Integer.parseInt(latLng[0]), Integer.parseInt(latLng[1]) + 1);
			String southEastStr = latLngToRowKey (Integer.parseInt(latLng[0]) + 1, Integer.parseInt(latLng[1]) + 1);
			String southWestStr = latLngToRowKey (Integer.parseInt(latLng[0]) + 1, Integer.parseInt(latLng[1]));

			BufferedImage nwImg = DEFAULT_IMAGE;
			BufferedImage neImg = DEFAULT_IMAGE;
			BufferedImage seImg = DEFAULT_IMAGE;
			BufferedImage swImg = DEFAULT_IMAGE;
			Iterator<String>  iter = listDem.iterator();
			String zoomFamily = Integer.toString(MAX_ZOOM - zoomLevel);
			while (iter.hasNext()) {
				String row = iter.next();
				System.out.println(row);
				if (row.equals(northWestStr)) {
					nwImg = Hbase.HBaseProg.getHbaseImg(row, zoomFamily);
				}
				if (row.equals(northEastStr)) {
					neImg = Hbase.HBaseProg.getHbaseImg(row, zoomFamily);
				}
				if (row.equals(southEastStr)) {
					seImg = Hbase.HBaseProg.getHbaseImg(row, zoomFamily);
				}
				if (row.equals(southWestStr)) {
					swImg = Hbase.HBaseProg.getHbaseImg(row, zoomFamily);
				}
			}
			key = aggregateKey(key);
			Hbase.HBaseProg.putDemImg(demification.aggregateDems(nwImg, neImg, seImg, swImg), key, Integer.toString(MAX_ZOOM - zoomLevel - 1));
			Tuple2<String, String> keyValue = new Tuple2<String, String>(computeKey(key, 1), key);
			return keyValue;
		}).groupByKey();
	}
	
	public static void main(String[] args) throws IOException, InterruptedException {
		
		SparkConf conf = new SparkConf().setAppName("SparkVa").setMaster("yarn");
		JavaSparkContext context = new JavaSparkContext(conf);
		JavaPairRDD<String, PortableDataStream> rdd = context.binaryFiles("../raw_data/dem3/");
		JavaPairRDD<String, Iterable<String>> res = rdd.mapToPair(tuple -> {
			String pathFile = tuple._1;
			int pathLen = pathFile.length();
			String nameFile = pathFile.substring(pathLen - 11, pathLen - 4);
			BufferedImage img = demification.imageFromDem(tuple._2);
			if (img == null)
			{
				return null;
			}
			String rowKey = Hbase.HBaseProg.getDemCoordinates(nameFile);
			Hbase.HBaseProg.putDemImg(img, rowKey, "9");
			Tuple2<String, String> keyValue = new Tuple2<String, String>(computeKey(rowKey, 1), rowKey);
			return keyValue;
		}).filter(x -> x != null).groupByKey();
		res.count();
		for (int i = 0; i < MAX_ZOOM; ++i)
		{
			res = rddAggregation (res, i);	
			res.count();
			System.out.println(i);
		}
		context.close(); 
	}
}
