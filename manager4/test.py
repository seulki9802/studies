#! C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe
print("content-type: text/html; charset=utf-8\n")


# # 회원 정보 불러오기
# f = open("members\\members2.txt", 'r')
# members = f.read().split(',')
#
# print(members

# import subprocess
# try:
#     subprocess.call("TASKKILL /f  /IM  CHROMEDRIVER.EXE")
# except:
#     pass


# f = open("members\\" + 'happy' + "\\response.txt", 'r', encoding="UTF8")
# infos = f.read().split('***')
# f.close()
# while 1:
#     if infos[-1] == 'finishe':
#         for i in infos:
#             print(i)
# 한국어 읽기 코드

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')


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

nick = 'happy'
f = open("members\\" + nick + "\\response.txt", 'r', encoding="UTF8")
infos = f.read().split('!!!')
f.close()

info1 = infos[0].split('***') # 버스 정보
info2 = infos[1].split('***') # 도보 정보

walking_time = info2[1].split('&')[1]

if '분' in walking_time:
    walking_time = int(walking_time.replace('분',''))


head = '''
<body>
<h2> 예상 도보 시간 : {walking_time} 분 </h2>
<table>
    <th> 버스 </th>
    <th> 도착시간 </th>
    <th> 가능성 </th>
'''
print(head.format(walking_time = walking_time))
for info in info1:

    arrival_time = info.split('&')[0]
    arrival_time = arrival_time.split(' ')[0]

    if '분' in arrival_time:
        arrival_time = int(arrival_time.replace('분',''))
        possibility = arrival_time - walking_time

        if possibility > 1 : possibility = '충분합니다.'
        if possibility == 1 : possibility = '조금 서두르세요'
        if possibility == 0 : possibility = '많이 서두르세요'
        if possibility == -1 : possibility = '빠르게 걸으세요'
        if possibility == -2 : possibility = '조금 뛰어 가세요'
        if possibility == -3 : possibility = '많이 뛰어 가세요'
        if possibility == -4 : possibility = '뛰어도 힘들 것 같습니다'
        if possibility < -5 : possibility = '가망이 없습니다'

    else:
        possibility = '나도몰라 이게뭔디'

    bus = info.split('&')[1]

    direction = info.split('&')[2]

    print('''
    <tr>
    <td> {bus} </td>
    <td> {arrival_time} 분 </td>
    <td> {possibility} </td>
    </tr>
    '''.format(bus = bus, arrival_time = arrival_time, possibility = possibility))
# print(int(info2[1].split('&')[1][0:2]))
# infos = info1 + info2
# if infos[-1] == 'finishe':
#     for info in infos:
#         print(info)
#         print('<br>')
# for i in info2:
#     print(i)
#     print('<br>')

# print(sample)
