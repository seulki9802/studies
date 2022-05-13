#!C:\Users\82104\AppData\Local\Programs\Python\Python39\python.exe
print("content-type: text/html; charset=utf-8\n")

print("""
    <!DOCTYPE html>
    <html>
    <head>
    <title>Information of authors</title>
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
    <body>
""")

print('<div style="text-align:center;">')
print('<table>')
for i in range(1,10):
    print('<th>Multi {0}</th>'.format(i))


m = 0
for k in range(1,10):
    print('<tr name={0}>'.format(m))
    n = 0
    for t in range(1,10):
        print('<td name={0}> {1} </td>'.format(n, k*t))
        n += 1
    m += 1
    print("</tr>")

print('</table>')
print('</div>')

print('''
    </body>
    </html>
''')
