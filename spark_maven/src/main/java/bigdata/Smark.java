package bigdata;

import org.apache.hadoop.hbase.client.Connection;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.input.PortableDataStream;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import scala.Tuple2;

public class Smark {
	
	private static String computeKey (String filename, int zoomLevel) {
		int lat = Integer.parseInt(filename.substring(1, 3));
		int lng = Integer.parseInt(filename.substring(4, 7));
		int modulo = (int) Math.pow(2, zoomLevel);
		if (lat % modulo == modulo / 2) {
			lat -= 1 * zoomLevel;
		}
		if (lng % modulo == modulo / 2) {
			lng -= 1 * zoomLevel;
		}
		String latStr = org.apache.commons.lang.StringUtils.leftPad(Integer.toString(lat), 2, "0");
		String lngStr = org.apache.commons.lang.StringUtils.leftPad(Integer.toString(lng), 3, "0");
		return new StringBuffer(latStr).append(lngStr).toString();
	}
	

	private static Tuple2<Integer, Integer> demNameToLatLng (String demName)
	{
		String latCard = demName.substring(0, 1);
		String lngCard = demName.substring(3, 4);
		int lat = Integer.parseInt(demName.substring(1, 3));
		if (latCard.equals("S")) {
			lat *= -1;
		}
		int lng = Integer.parseInt(demName.substring(4, 7));
		if (lngCard.equals("W")) {
			lng *=-1;
		}
		
		return new Tuple2<Integer, Integer>(lat, lng);
	}
	
	public static String latLngToDemName (int lat, int lng)
	{
		String latCard = "N";
		String lngCard = "E";
		if (lat < 0) {
			latCard = "S";
			lat *= -1;
		}
		if (lng < 0) {
			lngCard = "W";
			lng *= -1;
		}
		String latStr = Integer.toString(lat);
		String lngStr = Integer.toString(lng);
		return new StringBuffer(latCard).append(latStr).append(lngCard).append(lngStr).toString();
	}
	
	public static void aggregate (Tuple2<String, List<Tuple2<String, BufferedImage>>> value) {
		int zoomLevel = 1;
		int incr = (int) Math.pow(2, zoomLevel);
		List<Tuple2<String, BufferedImage>> listDem = value._2;
		String key = value._1;
		String northWestStr = key;
		Tuple2<Integer, Integer> latLng = demNameToLatLng(key);
		String northEastStr = latLngToDemName (latLng._1, latLng._2 + incr);
		String southEastStr = latLngToDemName (latLng._1 + incr, latLng._2 + incr);
		String southWestStr = latLngToDemName (latLng._1 + incr, latLng._2);
		BufferedImage nwImg = null;
		BufferedImage neImg = null;
		BufferedImage seImg = null;
		BufferedImage swImg = null;
		Iterator<Tuple2<String, BufferedImage>>  iter = listDem.iterator();
		while (listDem.iterator().hasNext()) {
			Tuple2<String, BufferedImage> tuple = iter.next();
			if (tuple._1.equals(northWestStr)) {
				nwImg = tuple._2;
			}
			if (tuple._1.equals(northEastStr)) {
				neImg = tuple._2;
			}
			if (tuple._1.equals(southEastStr)) {
				seImg = tuple._2;
			}
			if (tuple._1.equals(southWestStr)) {
				swImg = tuple._2;
			}
		}
		demification.aggregateDems(nwImg, neImg, seImg, swImg);
	}
	
	public static void main(String[] args) throws IOException, InterruptedException {
		
		SparkConf conf = new SparkConf().setAppName("SparkVa").setMaster("yarn");
		//conf.set("spark.hbase.host", "young");
		JavaSparkContext context = new JavaSparkContext(conf);
		/*Connection con = Hbase.HBaseProg.setup();
		Hbase.HBaseProg.getZidane();
		con.close();*/
		JavaPairRDD<String, PortableDataStream> rdd = context.binaryFiles("../raw_data/dem3/");
		JavaRDD<Tuple2<String, String>> res = rdd.map(tuple -> {
			String pathFile = tuple._1;
			int pathLen = pathFile.length();
			String nameFile = pathFile.substring(pathLen - 11, pathLen - 4);
			BufferedImage img = demification.imageFromDem(tuple._2);
			if (img == null)
			{
				return null;
			}
			String row = Hbase.HBaseProg.putDemImg(img, nameFile, "9");
			Tuple2<String, String> keyValue = new Tuple2<String, String>(nameFile, row);
			//Hbase.HBaseProg.closeCon();
			return keyValue;
			
		}).filter(x -> x != null);
		res.count();
		context.close(); 
	}
}
