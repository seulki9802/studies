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

# f = open('text2.txt', 'r', encoding = 'UTF8')
# test = f.readlines()
# for i in test:
#     print(i)
#     print('<br>')
