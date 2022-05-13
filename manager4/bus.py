# #! C:\Users\chosun\AppData\Local\Programs\Python\Python37-32\python.exe
# import cgi
#
# print("content-type: text/html; charset=utf-8\n")
# form = cgi.FieldStorage()
#
# # 회원인지 확인하기, 로그인상태x -> 돌려보내기
# try:
#     nick = form["nick"].value
# except:
#     print('''
#     <script>
#         alert(\"Please enter you id.\");
#         location.replace('index.php');
#     </script>
#     ''')

# 한국어 읽기 코드
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')
# 크롤링
from time import sleep

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

from bs4 import BeautifulSoup

# 크롬 웹 드라이버의 경로를 설정합니다.
driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get('https://map.kakao.com/')

# selenium 으로 검색
driver.find_element_by_class_name('layer_body').click()

driver.find_element_by_id('search.tab3').click()
driver.find_element_by_id('search.busMethodtype.stop').click()
element = driver.find_element_by_id('info.route.searchBox.stop.name').clear()
element = driver.find_element_by_id('info.route.searchBox.stop.name')
element.send_keys('염주맨션')
element.submit()
# BeautifulSoup로 parsing
sleep(1)
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

bus_stops = soup.findAll('div', 'tit_name clickArea')
for bus_stop in bus_stops:
    print(bus_stop.text)

print("??")
