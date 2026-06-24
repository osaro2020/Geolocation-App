from guizero import App, PushButton, Text
from picamera2 import Picamera2, Preview
import sys, time, cv2
import firebase_admin
from firebase_admin import db, credentials

UID = "rYjyaHG6AycRntjn86bVFHvbMtw2"

def exitApp():
    sys.exit()
   
def update_db(is_road_work):
    cred = credentials.Certificate("fbase_credentials.json")
    firebase_admin.initialize_app(cred, {"databaseURL": "https://project-harvest-bikergeoloc-default-rtdb.firebaseio.com"})
    ref = db.reference("/users/" + UID).get()
    print(ref)
   
    if(is_road_work):
        db.reference("/users/" + UID + "/roadSign").update({"name": "road_work_ahead"})
    else:
        db.reference("/users/" + UID + "/roadSign").update({"name": "empty_string"})
       
    print(db.reference("/users/" + UID).get())
   
def get_camera_image():
    picam2 = Picamera2()
    camera_config = picam2.create_still_configuration(main={"size": (1920, 1080)}, lores={"size": (640, 480)}, display="lores")
    picam2.configure(camera_config)
    picam2.start()
    time.sleep(3)
    picam2.capture_file("test_image.jpg")
   
def detect_object():
    img = cv2.imread("test_image.jpg")
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
   
    cascade_classifier = cv2.CascadeClassifier('stop_sign_classifier_2.xml')
    detect_signs = cascade_classifier.detectMultiScale(gray_img, minSize=(50, 50))
   
    print(f'Found {len(detect_signs)} sign(s)')
   
    if len(detect_signs) >= 1:
        notification.value = "road sign detected"
        return True
    else:
        notification.value = "searching..."
        return False

#This method is used for testing
def detect_object_2():
   
    img = cv2.imread("test_image_w_stop_sign.jpg")
    gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
   
    cascade_classifier = cv2.CascadeClassifier('stop_sign_classifier_2.xml')
    detect_signs = cascade_classifier.detectMultiScale(gray_img, minSize=(50, 50))
   
    if len(detect_signs) > 0:
        for(x, y, width, height) in detect_signs:
            cv2.rectangle(img, (x,y), (x + width, y + height), (0, 255, 0), 2)
    else:
        print('No road signs detected')
           
    cv2.imshow('Signs detected', img)
    cv2.waitKey(0)

   
def main():
    #Uncomment line to get camera working
    #get_camera_image()
    is_road_work = detect_object()
    print(is_road_work)
    update_db(is_road_work)
   
    #Delete line
    #detect_object_2()
   

app = App('GeoPing Camera', bg = "white", height = 400, width = 600)

firstButton = PushButton(app, main, text = "START", align = "top", width = 15, height = 3)
secondButton = PushButton(app, exitApp, text = "END", align = "top", width = 15, height = 3)
notification = Text(app, main, align = "bottom", width = "fill", height = "fill", size = 15)

firstButton.bg = "black"
firstButton.text_color = "white"

notification.text_color = "black"
notification.value = "searching..."

app.display()
