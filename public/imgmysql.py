import mysql.connector
import os
def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData


def updateBLOB(photo):
    print("Inserting BLOB into python_employee table")
    try:
        connection = mysql.connector.connect(host='us-cdbr-east-05.cleardb.net',
                                             database='heroku_2bd1108a1123322',
                                             user='bc19e72cf8e1df',
                                             password='d486a3c4')

        cursor = connection.cursor()
        sql_insert_blob_query = """ update img_table set img1 = %s where café_name = %s """

        empPicture = convertToBinaryData(photo)
        cafe_name = photo.replace("(1).png","").strip()
        # Convert data into tuple format
        insert_blob_tuple = (empPicture,cafe_name)
        result = cursor.execute(sql_insert_blob_query, insert_blob_tuple)
        connection.commit()
        print("Image and file inserted successfully as a BLOB into python_employee table", result)

    except mysql.connector.Error as error:
        print("Failed inserting BLOB data into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")
path = "./img"
for fname in os.listdir(path):
    if(fname.endswith('(1).png')):
       updateBLOB(fname)
    