#!C:\Users\82104\AppData\Local\Programs\Python\Python39\python.exe
# print("Content-type :text/html\n")
print("content-type: text/html; charset=utf-8\n")
import cgi
form = cgi.FieldStorage()
pageId = form["id"].value

print("""
<!doctype html>
<html>
<head>
  <title>RYU SEULKI</title>
  <meta charset="utf-8">
</head>

<body>
  <h1><a href="index.py?id=RYU" title='RYU SEULKI'>RYU SEULKI</a></h1>
  <ol>
    <li><a href="index.py?id=FACE" >FACE</a></li>
    <li><a href="index.py?id=BODY" >BODY</a></li>
    <li><a href="index.py?id=HOBBY" >HOBBY</a></li>
    <li><a href="https://www.naver.com/" target="_blank" >GO TO NAVER!</a></li>
  </ol>
  <h3>{title}</h3>
  Hi, I'm SEULKI
</body>
</html>
""".format(title=pageId))
