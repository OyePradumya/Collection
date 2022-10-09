# import required modules
import pyqrcode

# take user's input
print("Enter string to be converted to a QR Code :")
strr = input()

# convert input text to qr
pix = pyqrcode.create(strr)

# Ask user for the name for the file
print("Enter name for file :")
naym = input()

# create and save the file
naym = naym + ".svg"
pix.svg(naym, scale=12)

print("Generated QRCode successfully.")
