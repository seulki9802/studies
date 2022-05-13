#!C:\Users\82104\AppData\Local\Programs\Python\Python39\python.exe
# print("Content-type :text/html\n")
print("content-type: text/html; charset=utf-8\n")
import cgi
form = cgi.FieldStorage()
pageId = form["id"].value
a="<ul>"
for i in range(1,10) :
    a=a+'''<li><a href="floor.py?id='''+str(i)+'''" >'''+str(i)+"</a></li>"
a=a+"</ul>"

print("""
<!doctype html>
<html>
<head>
  <title>Elevator</title>
  <meta charset="utf-8">
</head>

<body>
  <h1><a href="elevator.py?id=elevator" title='Elevator'>Elevator</a></h1>
  <h2>A-building a1 elevator</h2>
  {url}

</body>
</html>
""".format(url=a,title=pageId))
