#! C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe

import sys
import io
import cgi
from time import sleep

# 한국어 읽기 코드
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

# 웹 페이지 제작
print("content-type: text/html; charset=utf-8\n")

# 사용자 입력 값 가져오기
form = cgi.FieldStorage()

nick = form["nick"].value
latitude = form["latitude"].value
longitude = form["longitude"].value
accuracy = form["accuracy"].value
try:
    bus_stop = form["bus_stop"].value
except:
    # 버스 입력 안했으면 돌려 보내기
    print('''
    <script>
        alert(\"Please enter bus stop.\");
        window.history.back();
    </script>
    <body>
        <form method='POST', action='request_bust.php'>
            <input type='hidden' name='nick' value={nick}>
        </form>
    </body>
    '''.format(nick = nick))


# 사용자 입력 값 메모장에 기록하기
f = open("members\\" + nick + "\\request.txt", 'w', encoding="UTF8")
f.write(nick + '&' + latitude + '&' + longitude + '&' + bus_stop)
f.close()

# 기본 값 모바일 버전, 표 스타일
print('''
 <!DOCTYPE html>
    <html>
    <head>
    <title>Information of authors</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="style.css">
    <style>
      table {
        width: 100%;
        border: 3px solid #444444;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid #444444;
        padding: 10px;
      }
      th{
        background-color: #bbc4fb;
        border-bottom: 3px solid #444444;
        padding: 10px;
      }
      th:nth-child(1){
        background-color: #838ed6;
        border-right: 3px solid #444444;
      }
      td:nth-child(1), td:nth-child(4), th:nth-child(4){
        border-right: 3px solid #444444;
      }
    </style>
    </head>
''')

while 1: # finishe 나올 때 까지 해
    # response 값 확인하기
    f = open("members\\" + nick + "\\response.txt", 'r', encoding="UTF8")
    infos = f.read().split('!!!')
    f.close()
    try:
        info1 = infos[0].split('***') # 버스 정보
        info2 = infos[1].split('***') # 도보 정보
        if info2[-1] == 'finishe':
            # 이거 실행하고 끝낼꺼야
            walking_time = info2[1].split('&')[1]

            if '분' in walking_time:
                walking_time = int(walking_time.replace('분',''))

            print('''
            <body>
            <h2> 예상 도보 시간 : {walking_time} 분 </h2>
            <table>
                <th> 버스 </th>
                <th> 도착시간 </th>
                <th> 가능성 </th>
            '''.format(walking_time = walking_time))

            for info in info1[0:-1]:

                arrival_time = info.split('&')[0]
                arrival_time = arrival_time.split(' ')[0]

                if '분' in arrival_time:
                    print(arrival_time)
                    arrival_time = int(arrival_time.replace('분',''))
                    possibility = arrival_time - walking_time
                    print(type(possibility))
                    if possibility > 1 : possibility = '충분합니다.'
                    if possibility == 1 : possibility = '조금 서두르세요'
                    if possibility == 0 : possibility = '많이 서두르세요'
                    if possibility == -1 : possibility = '빠르게 걸으세요'
                    if possibility == -2 : possibility = '조금 뛰어 가세요'
                    if possibility == -3 : possibility = '많이 뛰어 가세요'
                    if possibility == -4 : possibility = '뛰어도 힘들 것 같습니다'
                    if possibility < -5 : possibility = '가망이 없습니다'

                else:
                    possibility = '나도몰라 뭔데이게'

                bus = info.split('&')[1]

                direction = info.split('&')[2]

                print('''
                <tr>
                <td> {bus} </td>
                <td> {arrival_time} 분 </td>
                <td> {possibility} </td>
                </tr>
                '''.format(bus = bus, arrival_time = arrival_time, possibility = possibility))

            f = open("members\\" + nick + "\\response.txt", 'w', encoding="UTF8")
            f.write('')
            f.close()
            break
    except:
        pass
# 정보 덜 가져왔으면 infos[1]가 없을거임
 # 넘겨넘겨


#
# =========================================================
# while 1:
#     f = open("members\\" + nick + "\\response.txt", 'r', encoding="UTF8")
#     infos = f.read().split('!!!')
#     f.close()
#     try:
#         info1 = infos[0].split('***') # 버스 정보
#         info2 = infos[1].split('***') # 도보 정보
#         infos = info1 + info2
#     except:
#         pass
#
#     if infos[-1] == 'finishe':
#         for info in infos:
#             print(info)
#             print('<br>')
#
#         f = open("members\\" + nick + "\\response.txt", 'w', encoding="UTF8")
#         f.write('')
#         f.close()
#         break
# )
