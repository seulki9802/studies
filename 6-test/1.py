from datetime import datetime

now = datetime.now()
f = open("C:\\Bitnami\\wampstack-7.4.12-0\\apache2\\htdocs\\6-test\\1.txt", 'a')
f.write(str(now)+'\n')
f.close()
