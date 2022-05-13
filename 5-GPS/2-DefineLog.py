# log 불러오기
f = open('C:\\Bitnami\\wampstack-7.4.12-0\\apache2\\logs\\access.log', 'r')

lines = []
while True:
    line = f.readline()
    if not line: break
    lines += [line]
f.close()

# latitude 있는 거 골라내기
infos = []
for line in lines:
    if line.find('latitude') != -1:
        infos += [line]

# List 요소 마다 char 이전 문자 지우기
def remove_front(List,char):
    for i in range(0,len(List)):
        r=0
        for cha in List[i]:
            if cha==char:
                List[i]=List[i][r+1:]
            r=r+1
    return List

# List 요소 마다 char 이후 문자 지우기
def remove_back(List,char):
    for i in range(0,len(List)):
        r=0
        for cha in List[i]:
            if cha==char:
                List[i]=List[i][:r]
            r=r+1
    return List

# List 요소 마다 char1부터 char2사b이의 내용 지우기
def remove_middle(List,char1,char2,repeat):
    for r in range(0,repeat):
        for i in range(0,len(List)):
            a=b=aa=bb=0 #숫자세기용
            for cha in List[i]:
                if cha==char1:
                    aa=a
                a=a+1
                if cha==char2:
                    bb=b
                    break
                b=b+1
            if aa==0:
                pass
            else:
                if bb==0:
                    List[i]=List[i][:aa]
                else:
                    List[i]=List[i][:aa]+List[i][bb+1:]
    return List

# 데이타 정리
remove_front(infos,'[')
remove_middle(infos,']','l',1)
remove_back(infos,'H')

for n in range(0,len(infos)):
    if infos[n].find('latitude') != -1:
        infos[n] = infos[n].strip().split('?')
        infos[n][1] = infos[n][1].split('&')
        remove_front(infos[n][1], '=')

# infos[n][0]= 시간, infos[n][1]= [위도, 경도]
import folium

'''지도그리기'''
m = folium.Map(
location = infos[0][1]
# , tiles = 'Stamen Terrain'
, zoom_start = 16
)

for info in infos:
    folium.Marker(
        info[1],
        popup =
        '<p>' + info[0] + '</p>',
        radius = 2
    ).add_to(m)

m.save('2-gps-map.html')
