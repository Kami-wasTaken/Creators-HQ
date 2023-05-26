from flask import Flask, flash, request, redirect, url_for, session
from flask_cors import CORS
import pickle
import re

from nltk.stem import WordNetLemmatizer

import pyrebase
import mysql.connector
from cryptography.fernet import Fernet
import os
from werkzeug.utils import secure_filename
import logging
from PIL import Image, ImageOps
import base64
import io
import pyrebase
import cv2
import tensorflow as tf
import numpy as np



config = {
    'apiKey': "AIzaSyCLavrDxci40mMeExen1k3P4qo-QaHFc1c",
    'authDomain': "images-creators-hq.firebaseapp.com",
    'databaseURL': "https://images-creators-hq-default-rtdb.firebaseio.com",
    'projectId': "images-creators-hq",
    'storageBucket': "images-creators-hq.appspot.com",
    'messagingSenderId': "1052330192017",
    'appId': "1:1052330192017:web:c78cda9c87d87444c96330",
    "serviceAccount": "Back-end Python files\MySQL database\ServiceAccount.json"
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()




logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


UPLOAD_FOLDER = r'C:\Users\anshg\OneDrive\Desktop\Coding\Projects\Creators HQ\Back-end Python files\MySQL database\Uploaded_Images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)

CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



def load_key():
    return open("secret.key", "rb").read()
    
key = load_key()
 
fernet = Fernet(key)



mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Password123",
    database="creatorsHQ"
)

mycursor = mydb.cursor()




addAccount = "INSERT INTO accounts (email, password, username) VALUES (%s, %s, %s)"

config = {
    "apiKey": "AIzaSyCLavrDxci40mMeExen1k3P4qo-QaHFc1c",
    "authDomain": "images-creators-hq.firebaseapp.com",
    "projectId": "images-creators-hq",
    "storageBucket": "images-creators-hq.appspot.com",
    "messagingSenderId": "1052330192017",
    "appId": "1:1052330192017:web:c78cda9c87d87444c96330",
    "serviceAccount": "C:/Users/anshg/OneDrive/Desktop/Coding/Projects/Creators HQ/Back-end Python files/MySQL database/ServiceAccount.json",
    "databaseURL": "https://images-creators-hq-default-rtdb.firebaseio.com/"
 
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

emojis = {':)': 'smile', ':-)': 'smile', ';d': 'wink', ':-E': 'vampire', ':(': 'sad', 
          ':-(': 'sad', ':-<': 'sad', ':P': 'raspberry', ':O': 'surprised',
          ':-@': 'shocked', ':@': 'shocked',':-$': 'confused', ':\\': 'annoyed', 
          ':#': 'mute', ':X': 'mute', ':^)': 'smile', ':-&': 'confused', '$_$': 'greedy',
          '@@': 'eyeroll', ':-!': 'confused', ':-D': 'smile', ':-0': 'yell', 'O.o': 'confused',
          '<(-_-)>': 'robot', 'd[-_-]b': 'dj', ":'-)": 'sadsmile', ';)': 'wink', 
          ';-)': 'wink', 'O:-)': 'angel','O*-)': 'angel','(:-D': 'gossip', '=^.^=': 'cat'}

## Defining set containing all stopwords in english.
stopwordlist = ['a', 'about', 'above', 'after', 'again', 'ain', 'all', 'am', 'an',
             'and','any','are', 'as', 'at', 'be', 'because', 'been', 'before',
             'being', 'below', 'between','both', 'by', 'can', 'd', 'did', 'do',
             'does', 'doing', 'down', 'during', 'each','few', 'for', 'from', 
             'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here',
             'hers', 'herself', 'him', 'himself', 'his', 'how', 'i', 'if', 'in',
             'into','is', 'it', 'its', 'itself', 'just', 'll', 'm', 'ma',
             'me', 'more', 'most','my', 'myself', 'now', 'o', 'of', 'on', 'once',
             'only', 'or', 'other', 'our', 'ours','ourselves', 'out', 'own', 're',
             's', 'same', 'she', "shes", 'should', "shouldve",'so', 'some', 'such',
             't', 'than', 'that', "thatll", 'the', 'their', 'theirs', 'them',
             'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 
             'through', 'to', 'too','under', 'until', 'up', 've', 'very', 'was',
             'we', 'were', 'what', 'when', 'where','which','while', 'who', 'whom',
             'why', 'will', 'with', 'won', 'y', 'you', "youd","youll", "youre",
             "youve", 'your', 'yours', 'yourself', 'yourselves']

def preprocess(textdata):
    processedText = []
    
    # Create Lemmatizer and Stemmer.
    wordLemm = WordNetLemmatizer()
    
    # Defining regex patterns.
    urlPattern        = r"((http://)[^ ]*|(https://)[^ ]*|( www\.)[^ ]*)"
    userPattern       = '@[^\s]+'
    alphaPattern      = "[^a-zA-Z0-9]"
    sequencePattern   = r"(.)\1\1+"
    seqReplacePattern = r"\1\1"
    
    for tweet in textdata:
        tweet = tweet.lower()
        
        # Replace all URls with 'URL'
        tweet = re.sub(urlPattern,' URL',tweet)
        # Replace all emojis.
        for emoji in emojis.keys():
            tweet = tweet.replace(emoji, "EMOJI" + emojis[emoji])        
        # Replace @USERNAME to 'USER'.
        tweet = re.sub(userPattern,' USER', tweet)        
        # Replace all non alphabets.
        tweet = re.sub(alphaPattern, " ", tweet)
        # Replace 3 or more consecutive letters by 2 letter.
        tweet = re.sub(sequencePattern, seqReplacePattern, tweet)

        tweetwords = ''
        for word in tweet.split():
            # Checking if the word is a stopword.
            #if word not in stopwordlist:
            if len(word)>1:
                # Lemmatizing the word.
                word = wordLemm.lemmatize(word)
                tweetwords += (word+' ')
            
        processedText.append(tweetwords)
        
    return processedText


def predict(vectoriser, model, text):
    # Predict the sentiment
    textdata = vectoriser.transform(preprocess(text))
    sentiment = model.predict(textdata)
    
    # Make a list of text with sentiment.
    
    
        
    # Convert the list into a Pandas DataFrame.

    return sentiment[0]


@app.route('/add_account', methods=['POST'])
def add_account():
    account_data = request.get_json()
    encryptedData = []
    regularData = []
    SQLformula = "INSERT INTO accounts (email, password, username) VALUES (%s, %s, %s)"
    for value in account_data.values():
        regularData.append(value)
    encryptedData = [regularData[0], fernet.encrypt(regularData[1].encode()), regularData[2]]
    mycursor.execute("SELECT username FROM accounts")
    result1 = mycursor.fetchall()
    mycursor.execute("SELECT email FROM accounts")
    result2 = mycursor.fetchall()
    
    
    if (encryptedData[0],) in result2:
        return {
        "message": "email exists",
        }
    elif(encryptedData[2],) in result1:
        return {
        "message": "username exists",
        }
    else:
        mycursor.execute(SQLformula, encryptedData)
        mydb.commit()
        
        return {
        "message": "registration successful",
        
        }


@app.route('/login', methods=['POST'])
def login():
    account_data = request.get_json()
    regularData = []
    for value in account_data.values():
        regularData.append(value)
   
    mycursor.execute("Select email, password FROM accounts WHERE email = %s", (regularData[0],))
    result = mycursor.fetchall()
    mycursor.execute("Select username FROM accounts WHERE email = %s", (regularData[0],))
    result2 = mycursor.fetchall()
   
    if len(result) == 0:
        return{
            'message' : 'there was an error'
        }
    elif regularData[1] == (fernet.decrypt(bytes((result[0][1]).encode())).decode()):
       
        for (value,) in result2:
            result2 = value

            
        return{
            'message' : 'password is correct',
            'username' : str(result2),
            }
    else:
       
        return{
            'message' : 'there was an error'
        }

@app.route('/sign_out', methods=['POST'])
#Adds account to database. Checks to see if account already exists -> Sign Up feature
def sign_out():    
    return("sign_out")



@app.route('/set_current_filter', methods=['POST'])
def SetCurrentFilter():
    filter_data = request.get_json()
    return('done')


@app.route('/store_image', methods=['POST'])
def StoreImage():

    img_catogry = ''
    
    image = Image.open(request.files['file'])
    
    folder_length = os.listdir(UPLOAD_FOLDER)
    
    image = image.save(os.path.join(UPLOAD_FOLDER, str(len(folder_length))+'.png')) 
    img_array = cv2.imread(os.path.join(UPLOAD_FOLDER, str(len(folder_length))+'.png'), cv2.IMREAD_GRAYSCALE) #read everything in grayscale
                
    new_array = cv2.resize(img_array, (150,150))


    data = []
    data.append(np.array(new_array))

    pred_input = np.array(data)

    model = tf.keras.models.load_model(r'Back-end Python files\MySQL database\model.h5')

    ypred = model.predict(pred_input)
    print(list(ypred[0]).index(1.0))
    if list(ypred[0]).index(1.0) == 0:
        img_category = "engraving"
    elif list(ypred[0]).index(1.0) == 1:
        img_category = "iconography"
    elif list(ypred[0]).index(1.0) == 2:
        img_category = "painting"
    elif list(ypred[0]).index(1.0) == 3:
        img_category = "sculpture"
   
    picture = UPLOAD_FOLDER+'/'+str(len(folder_length))+'.png'
    mycursor.execute('SELECT date FROM messages order by date DESC LIMIT 1')
    results = mycursor.fetchall()
    print(results)
    global messageDate
    print(picture)
    storage.child(str(len(folder_length))).put(picture)
    imgURL = storage.child(str(len(folder_length))).get_url(None)
    print(imgURL)
    mycursor.execute('UPDATE messages SET img = %s WHERE date = %s', (imgURL, messageDate))
    mycursor.execute('INSERT INTO gallery_images (image, filter) VALUES (%s, %s)', (imgURL, img_category ))
    mydb.commit()
    
    return {
        "response" : "ok"
    }

@app.route('/store_message', methods=['POST'])
def StoreMessage():
    
    
    messageData = request.get_json()
    print(messageData)
    global messageDate
    messageDate = messageData[1]
    SqlFormulaWithoutImg = "INSERT INTO messages (senderid, message, filter, date) VALUES (%s,%s,%s,%s)"
    mycursor.execute(SqlFormulaWithoutImg, (messageData[3], messageData[0], messageData[2], messageData[1]))
    print("inserted except")
    mydb.commit()
        
    return{
        'response' : 'ok'
    }

@app.route('/get_messages_iconography')
def GetMessages1():
    mycursor.execute("Select senderid, message, filter, img, date FROM messages WHERE filter = %s", ("Iconography",))
    result = mycursor.fetchall()
    messages = []
    j = 0
    for i in result:
        if type(i[3]) == bytes:
            x = list(i)
            x[3] = "image "+str(j)
            i = tuple(x)
            j+=1
        
        messages.append(i)
        
    
    return(messages)


@app.route('/get_messages_painting')
def GetMessages2():
    mycursor.execute("Select senderid, message, filter, img, date FROM messages WHERE filter = %s", ("Painting",))
    result = mycursor.fetchall()
    messages = []
    j = 0
    for i in result:
        if type(i[3]) == bytes:
            x = list(i)
            x[3] = "image "+str(j)
            i = tuple(x)
            j+=1
        
        messages.append(i)
        
    
    return(messages)

@app.route('/get_messages_sculpture')
def GetMessages3():
    mycursor.execute("Select senderid, message, filter, img, date FROM messages WHERE filter = %s", ("Sculpture",))
    result = mycursor.fetchall()
    messages = []
    j = 0
    for i in result:
        if type(i[3]) == bytes:
            x = list(i)
            x[3] = "image "+str(j)
            i = tuple(x)
            j+=1
        
        messages.append(i)
        
    
    return(messages)

@app.route('/get_messages_engraving')
def GetMessages4():
    
    mycursor.execute("Select senderid, message, filter, img, date FROM messages WHERE filter = %s", ("Engraving",))
    result = mycursor.fetchall()
    messages = []
    j = 0
    for i in result:
        if type(i[3]) == bytes:
            x = list(i)
            x[3] = "image "+str(j)
            i = tuple(x)
            j+=1
        
        messages.append(i)
        
    
    return(messages)

@app.route('/get_images', methods=['POST'])
def GetImages():  
    return("hello") 

@app.route('/store_comment', methods=['POST'])
def StoreComment():    
    commentData = request.get_json()  
    file = open(r'C:\Users\anshg\OneDrive\Desktop\Coding\Projects\Creators HQ\Back-end Python files\vectoriser-ngram-(1,2).pickle', 'rb')
    vectoriser = pickle.load(file)
    file.close()
    # Load the LR Model.
    file = open(r'C:\Users\anshg\OneDrive\Desktop\Coding\Projects\Creators HQ\Back-end Python files\Sentiment-LR.pickle', 'rb')
    LRmodel = pickle.load(file)
    file.close() 
    sentiment = predict(vectoriser, LRmodel, [commentData[1]])
    
    SqlFormula = "INSERT INTO comments (user, comment, sentiment) VALUES (%s,%s,%s)"
    mycursor.execute(SqlFormula, (commentData[0], commentData[1], int(sentiment)))
    print("inserted except")
    mydb.commit()
        
    return{
        'response' : 'ok'
    } 

@app.route('/get_comments_all')
def GetComments0():  
    comments = []
    mycursor.execute("Select user, comment FROM comments")
    result = mycursor.fetchall() 
    for i in result:
        comments.append(i)
    return(comments)

@app.route('/get_comments_positive')
def GetComments1(): 
    comments = []
    mycursor.execute("Select user, comment FROM comments WHERE sentiment = %s", (1,))
    result = mycursor.fetchall()
    for i in result:
        comments.append(i)
    return(comments)

@app.route('/get_comments_negative')
def GetComments2():   
    comments = []
    mycursor.execute("Select user, comment FROM comments WHERE sentiment = %s", (0,))
    result = mycursor.fetchall() 
    for i in result:
        comments.append(i)
    return(comments)

@app.route('/get_images_iconography')
def GetGalleryImages1():   
    images = []
    mycursor.execute("Select image, filter FROM gallery_images WHERE filter = %s", ("iconography",))
    result = mycursor.fetchall() 
    for i in result:
        images.append(i)
    return(images)

@app.route('/get_images_painting')
def GetGalleryImages2():   
    images = []
    mycursor.execute("Select image, filter FROM gallery_images WHERE filter = %s", ("painting",))
    result = mycursor.fetchall() 
    for i in result:
        images.append(i)
    return(images)

@app.route('/get_images_sculpture')
def GetGalleryImages3():   
    images = []
    mycursor.execute("Select image, filter FROM gallery_images WHERE filter = %s", ("sculpture",))
    result = mycursor.fetchall() 
    for i in result:
        images.append(i)
    return(images)

@app.route('/get_image_engraving')
def GetGalleryImages4():   
    images = []
    mycursor.execute("Select image, filter FROM gallery_images WHERE filter = %s", ("engraving",))
    result = mycursor.fetchall() 
    for i in result:
        images.append(i)
    return(images)


    


    

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True)
