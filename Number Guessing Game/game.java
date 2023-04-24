import java.util.Scanner;


public class game {

	public static void main(String[] args) {
		int num = 1+(int)(Math.random()*100);   
		int tot_trial = 10;
		int my_trial = 1;
		System.out.println("\n******** Welcome To The Game - Guess The Number ********\n");
		
		while(my_trial <= tot_trial)       
		{
			Scanner sc = new Scanner(System.in);
			System.out.println("Enter any number between 1 and 100 : ");  
			int guess = sc.nextInt();
			
			if(num==guess)   
			{
				System.out.println("Congrats !!!");
				System.out.println("The entered number matches with the random number");
				System.out.println("\n******** Thank You For Playing The Game ********\n");
				break;      
			}
			else if(guess>num)   
			{
				System.out.println("The entered number is greater than the random number");
			}
			else if(guess<num)   
			{
				System.out.println("The entered number is smaller than the random number");
			}
			
			String str2 = String.format("This is your %d attempt", my_trial);  
			System.out.println(str2);
			String str3 = String.format("You have %d attempts left\n", 10-my_trial);  
			System.out.println(str3);
			if(my_trial==tot_trial)
			{
			    System.out.println("You have exhausted all trials.");
		          System.out.println("The number was " + num);
		          System.out.println("Sorry... You Lost the game \n Try Again");
			}
			my_trial = my_trial + 1;
		}
		

	}

}
