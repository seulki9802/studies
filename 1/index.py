#!C:\Users\82104\AppData\Local\Programs\Python\Python39\python.exe
print("content-type: text/html; charset=utf-8\n")

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
            position: relative;
            width: 25.0%;
            height: 100.0%;
            float: left;
            font-size: 20px;
            left: 15px;
        }
        #rightcatpion{
            position: absolute;
            bottom: 0px;
            right: 5px;
            font-size: 20px
        }
    </style>
</head>

<body>
    <div>

        <div id="left">
            <h1> Author info sample</h1>
            <p> Hello, Wellcome! </p>
            <p> This is a webpage for testing </p>
            <ul>
                <br>
                <li> <a href="TestButton_1.py?id=TEST 1"> TEST BUTTON 1 </a></li>
                <li> <a href="TestButton_2.html"> TEST BUTTON 2 </a></li>
            </ul>
        </div>

        <div id="right">
            <img src="z_picture.jpg" width=120%>

            <div id="rightcatpion">
                <p> <b style="color:red";>Red point</b> = place of author's birth </p>
                <p> <b>Black point</b>= place of authr's death</p>
            </div>
        </div>

    </div>
</body>
</html>
''')
