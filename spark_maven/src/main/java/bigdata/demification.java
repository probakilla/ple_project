package bigdata;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.DataInputStream;
import java.io.IOException;

import org.apache.spark.input.PortableDataStream;

public class demification {
	private final static Color [] LIST_COLOR = {new Color(26, 87, 15), new Color(21, 109, 4), new Color (26, 130, 11), new Color (35, 154, 15),
			new Color (55, 169, 1), new Color (88, 176, 9), new Color (114, 192, 26), new Color (164, 228, 86), new Color (198, 239, 99),
			new Color (247, 243, 149), new Color (243, 185, 93), new Color (202, 152, 63), new Color (196, 132, 62),
			new Color (162, 106, 57), new Color (131, 82, 42), new Color (106, 64, 32), new Color (69, 46, 28), new Color (50, 28, 14),
			new Color (63, 39, 25), new Color (74, 49, 34), new Color (82, 56, 41), new Color (96, 66, 52), new Color (105, 77, 61),
			new Color (128, 100, 83), new Color (145, 118, 102), new Color (162, 138, 124), new Color (185, 163, 153),
			new Color (195, 177, 167), new Color (216, 206, 199), new Color (230, 224, 220), new Color (255, 255, 255)};
	private final static int TILE_LENGHT = 1201;
	private final static int BUFFER_SIZE = 2;
	private final static int HIGHEST_HEIGHT = 9000;
	private final static Color OCEAN_COLOR = new Color(16, 118, 217);
	private final static Color ERROR_COLOR = OCEAN_COLOR;
	
	private static int[] convertDem(PortableDataStream pds) {
		DataInputStream dis = pds.open();
		int cpt = 0;
		int[] list_height = new int[TILE_LENGHT*TILE_LENGHT];
		byte[] buffer = new byte[BUFFER_SIZE];
		for (int i = 0; i < TILE_LENGHT; ++i) {
			for (int j = 0; j < TILE_LENGHT; ++j) {
				int len_read;
				try {
					len_read = dis.read(buffer, 0, BUFFER_SIZE);
					if (len_read == -1) {
						System.out.println("Error reading file");
						return null;
					}
					int unsigned0 = ((int) buffer[0] < 0) ? (int)buffer[0] + 256 : (int)buffer[0];
					int unsigned1 = ((int)buffer[1] < 0) ? (int)buffer[1] + 256 : (int)buffer[1];
					list_height[cpt] = (unsigned0 << 8) | unsigned1;
					++cpt;
					
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return list_height;
	}
	
	private static Color[] getColorList (int[] heightArray) {
		Color[] colorArray = new Color[TILE_LENGHT*TILE_LENGHT];
		for (int i = 0; i < heightArray.length; ++i) {
			Color color = OCEAN_COLOR;
			if (heightArray[i] != 0 && heightArray[i] < HIGHEST_HEIGHT) {
				int color_index = (int) (Math.sqrt(heightArray[i])*LIST_COLOR.length/Math.sqrt(HIGHEST_HEIGHT));
				color = LIST_COLOR[color_index];
			}
			if (heightArray[i] > HIGHEST_HEIGHT) {// Invalid data
				color = ERROR_COLOR;
			}
			colorArray[i] = color;
		}
		return colorArray;	
	}
	
	public static BufferedImage imageFromDem (PortableDataStream pds) {
		BufferedImage img = new BufferedImage(TILE_LENGHT, TILE_LENGHT, BufferedImage.TYPE_INT_RGB);
		int [] heightArray = convertDem(pds);
		if (heightArray == null) {
			return null;
		}
		Color [] colorArray = getColorList(heightArray);
		for (int i = 0; i < TILE_LENGHT; ++i) {
			for (int j = 0; j < TILE_LENGHT; ++j) {
				img.setRGB(i, j, colorArray[(j*TILE_LENGHT)+i].getRGB());
			}
		}
		return img;
	}
	
	private static BufferedImage horizontalAggregate (BufferedImage westImg, BufferedImage eastImg) {
		int widthImg = TILE_LENGHT*2;
		int heightImg = TILE_LENGHT;
		BufferedImage img = new BufferedImage(widthImg, heightImg, BufferedImage.TYPE_INT_RGB);
		Graphics2D g2 = img.createGraphics();
		Color oldColor = g2.getColor();
		g2.setPaint(Color.WHITE);
		g2.fillRect(0, 0, widthImg, heightImg);
		g2.setColor(oldColor);
		g2.drawImage(westImg, null, 0, 0);
		g2.drawImage(eastImg, null, westImg.getWidth(), 0);
		g2.dispose();
		return img;
	}
	
	private static BufferedImage verticalAggregate (BufferedImage northImg, BufferedImage southImg) {
		int widthImg = TILE_LENGHT*2;
		int heightImg = TILE_LENGHT*2;
		BufferedImage img = new BufferedImage(widthImg, heightImg, BufferedImage.TYPE_INT_RGB);
		Graphics2D g2 = img.createGraphics();
		Color oldColor = g2.getColor();
		g2.setPaint(Color.WHITE);
		g2.fillRect(0, 0, widthImg, heightImg);
		g2.setColor(oldColor);
		g2.drawImage(southImg, null, 0, 0);
		g2.drawImage(northImg, null, 0, southImg.getHeight());
		g2.dispose();
		Image tmp = img.getScaledInstance(TILE_LENGHT, TILE_LENGHT, Image.SCALE_SMOOTH);
		BufferedImage resizedImage = new BufferedImage(TILE_LENGHT, TILE_LENGHT, BufferedImage.TYPE_INT_RGB);
		resizedImage.getGraphics().drawImage(tmp, 0, 0, null);
		return resizedImage;
	}
	
	public static BufferedImage aggregateDems (BufferedImage nwImg, BufferedImage neImg, BufferedImage seImg, BufferedImage swImg) {
		BufferedImage northImage = horizontalAggregate(nwImg, neImg);
		BufferedImage southImage = horizontalAggregate(swImg, seImg);
		BufferedImage img = verticalAggregate(northImage, southImage);
		return img;
	}
}
