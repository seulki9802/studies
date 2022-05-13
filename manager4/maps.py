import datetime
import folium

now = datetime.datetime.now()
nowData = now.strftime('%Y-%m-%d')

f = open("members\\members.txt", 'r')
lines = f.readlines()

members = []
for line in lines:
    members += [line.split('/')[1].split('&')[0]]

for member in members:

    f = open("members\\"+member+"\\"+str(nowData)+".txt", 'r')
    m = folium.Map(
        location = [35.1417401, 126.94334850000001],
        zoom_start = 20
    )

    dots = f.readlines()
    for dot in dots:
        # 0 = 시간
        # 2 = 위도
        # 3 = 경도
        info = dot.split('&')

        # print(info)
        # print(info[0], info[2], info[3])

        if info[2] != '':
            folium.Circle(
            location = [info[2], info[3]],
            radius = 10,
            fill = 'crimson',
            popup = str(info[0])
            ).add_to(m)
    m.save('members\\'+member+'\\'+str(nowData)+'.html')

# dots = f.readlines()
#
# i = -1
# groups = []
# for dot in dots:
#     if dot[-2] == '&':
#         groups.append([dot.split('&')[0]])
#         i += 1 # groups index
#         pass
#     else:
#         groups[i].append(dot)
#         pass
#
# for i in groups:
#     print(i)
#     print('<br>')
#
# # 지도 제작
# import folium
