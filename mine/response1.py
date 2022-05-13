#! C:\Users\82104\AppData\Local\Programs\Python\Python39\python.exe
from time import sleep
import cgi

import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

print('content-type: text/html; charset=utf-8\n')
form = cgi.FieldStorage()

id = form['id'].value
pw = form['pw'].value

f = open('text.txt', 'w')
f.write(id + '&' + pw)
f.close()

# 응답 값 가져오기
# f = open('text2.txt', 'r', encoding = 'UTF8')
# lectures = f.readlines()
# f.close()
#
# while 1:
#     if lectures:
#         # 뭔가 써져있어
#         if lectures[-1] == 'finishe':
#             # 다 썼대
#             for lecture in lectures[0:-1]:
#                 # 보여주자
#                 print(lecture)
#                 print('<br>')
#             # 다 보여줬으니 지우고 그만하자
#             f = open('text2.txt', 'w', encoding = 'UTF8')
#             f.close()
#             break
#         else:
#             # 다 쓸 때까지 대기해
#             pass
#     else:
#         # 써져있을꺼야 쓸 때까지 대기해
#         pass
