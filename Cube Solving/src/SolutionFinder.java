
public class SolutionFinder {

	private static Cube cube;
	
	public static void main(String[] args) {
		double sum = 0;
		
		long startTime = System.nanoTime();
		System.out.println("Initializing...");
		cube = new Cube();
		//Scramble it up
		String scramble = "L R' U2 B2 L2 U2 B2 L D2 R' F2 D B F2 L' D U2 B R' U' L'";
		System.out.println("Scramble: " + scramble + "\n");
		cube.scramble(scramble);
		
		String sunflower = cube.makeSunflower();
		System.out.println("Making the sunflower:");
		System.out.println(sunflower);
		System.out.println("Optimized: \n" + cube.optimizeMoves(sunflower) + "\n");
		
		String whiteCross = cube.makeWhiteCross();
		System.out.println("Making the white cross:");
		System.out.println(whiteCross);
		System.out.println("Optimized: \n" + cube.optimizeMoves(whiteCross) + "\n");
		
		String whiteCorners = cube.finishWhiteLayer();
		System.out.println("Inserting the white corners:");
		System.out.println(whiteCorners);
		System.out.println("Optimized: \n" + cube.optimizeMoves(whiteCorners) + "\n");
		
		String edges = cube.insertAllEdges();
		System.out.println("Finishing second layer:");
		System.out.println(edges);
		System.out.println("Optimized: \n" + cube.optimizeMoves(edges) + "\n");
		
		String yellowCross = cube.makeYellowCross();
		System.out.println("Making the yellow cross:");
		System.out.println(yellowCross);
		System.out.println("Optimized: \n" + cube.optimizeMoves(yellowCross) + "\n");
		
		String OLL = cube.orientLastLayer();
		System.out.println("Orienting the last layer:");
		System.out.println(OLL);
		System.out.println("Optimized: \n" + cube.optimizeMoves(OLL) + "\n");
		
		String PLL = cube.permuteLastLayer();
		System.out.println("Permuting the last layer:");
		System.out.println(PLL);
		System.out.println("Optimized: " + cube.optimizeMoves(PLL) + "\n");
		
		long endTime = System.nanoTime();
		long runtime = endTime - startTime;
		sum+=runtime;
		System.out.println("Done in " + (sum/1000000) + " milliseconds" + "\n\n\n\n");
		
		System.out.println("Here" + "Hello".substring(5));
		
	}
}



