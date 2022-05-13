#!C:\Users\82104\AppData\Local\Programs\Python\Python39\python.exe
# print("Content-type :text/html\n")
print("content-type: text/html; charset=utf-8\n")
import cgi
form = cgi.FieldStorage()
pageId = form["id"].value

print('''
  <h2>Choiced floor : {title}</h2>
  <h3>Are you sure?</h3>
  <a href="eler" >YES</a> / <a href="elevator.py?id=elevator" >NO</a>
'''.format(title=pageId))
