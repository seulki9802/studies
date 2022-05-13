#!C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe
print("content-type: text/html; charset=utf-8\n")

for i in range(1,11):
    f = open("{0}.txt".format(i), 'w')
    f.write('test {0}'.format(i))
    f.close()

print('''
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Memo Test</title>
</head>

<body>
    <h1>Memo test</h1>
    <h4>This is for testing</h4>
</body>
</html>
''')
