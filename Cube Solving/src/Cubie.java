
public class Cubie {

	//Store x, y, and z positions of a cubie
	private int x;
	private int y;
	private int z;
	private boolean corner;
	private boolean edge;
	//Store the set of colors associated with a cubie; accessible to all subclasses
	public CubieColor[] colors;
	
	/**
	 * Constructs a Cubie object
	 * Sets the location of the cubie
	 * @param xPos the x position of the cubie
	 * @param yPos the y position of the cubie
	 * @param zPos the z position of the cubie
	 * @param nColors the colors which the cubie will hold
	 * @param isCorner whether the cubie is a corner cubie
	 * @param isEdge whether the cubie is an edge cubie
	 */
	public Cubie (int xPos, int yPos, int zPos, CubieColor[] nColors, boolean isCorner,
			boolean isEdge) {
		x = xPos;
		y = yPos;
		z = zPos;
		corner = isCorner;
		edge = isEdge;
		colors = nColors;
	}
	
	/**
	 * @return x location of cubie
	 */
	public int getX() {
		return x;
	}
	
	/**
	 * @return y location of cubie
	 */
	public int getY() {
		return y;
	}
	
	/**
	 * @return z location of cubie
	 */
	public int getZ() {
		return z;
	}
	
	/**
	 * Finds and returns the direction of a particular color on any type of cubie
	 * @param color The color for which the direction is being found
	 * @return the direction of the color on the corresponding cubie ('A' if color is not on cubie)
	 */
	public char getDirOfColor(char color) {
		for(int i = 0; i<colors.length; i++) {
			if(colors[i].getColor() == color)
				return colors[i].getDir();
		}
		return 'A';
	}
	
	/**
	 * Finds and returns the color in a particular direction on any type of cubie
	 * @param dir The direction for which the color is being found
	 * @return the direction of the color on the corresponding cubie ('A' if cubie does not have a color in direction dir)
	 */
	public char getColorOfDir(char dir) {
		for(int i = 0; i<colors.length; i++) {
			if(colors[i].getDir() == dir)
				return colors[i].getColor();
		}
		return 'A';
	}
	
	/**
	 * @return CubieColor[] the colors of the Cubie and their respective directions
	 */
	public CubieColor[] getColors() {
		return colors;
	}
	
	/**
	 * Sets the colors of the cubie to those inputed as an array of CubieColors.
	 * @param newColors the colors that will be applied to the cubie
	 */
	public void setColors(CubieColor[] newColors) {
		this.colors = newColors;
	}
	
	/**
	 * Changes the color in the given direction. 
	 * @param dir: direction
	 * @param ncolor: new color
	 */
	public void setColorOfDir(char dir, char ncolor) {
		for(int i = 0; i<colors.length; i++) {
			if(colors[i].getDir() == dir)
				colors[i].setColor(ncolor);
		}
	}
	
	/**
	 * Returns whether the cubie is a corner cubie
	 * @return whether corner cubie
	 */
	public boolean isCornerCubie() {
		return corner;
	}
	
	/**
	 * Returns whether the cubie is an edge cubie
	 * @return whether edge cubie
	 */
	public boolean isEdgeCubie() {
		return edge;
	}
	
	/**
	 * Used to aid formation of the white cross
	 * @param x the x position of the cubie
	 * @param y the y position of the cubie
	 * @return For any EdgeCubie that is NOT in the E Slice, returns the vertical slice that cubie belongs in
	 */
	public char verticalFace(int x, int y) {
		if(edge) {
			if(x == 0) return 'L';
			else if(x == 1) {
				if(y == 0) {
					return 'F';
				}
				else return 'B';
			}
			else return 'R';
		}
		return 'A';
	
	}
	
	/**
	 * If the cubie is a corner cubie, method returns whether the cubie is a white corner
	 * Returns false if cubie is not a corner cubie
	 * @return whether corner cubie
	 */
	public boolean isWhiteCorner() {
		if(corner) {
			return (colors[0].getColor()=='W'|| colors[1].getColor()=='W' || colors[2].getColor()=='W');
		}
		return false;
	}

}
