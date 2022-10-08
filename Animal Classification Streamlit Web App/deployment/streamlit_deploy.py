from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input as mobilenet_v2_preprocess_input
from tensorflow.keras.preprocessing import image
import tensorflow as tf
import streamlit as st
import numpy as np
import cv2

model = tf.keras.models.load_model('model/animal_model.hdf5')
upload_file = st.file_uploader("Choose an image file", type='jpg')

class_dict = {0: 'dog',
              1: 'horse',
              2: 'elephant',
              3: 'butterfly',
              4: 'chicken',
              5: 'cat',
              6: 'cow',
              7: 'sheep',
              8: 'spider',
              9: 'squirrel'}

indo_dict = {0: 'anjing',
             1: 'kuda',
             2: 'gajah',
             3: 'kupu-kupu',
             4: 'ayam',
             5: 'kucing',
             6: 'sapi',
             7: 'kambing',
             8: 'laba-laba',
             9: 'tupai'}


if upload_file is not None:
    # Convert the file to an opencv image
    file_bytes = np.asarray(bytearray(upload_file.read()), dtype=np.uint8)
    opencv_image = cv2.imdecode(file_bytes, 1)
    opencv_image = cv2.cvtColor(opencv_image, cv2.COLOR_BGR2RGB)
    resized = cv2.resize(opencv_image, (224, 224))

    # Display the image
    st.image(opencv_image, channels='RGB')

    resized = mobilenet_v2_preprocess_input(resized)
    img_reshape = resized[np.newaxis, ...]

    generate_prediction = st.button('Predict it!!!')
    if generate_prediction:
        prediction = model.predict(img_reshape).argmax()
        # For Indonesian
        # st.title('Sepertinya gambar ini adalah {}'.format(
        #     indo_dict[prediction]))
        st.title('It seems that the picture is {}'.format(
            class_dict[prediction]))
