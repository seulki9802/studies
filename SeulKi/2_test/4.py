#!C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe
print("content-type: text/html; charset=utf-8\n")
print('''
<h1> <a href="http://117.16.24.58/">Hello</a></h1>
<h2> <a href="index.html">folder2</a> </h2>
''')

import cgi
form = cgi.FieldStorage()
pageId = form["id"].value
