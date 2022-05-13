#!C:\Users\82104\AppData\Local\Programs\Python\Python39\python.exe
# print("Content-type :text/html\n")

import cv2 # 카메라 열어서 이미지 처리
from flask import Flask, render_template, Response

app = Flask(__name__)
camera = cv2.VideoCapture(0) # video device number (/dev/videoX)
if not camera.isOpened():
  raise RuntimeError('연결된 카메라가 있는지 확인 요함.')

def read_cam():
  while True:
    _, img = camera.read()
    yield (b'--mycam\r\n'
            b'Content-Type: image/jpeg\r\n\r\n'
              + cv2.imencode('.jpg', cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))[1].tobytes()
              + b'\r\n')

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/cam')
def cam():
  return Response(read_cam(), mimetype='multipart/x-mixed-replace; boundary=mycam')

if __name__ == '__main__':
  app.run(host='0.0.0.0')

print('''
<html>
  <head> <title> Web Viewer DEMO </title> </head>
  <body>
    <img src="{{ url_for('cam')}}">
  </body>
</html>
''')
