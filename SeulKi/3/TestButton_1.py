#!C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe
print("content-type: text/html; charset=utf-8\n")

import cgi
try:
    form = cgi.FieldStorage()
    pageId = form["id"].value
except:pass

print('''
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Author info sample</title>
    <style>
        #right{
          position: relative;
          width: 75.0%;
          height: 100.0%;
          float: right;
          text-align: center;
        }
        #left{
          background-color:'red'
          position: relative;
          width: 25.0%;
          height: 100.0%;
          float: left;
          font-size: 20px;
        }
    </style>
</head>

<body>
    <div>

        <div id="left">
          <h1><a href="index.py"> Author info sample <a></h1>
          <p> TEST BUTTON1 </p>
          <ul>
            <br>
            <li> BUTTON1_1 </li>
            <li> BUTTON1_2 </li>
            <li> BUTTON1_3 </li>
            <li> BUTTON1_4 </li>
            <li> BUTTON1_5 </li>
            <li> BUTTON1_6 </li>
            <li> BUTTON1_7 </li>
          </ul>
        </div>

        <div id="right">
          <img src="z_picture.jpg" width=120%>
        </div>

    </div>
</body>
</html>
''')
