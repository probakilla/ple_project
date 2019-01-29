//=====================================================================
/**
 * Squelette minimal d'une application HBase 0.99.1
 * A exporter dans un jar sans les librairies externes
 * Il faut initialiser la variable d'environement HADOOP_CLASSPATH
 * Il faut utiliser la commande hbase 
 * A exécuter avec la commande ./hadoop jar NOMDUFICHER.jar ARGUMENTS....
 */
package bigdata;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.conf.Configured;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.HColumnDescriptor;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.TableName;
import org.apache.hadoop.hbase.client.Admin;
import org.apache.hadoop.hbase.client.Connection;
import org.apache.hadoop.hbase.client.ConnectionFactory;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Table;
import org.apache.hadoop.hbase.util.Base64;
import org.apache.hadoop.hbase.util.Bytes;


public class Hbase {

	public static class HBaseProg extends Configured  {
		private static final byte[] FAMILY = Bytes.toBytes("zoom");
		private static final byte[] TABLE_NAME = Bytes.toBytes("pipin");
		private static Table table = null;
		private static Connection con = null;

		public static void createOrOverwrite(Admin admin, HTableDescriptor table) throws IOException {
			if (admin.tableExists(table.getTableName())) {
				admin.disableTable(table.getTableName());
				admin.deleteTable(table.getTableName());
			}
			admin.createTable(table);
		}
		
		public static void closeCon () throws IOException {
			con.close();
		}
		
		public static void createTable(Connection connect) {
			try {
				final Admin admin = connect.getAdmin(); 
				HTableDescriptor tableDescriptor = new HTableDescriptor(TableName.valueOf(TABLE_NAME));
				HColumnDescriptor famLoc = new HColumnDescriptor(FAMILY);
				tableDescriptor.addFamily(famLoc);
				createOrOverwrite(admin, tableDescriptor);
				admin.close();
			} catch (Exception e) {
				e.printStackTrace();
				System.exit(-1);
			}
		}
		
		public static String putDemImg (BufferedImage img, String filename, String zoomLevel) throws IOException {
			table = getTable();
			String key = getDemCoordinates(filename.toUpperCase());
			byte[] rowkey = Bytes.toBytes(key);
			byte[] columnName = Bytes.toBytes(zoomLevel);
			byte[] columnVar = Bytes.toBytes(encodeToString(img, "jpg"));
			Put put = new Put(rowkey);
			put.addColumn(FAMILY, columnName, columnVar);
			table.put(put);
			return key;
		}
		
		public static BufferedImage getZidane() throws IOException {
			table = getTable();
			BufferedImage image = null;
			Get get = new Get(Bytes.toBytes("default"));
			get.addFamily(FAMILY);
			byte[] imgByte = table.get(get).getValue(FAMILY, Bytes.toBytes("0"));
			if (imgByte == null) {
				System.out.println("Récupération échoué");
			}
			byte[] testByte = Base64.decode(Bytes.toString((imgByte)));
			ByteArrayInputStream bis = new ByteArrayInputStream(imgByte);
			image = ImageIO.read(bis);
			bis.close();
			File outputfile = new File("image.png");
			ImageIO.write(image, "png", outputfile);
			return image;
		}
		
		private static Table getTable () throws IOException {
			if (table == null) {
				TableName tableName = TableName.valueOf("pipin");
				table = getCon().getTable(tableName);
			}
			return table;
		}
		
		private static Connection getCon () throws IOException {
			if (con == null) {
				Configuration hconf = HBaseConfiguration.create();
				hconf.set("hbase.zookeeper.quorum", "young");
				hconf.set("hbase.zookeeper.property.clientPort", "2181");
				con = ConnectionFactory.createConnection(hconf);
			}
			return con;
		}
		
		private static String encodeToString(BufferedImage image, String type) {
			String imageStr = null;
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			try {
				ImageIO.write(image, type, bos);
				byte [] imageBytes = bos.toByteArray();
				imageStr = Base64.encodeBytes(imageBytes);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return imageStr;
		}

		private static String getDemCoordinates(String filename) {
			String cardLat = filename.substring(0, 1);
			String cardLng = filename.substring(3, 4);
			int lat = Integer.parseInt(filename.substring(1, 3));
			int lng = Integer.parseInt(filename.substring(4, 7));
			if (cardLat.equals("S")) {
				lat *= -1;
			}
			if (cardLng.equals("E")) {
				lng *= -1;
			}
			lat += 90;
			lng += 180;
			return new StringBuffer(Integer.toString(lat)).append("-").append(Integer.toString(lng)).toString();
		}
	}

}

