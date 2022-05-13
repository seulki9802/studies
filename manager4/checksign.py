#! C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe
import cgi
from datetime import datetime

print("content-type: text/html; charset=utf-8\n")

#값 다 들어온지 확인
form = cgi.FieldStorage()
try:
    nick = form["nick"].value
    pw = form["pw"].value
    mail = form["mail"].value
except:
    print('''
    <script>
        alert(\"Please enter all inforamtion.\");
        location.replace('signup.php');
    </script>
          ''')

# 회원 정보 불러오기
f = open("members\\members2.txt", 'r')
members = f.read().split(',')

# 사용자 폴더 생성 함수
import os
def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError:
        print ('Error: Creating directory. ' +  directory)

# 중복된 아이디 검사
def checkid():
    for member in members:
        # member[0] = id
        if member == nick:
            return print('''
            <script>
                alert(\"The ID that already exists..\");
                location.replace('signup.php');
            </script>
            ''')

    # 다 기입되었거나 중복되지 않으면 여기로 감
    f = open('members\\members.txt', 'a')
    f.write(str(datetime.now())+'/'+nick+'&'+pw+'&'+mail+'\n')
    f.close()

    f = open('members\\members2.txt', 'a')
    f.write(',' + nick)
    f.close()

    createFolder('members/'+nick)

    f = open('members\\' + nick + '\\request.txt', 'a')
    f.close()

    return print('''
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="top">
            <h1> Wellcome! </h1>
            <hr>
        </div>
        <div id="bottom" style="text-align:center;">
            <br><br>
            You have successfully created your account!<br><br>
            id: {nick}<br>
            pw: {pw}<br>
            mail: {mail}<br>
            <br><br>
            <a href="https://117.16.24.58/manager4/"> sign in </a>
        </div>
    </body>
    </html>
    '''.format(nick=nick, pw=pw[0:3]+'***', mail=mail))

checkid()
