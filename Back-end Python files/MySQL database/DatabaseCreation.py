import tensorflow as tf
import cv2
import numpy as np
from PIL import Image
import os


img_array = cv2.imread(r'Back-end Python files\MySQL database\Uploaded_Images\0001.jpg', cv2.IMREAD_GRAYSCALE) #read everything in grayscale
                
new_array = cv2.resize(img_array, (150,150))


data = []
data.append(np.array(new_array))

pred_input = np.array(data)

model = tf.keras.models.load_model(r'Back-end Python files\MySQL database\model.h5')

ypred = model.predict(pred_input)
print(list(ypred[0]).index(1.0))


