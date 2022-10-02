import pandas as pd
import time
from datetime import datetime
import pyautogui
import webbrowser

# meeting_id="ujz-aacv-ind"

def sign_in(meeting_id):

    webbrowser.open(f"https://meet.google.com/{meeting_id}")                #opens the url in a new window in the default browser
    time.sleep(10)                                                               #give it some delay to load fully      

    pyautogui.click(pyautogui.locateCenterOnScreen("./images/join_box.png"))    #will locate the center of the image and then click on it
                                                                                #you can also find the coordinates of the point by printing it.

#now I have to add the time feature as well as to fetch data from a csv file.

df=pd.read_csv("meeting_details.csv")

while True:
    timenow=datetime.now().strftime("%H:%M")
    if timenow in str(df['timings']):
        row=df.loc[df['timings']==timenow]
        print(row)
        meeting_id=str(row.iloc[0,1])
        sign_in(meeting_id)
        time.sleep(30)
        print("Signed In")