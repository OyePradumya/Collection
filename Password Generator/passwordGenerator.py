import random

lower = "abcdefghijklmnopqrstuvwxyz"
upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
number = "0123456789"
symbol = "*;/,.-_''+"

all = lower + upper + number + symbol
length = int(input("Enter the length of password u want : "))
password = "".join(random.sample(all,length))
print("Password is "+ password)