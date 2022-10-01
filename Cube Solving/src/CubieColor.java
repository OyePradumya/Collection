

public class CubieColor {

	public char color;
	private char dir; //Direction of color
	
	/**
	 * Constructs a CubieColor object
	 * @param ncolor, Color of the cubie
	 * @param ndir, direction of the associated color
	 */
	public CubieColor(char ncolor, char ndir) {
		color = ncolor;
		dir = ndir;
	}
	
	/**
	 * @return The color associated with this direction of the cubie
	 */
	public char getColor() {
		return color;
	}
	
	/**
	 * @return The direction associated with this color of the cubie
	 */
	public char getDir() {
		return dir;
	}
	
	/**
	 * Changes the direction of the color to the parameter
	 * @param ndir the new direction
	 */
	public void setDir(char ndir) {
		dir = ndir;
	}
	
	/**
	 * Sets the color to the parameter
	 * @param ncolor the new color
	 */
	public void setColor(char ncolor) {
		color = ncolor;
	}
	
}
