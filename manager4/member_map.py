#! C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe
import cgi
import os

# 회원 확인 (로그인 안돼있으면 다시 보내기)
print("content-type: text/html; charset=utf-8\n")
form = cgi.FieldStorage()

try:
    nick = form["nick"].value
except:
    print('''
    <script>
        alert(\"Please enter you id.\");
        location.replace('index.php');
    </script>
    ''')

#회원 리스트
now = os.getcwd()
path = os.path.join(now,'members',nick)

dir = os.listdir(path)

#버튼 생성
button = ''
for file in dir:
    if 'html' in file:
        date = file.split('.')[0]
        button += "<input type='submit' name='show_date' value='" + date + "'/>"

#버튼을 누르면
try:
    show_date = form["show_date"].value
    link = 'https://117.16.24.58/manager4/members/' + nick + '/' +show_date + '.html'
except:
    link = 'https://117.16.24.58/manager4/select.html'

# print(button)?
print('''
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
  <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="top">
    <form method = 'POST' action = 'member_map.py'>
        <input type='hidden' name='nick' value='{nick}'>
        {button}
    </form>
    </div>

    </div>

    <div id="bottom">
    <iframe width="100%" height="100%" src={link}>
    </iframe>
    </div>

</body>
</html>
'''.format(nick = nick, button = button, link = link)
)
