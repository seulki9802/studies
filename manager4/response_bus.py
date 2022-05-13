# 한국어 읽기 코드
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')

# 코드 짜기!
from time import sleep
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains

# 회원 정보 불러오기
f = open("members\\members2.txt", 'r')
members = f.read().split(',')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

while 1:
    for member in members:

        # 요청 읽기
        f = open("members\\" + member + "\\request.txt", 'r', encoding="UTF8")
        request = f.read()
        f.close()

        if request == '': # 요청이 없으면
            pass
        else: # 요청이 있으면
            try:

                req = request.split('&')

                # 크롤링 # selenium 사용
                # 크롬 웹 드라이버의 경로를 설정합니다.
                driver = webdriver.Chrome(ChromeDriverManager().install())
                driver.get('https://map.kakao.com/')

                #이상한 풍선 있으면 클릭
                try:
                    driver.find_element_by_class_name('layer_body').click()
                except:
                    pass

                # 내 위치 출발로 설정
                element = driver.find_element_by_id('search.keyword.query')
                element.clear()
                element.send_keys(req[1] + ' ' + req[2])
                driver.find_element_by_id('search.keyword.submit').click()
                sleep(0.1)
                driver.find_element_by_class_name('btn_direction').click()
                sleep(0.1)
                driver.find_elements_by_class_name('origin')[2].click()

                #이상한 풍선 있으면 클릭
                try:
                    driver.find_element_by_class_name('layer_body').click()
                except:
                    pass

                # 정류장 검색
                driver.find_element_by_id('search.tab3').click()
                driver.find_element_by_id('search.busMethodtype.stop').click()
                element = driver.find_element_by_id('info.route.searchBox.stop.name')
                element.clear()
                element.send_keys(req[-1]) # 정류장 이름
                element.submit()
                sleep(0.1)

                # 정류장 선택
                elements = driver.find_elements_by_class_name('para')
                actions = ActionChains(driver)

                # 두 개 나올건데 일단 첫번째걸로 했음 이후 추가 elements[n]
                actions.move_to_element_with_offset(elements[0], 10, 10)
                actions.double_click()
                actions.perform()

                # for element in elements:
                #     if request.split('&')[-1] in element.text:
                #         actions = ActionChains(driver)
                #         actions.move_to_element_with_offset(element, 10, 10)
                #         actions.double_click()
                #         actions.perform()

                try:
                    driver.find_element_by_class_name('layer_body').click()
                except:
                    status = driver.find_elements_by_class_name('BusStopLineItemView')
                    pass

                # 버스 정보 저장(보여주기)
                f = open("members\\" + member + "\\response.txt", 'w', encoding="UTF8")

                for i in status:
                    bus = (i.text.split('\n'))
                    f.write(bus[1] + '&' + bus[2] + '&' + bus[3] + '***')

                #이상한 풍선 있으면 클릭
                try:
                    sleep(1)
                    driver.find_element_by_class_name('layer_body').click()
                    driver.find_element_by_class_name('layer_body').click()
                except:
                    pass


                # 버스 - 사용자 거리, 도보 시간
                driver.find_element_by_class_name('InfoWindowDirection').click()
                driver.find_elements_by_class_name('dest')[5].click()

                #이상한 풍선 있으면 클릭
                try:
                    sleep(0.2)
                    driver.find_element_by_class_name('layer_body').click()
                except:
                    pass

                # 도보 정보 얻기
                driver.find_element_by_class_name('walk').click()
                sleep(0.2)
                walks = driver.find_elements_by_class_name('WalkRouteItem')
                # 도보 정보 저장 '!!!' 로 버스 정보랑 구별
                f.write('!!!')
                for walk in walks:
                    wal = walk.text.split('\n')
                    f.write(wal[0] + '&' + wal[1] + '&' + wal[2] + '&' + wal[3] + '***')

                # for i in distance:
                #     f.write('-------------***')
                #     dist = (i.text.split('\n'))
                #     print(dist)
                #     f.write(dist[0] + '&' + dist[1] + '&' + dist[2] + '***')

                f.write('finishe')
                f.close()

                f = open("members\\" + member + "\\request.txt", 'w', encoding="UTF8")
                f.write('')
                f.close()

                driver.quit()

            except Exception as e:
                print(e)
                driver.quit()
                pass
