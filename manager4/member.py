#! C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe

# 회원가입 목록 가져오기
# List 요소 마다 char 이전 문자 지우기
def remove_front(List,char):
    for i in range(0,len(List)):
        r=0
        for cha in List[i]:
            if cha==char:
                List[i]=List[i][r+1:]
            r=r+1
    return List

f = open("members\\members.txt", 'r')
members = f.readlines()
remove_front(members,'/')

for i in range(0,len(members)):
    members[i] = members[i][0:-1].split('&') # -1은 '\n' 뗄라고

# 회원인지 확인하기
import cgi
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
try:
    pw = form["pw"].value
except:
    print('''
    <script>
        alert(\"Please enter you password.\");
        location.replace('index.php');
    </script>
    ''')

# 보여줄 페이지
page = '''
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
      <link rel="stylesheet" href="style.css">
    </head>
    <body>

        <div id="top">
            <h1> Hi, {nick} <h1>
            <hr>
        </div>

        <div id="bottom", style="text-align:center">
            <form method='POST', action='map.php'>
                <input type=hidden name="nick" value="{nick}">
                <input type=hidden name="pw" value="{pw}">
                <h1>Choose a service<h1>
                <input type="submit" value="Send Location Data" style="font-size:22px;">
            </form>

            <form method="POST" action="member_map.py">
                <input type="submit" value="Check your map" style="font-size:22px;">
                <input type=hidden name="nick" value="{nick}">
            </form>


            <form method='POST' action='request_bus.php'>
                <input type=hidden name="nick" value="{nick}">
                <input type="submit" value="Check Bus" style="font-size:22px;">
            </form>
        </div>

    </body>
'''

def signin():

    for member in members:
        # member[0] = id
        # member[1] = pw
        # member[2] = e-amil
        if nick == member[0]:
            if pw == member[1]:
                return print(page.format(nick = nick, pw = pw))
            else:
                return print('''
                <script>
                    alert(\"Please check your password.\");
                    location.replace('index.php');
                </script>
                ''')

    return print('''
    <script>
        alert(\"Please check your id.\");
        location.replace('index.php');
    </script>
    ''')

signin()
