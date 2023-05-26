import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Password123",
    database="creatorsHQ"
)

mycursor = mydb.cursor()

mycursor.execute("DELETE FROM messages")
mycursor.execute("DELETE FROM comments")


mydb.commit()

