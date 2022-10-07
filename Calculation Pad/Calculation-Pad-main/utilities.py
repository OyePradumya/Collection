# Required Imports
import tensorflow as tf
from keras.models import model_from_json
import numpy as np
import cv2
import wolframalpha
import urllib

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
API_KEY = "YOUR-API-ID-HERE"

# Load the pre-trained model
with open("../Model/model.json", "r") as mdl:
        model = mdl.read()
    
loaded_model = model_from_json(model)
loaded_model.load_weights("../Model/weights.h5")

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
    try:
        client = wolframalpha.Client(API_KEY)
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
    except Exception as e:
        print(e)
        return None

def fetch_img_data(img):
    '''Extract the symbol/digit from the
    test image using the maximum bounding rectangle'''
    img_data = []

    # The image from web canvas is 4 channels and int64 so we need to convert it
    img = cv2.cvtColor(img[:, :, :3].astype(np.uint8), cv2.COLOR_RGB2GRAY)
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

def display_predictions(img, api_key=""):
    '''Display the predicted digit/symbol
       of the test image on the canvas'''
    if img is not None:
        img_data = fetch_img_data(img)

        expression = ""
        for i in range(len(img_data)):
            img_data[i] = np.array(img_data[i])
            img_data[i] = img_data[i].reshape(-1, 28, 28, 1)

            res = np.argmax(loaded_model.predict(img_data[i]), axis=-1)
            expression += HELPER_DICT[str(res[0])]

        print("Expression", expression)
        try:
            ans = evaluate_expression(expression)
            if ans:
                return (expression, ans)
            return None
        except Exception as e:
            print(e)
            return None
    
    return None
