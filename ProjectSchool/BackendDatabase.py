import sqlite3
from flask import Flask , render_template
from flask import request , jsonify

#BACKENDDATABASE

Main = Flask(__name__)


def get_db():
    conn = sqlite3.connect(r"C:\Users\User\Documents\twitch-project\sqlite\sqlite3\BookInventory") #connect the existing database file created earlier
   
    return conn

@Main.route("/")
def interface():
    return render_template("interface.html")

@Main.route("/api/add", methods = ["POST"]) #fxn below are to be decorated methods = ["POST "] // send data 
def add_item():
    Data = request.get_json()
    name = Data["name"]
    student_number = Data["student_number"]
    address_1 = Data["address_1"]
    address_2 = Data["address_2"]
    Book_title = Data["Book_title"]
    author = Data["author"]    
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""INSERT OR IGNORE INTO BookInventory (name ,student_num,address_1,address_2,Book_title,author)
                   VALUES(?,?,?,?,?,?)
                   """, (name, student_number, address_1, address_2, Book_title, author))
    conn.commit()
    conn.close()
    return jsonify({"message": f"{name} added Succesufylly"})

    
@Main.route("/api/get", methods = ["GET"]) # methods = ["GET"] means to get the data from database
def get_items():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute ("SELECT * FROM BookInventory")
    rows = cursor.fetchall()
    conn.close()
    
    items = []
    for row in rows:
        items.append({
            "name": row[0],
            "student_num": row[1],
            "address_1": row[2],
            "address_2": row[3],
            "Book_title": row[4],
            "author": row[5]
        })
        
        
    return jsonify(items)
    
    


#inserting values from the database OR CREATING HEADERR


 #always commit when inserting / updating / deletingv


#cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
#print(cursor.fetchall())  # Should print [('inventoryy',)]


#cursor.execute("SELECT * FROM inventory")
#rows = cursor.fetchall() 
#for row in rows:
 #   print (row)
    
if __name__ == "__main__":
    Main.run(debug=True)
