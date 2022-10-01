
public class Debugging {
	
	public static void main(String[] args) {
		Cube cube = new Cube();
		cube.turn("U");
		cube.testTurning();
		System.out.println("\n\n\n\n");
		cube.turn("U'");
		cube.testTurning();
		
		//Working:
		//F, B, R, L, S, M, E, D, U
		//S follows F, M follows L, E follows D
	}
	
	
}
