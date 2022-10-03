#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Apr  6 07:41:41 2020

@author: maxfranco
"""

import random

#pick random number to be guessed from 1 to 50
num = random.randint(1,50)


#Welcome and instructions for player.
print('Welcome to GUESS ME! ')
print('I am thinking of a number between 1 to 50')
print("If your guess is more than 10 away from my number, I'll tell you you're COLD")
print("If your guess is within 10 of my number, I'll tell you you're WARM")
print("If your guess is closer than your most recent guess, I'll say you're getting WARMER")
print("LET'S PLAY!")

#list to stores guesses
guesses = [0]

#this loop is to keep the game running until player answers correctly
while True:
    
    #Asking and storing players guess in order to compare it to the num
    guess = int(input('I am thinking of a number from 1 to 50.\n What is your guess?'))
    guesses.append(guess)
    
    #Test if guess is within the limits of the rules of the game
    if guess not in range(1,51):
        print('Out of bounce! Please try again')
        continue
    
    #check if guess againts num in order to see if game should end.
    if guess == num:
        print(f'Congratulations! You guessed in only {len(guesses)} guesses!')
        
        break       
    #else:
        #print(f'{guesses[-1]} is incorrect, try again')
    
    #Gives hints to player as to second is closer or not from answer
    #check if new number is closer than previous
    if guesses[-2]:
        if abs(num-guess) < abs(num-guesses[-2]):
            print('Warmer')
        else:
            print('Colder')
    #check if guess is within range of 10
    else:
        if abs(num-guess) <=10:
            print('Warm')
        else:
            print('Cold')
    
