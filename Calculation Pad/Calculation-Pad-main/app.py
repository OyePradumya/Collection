# Required Imports
from tkinter import *
from tkinter import messagebox as msgbx
from PIL import ImageGrab
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import time
import urllib
import tensorflow as tf
from keras.models import model_from_json
import numpy as np
import cv2
import wolframalpha

# Helper Vars and Functions
HELPER_DICT = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '-',
    '11': '+',
    '12': '*',
    '13': '/',
    '14': '-',
    '15': '(',
    '16': ')',
    '17': 'sin',
    '18': 'tan',
    '19': 'log',
    '20': '√'
}

# Load the pre-trained model
with open("./Model/model.json", "r") as mdl:
        model = mdl.read()
    
loaded_model = model_from_json(model)
loaded_model.load_weights("./Model/weights.h5")

def is_connected():
    ''' Checks whether an active internet connection
    is present or not '''
    try:
        url = "https://google.com"
        urllib.request.urlopen(url)
        return True
    except Exception:
        return False

def evaluate_expression(expression):
    ''' Evaluates an expression using WolframAlpha '''
    client = wolframalpha.Client(wolfram_id.get())
    res = client.query(expression)
    res = next(res.results).text
    # Get the result upto 3 decimal places in case of floating point answers
    # Example -> 2.1972245773362193827904904738450514092949811156454989034693886672...
    dot_idx = res.find(".")
    if dot_idx != -1:
        ans = res[:dot_idx] + res[dot_idx:dot_idx+4]
        return ans
    # Example -> 4/3 (irreducible)
    ans = res[:res.index("(")] if "irreducible" in res else res 
    return str(round(eval(ans), 3))

def fetch_img_data(img):
    '''Extract the symbol/digit from the
    test image using the maximum bounding rectangle'''
    img_data = []

    img = ~img
    _, thresh = cv2.threshold(img, 127, 255, cv2.THRESH_BINARY) # Set bits > 127 to 1 and <= 127 to 0
    ctrs, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    cnts = sorted(ctrs, key=lambda ctr: cv2.boundingRect(ctr)[0]) # Sort by x

    bounding_rects = []
    for c in cnts:
        x, y, w, h = cv2.boundingRect(c)
        rect = [x, y, w, h]
        bounding_rects.append(rect)

    overlap_rects = []
    for r in bounding_rects:
        overlapping = []
        for rec in bounding_rects:
            is_overlapping = False
            if rec != r:
                if (r[0] < (rec[0] + rec[2] + 10) and rec[0] < (r[0] + r[2] + 10) 
                    and r[1] < (rec[1] + rec[3] + 10) and rec[1] < (r[1] + r[3] + 10)):
                    is_overlapping = True
                overlapping.append(is_overlapping)
            else:
                overlapping.append(is_overlapping)

        overlap_rects.append(overlapping)

    discard_rects = []
    for i in range(len(cnts)):
        for j in range(len(cnts)):
            if overlap_rects[i][j]:
                area1 = bounding_rects[i][2] * bounding_rects[i][3]
                area2 = bounding_rects[j][2] * bounding_rects[j][3]
                if(area1 == min(area1,area2)):
                    discard_rects.append(bounding_rects[i])

    final_rects = [rect for rect in bounding_rects if rect not in discard_rects]
    for r in final_rects:
        x, y = r[0], r[1]
        w, h = r[2], r[3]

        cropped = thresh[y:y+h+10, x:x+w+10] # Get the digit/symbol
        resized = cv2.resize(cropped, (28, 28)) # Resize to (28, 28)
        resized = np.reshape(resized, (1, 28, 28)) # Flatten the pixel matrix of digit/symbol
        img_data.append(resized)

    return img_data

def display_predictions():
    '''Displat the predicted digit/symbol
    of the test image on the canvas'''

    # Get the snap of the canvas contents
    x0 = canvas.winfo_rootx()
    y0 = canvas.winfo_rooty()
    x1 = x0 + canvas.winfo_width()
    y1 = y0 + canvas.winfo_height()

    snap = ImageGrab.grab((x0, y0, x1, y1))
    snap.save("./Model/test.png")
    img = cv2.cvtColor(np.array(snap), cv2.COLOR_RGB2GRAY) # Convert PIL Image to OpenCV
    # Start prediction
    if img is not None:
        img_data = fetch_img_data(img)

        expression = ""
        for i in range(len(img_data)):
            img_data[i] = np.array(img_data[i])
            img_data[i] = img_data[i].reshape(-1, 28, 28, 1)

            res = np.argmax(loaded_model.predict(img_data[i]), axis=-1)
            expression += HELPER_DICT[str(res[0])]

        expression_var.set(expression)

        if is_connected():
            try:
                id_entry.config(fg="#7ad927")
                ans = evaluate_expression(expression)
                result.set(ans)
            except:
                id_entry.config(fg="red")  
                result.set("Error!")
                msgbx.showerror("Exception Encountered!", 
                                "Either could not predict the given expression correctly"
                                + " or the App ID entered is invalid!")
        else:
            msgbx.showwarning("Calculation Pad", 
                            "Your system isn't connected to the internet. "
                            + "You can only evaluate some basic expressions. "
                            + "Try connecting to the internet for the best results.")
            time.sleep(1)
            try:
                result.set(round(eval(expression), 3))
            except:
                result.set("Error!")
                msgbx.showerror("Exception Encountered!", "Failed to evaluate expression.")

x_coord = y_coord = 0
erase = False
    
def get_coordinates(event):
    ''' Get the coordinates of the 
    current cursor position '''
    global x_coord, y_coord
    x_coord, y_coord = event.x, event.y

def draw(event):
    ''' Draws or erases expressions 
    written on the canvas '''
    global x_coord, y_coord
    brush_size = 2
    brush_color = "black"
    if erase:
        brush_color = "white"
        brush_size = 15
    canvas.create_line(x_coord, y_coord, event.x, event.y, 
                      fill=brush_color, width=brush_size)
    x_coord, y_coord = event.x, event.y

def activate_eraser():
    ''' Activates eraser functionality '''
    global erase
    erase = True

def deactivate_eraser():
    ''' Deactivates eraser functionality '''
    global erase
    erase = False

def clear_canvas():
    ''' Clears the canvas '''
    canvas.delete("all")
    expression_var.set("Expression")
    result.set("Result")

def clear_entry(event):
    ''' Clear the contents of entry widget '''
    id_entry.delete(0, "end")
    id_entry.config(show="*")
    id_entry.config(fg="yellow")
    
def show_placeholder(event):
    ''' Display the placeholder on entry widget '''
    if not wolfram_id.get():
        id_entry.config(show="")
        id_entry.delete(0, "end")
        id_entry.insert(0, "Enter Wolfram ID")

# Main GUI
root = Tk()
root.title("Calculation Pad")
root.geometry("980x700")
root.config(background="#17e339")
root.resizable(False, False)

title_icon = PhotoImage(file="./assets/icons/title.png")
root.iconphoto(True, title_icon)

# Expression Canvas
canvas = Canvas(root, width=800, height=600, bg="white", 
                bd=5, relief=SUNKEN, cursor="circle")
canvas.place(relx=0.0065, rely=0.008)

canvas.bind("<Button-1>", func=get_coordinates) # Draw line from the current cursor position
canvas.bind("<B1-Motion>", func=draw) # Draw line as long as the cursor is in motion

# Buttons
eval_icon = PhotoImage(file="./assets/icons/eval.png")
evaluate_btn = Button(root, text="Eval", font="copperplate 20", 
                cursor="hand2", image=eval_icon, compound=TOP, 
                command=display_predictions)
evaluate_btn.config(highlightbackground="#5bab70", highlightthickness=3, relief=SUNKEN)
evaluate_btn.place(relx=0.88, rely=0.045)

draw_icon = PhotoImage(file="./assets/icons/pencil.png")
draw_btn = Button(root, text="Note", font="copperplate 20", 
                   image=draw_icon, compound=TOP, cursor="hand2",
                   command=deactivate_eraser)
draw_btn.config(highlightbackground="pink", highlightthickness=3, relief=SUNKEN)
draw_btn.place(relx=0.88, rely=0.27)

eraser_icon = PhotoImage(file="./assets/icons/clear.png")
erase_btn = Button(root, text="Erase", font="copperplate 20", 
                   image=eraser_icon, compound=TOP, cursor="hand2",
                   command=activate_eraser)
erase_btn.config(highlightbackground="#436ec4", highlightthickness=3, relief=SUNKEN)
erase_btn.place(relx=0.88, rely=0.49)


clear_all_icon = PhotoImage(file="./assets/icons/new_canvas.png")
clear_all_btn = Button(root, text="Clear", font="copperplate 20", 
                   image=clear_all_icon, compound=TOP, cursor="hand2",
                   command=clear_canvas)
clear_all_btn.config(highlightbackground="#d1b345", highlightthickness=3, relief=SUNKEN)
clear_all_btn.place(relx=0.88, rely=0.7)

# Output Widget
expression_var = StringVar()
result = StringVar()
wolfram_id = StringVar()
expression_var.set("Expression")
result.set("Result")

exp_label = Label(root, textvariable=expression_var, font="copperplate 24", 
                 relief=SUNKEN, bd=3, background="black", fg="white", width=25)
exp_label.place(relx=0.02, rely=0.92)

output = Label(root, textvariable=result, font="copperplate 24", width=10,
                    relief=SUNKEN, bd=3, background="black", fg="white")
output.place(relx=0.45, rely=0.92)

id_entry = Entry(root, textvariable=wolfram_id, bg="black", fg="yellow", bd=3,
                relief=SUNKEN, width=20, font="copperplate 24", justify=CENTER)
id_entry.config(highlightthickness=0, insertbackground="white")
id_entry.place(relx=0.65, rely=0.92)
id_entry.insert(0, "Enter Wolfram ID")
id_entry.bind("<Button-1>", clear_entry)
id_entry.bind("<Leave>", show_placeholder)

root.mainloop()