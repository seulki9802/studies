import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

# import subprocess
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from time import sleep

from datetime import datetime
print('start')
while 1:
    #요청 파일
    memberFile = open('text.txt', 'r')
    member = memberFile.read().split('&')
    memberFile.close()

    # 요청이 있으면
    if member != ['']:
        id = member[0]
        pw = member[1]

        # 크롤링 시작
        driver = webdriver.Chrome(ChromeDriverManager().install())
        driver.get('http://clc.chosun.ac.kr/ilos/main/member/login_form.acl')

        driver.find_element_by_id('usr_id').send_keys(id)
        driver.find_element_by_id('usr_pwd').send_keys(pw)
        driver.find_element_by_class_name('btntype').submit()

        lectures = driver.find_elements_by_class_name('sub_open')

        # 강의 조사 시작
        for n in range(0, len(lectures)):

            temporary = driver.find_elements_by_class_name('sub_open')
            text1 = temporary[n].text # 과목명
            temporary[n].click()

            activity = driver.find_element_by_class_name('submain-right')
            text2 = activity.text # 기간

            driver.back()

            text3 = '--------------------------------' # 구분선

            lectureFile = open('text2.txt', 'a', encoding = 'UTF8')
            lectureFile.write(text1 + '\n' + text2 + '\n' + text3 + '\n')

        # 강의 조사 후 크롤링 종료
        
        # 강의 조사 마침 알림
        lectureFile.write('finishe')
        lectureFile.close()

        # 강의 조사 후 요청 제거
        memberFile = open('text.txt', 'w')
        memberFile.close()

    else:
        memberFile.close()
