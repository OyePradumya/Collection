Background: 
Following are the rules of Sudoku for a player. 

In all 9 sub matrices 3×3 the elements should be 1-9, without repetition.
In all rows there should be elements between 1-9 , without repetition.
In all columns there should be elements between 1-9 , without repetition.
The task is to generate a 9 x 9 Sudoku grid that is valid, i.e., a player can fill the grid following above set of rules.

A simple naïve solution can be. 

Randomly take any number 1-9.
Check if it is safe to put in the cell.(row , column and box)
If safe, place it and increment to next location and go to step 1.
If not safe, then without incrementing go to step 1.
Once matrix is fully filled, remove k no. of elements randomly to complete game.
Improved Solution : We can improve the solution, if we understand a pattern in this game. We can observe that all 3 x 3 matrices, which are diagonally present are independent of other 3 x 3 adjacent matrices initially, as others are empty. 

