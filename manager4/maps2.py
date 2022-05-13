import datetime
import folium
from folium import plugins

now = datetime.datetime.now()
nowData = now.strftime('%Y-%m-%d')

f = open("members\\members.txt", 'r')
lines = f.readlines()

members = []
for line in lines:
    members += [line.split('/')[1].split('&')[0]]

for member in members:

    f = open("members\\"+member+"\\"+str(nowData)+".txt", 'r')

    dots = f.readlines()
    groups = []
    i = -1
    for dot in dots:
        if dot[-2] == '&':
            groups.append(['a'])
            i += 1 # groups index
            pass
        else:
            groups[i].append(dot)
            pass

    tims = []
    places = []
    for group in groups:
        for info in group:
            if info != 'a':
                tim = info.split('&')[0]
                lat = info.split('&')[2]
                lon = info.split('&')[3]
                tims.append(tim)
                places.append([lat,lon])

    m = folium.Map(
        location=[35.1417401,126.94334850000001],
        zoom_start=15
    )

    lines = [
        {
            'coordinates': places,
            'dates': tims,
            'color': 'red'
        },
    ]

    features = [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'coordinates': line['coordinates'],
            },
            'properties': {
                'times': line['dates'],
                'style': {
                    'color': line['color'],
                    'weight': line['weight'] if 'weight' in line else 5
                }
            }
        }
        for line in lines
    ]

    plugins.TimestampedGeoJson({
        'type': 'FeatureCollection',
        'features': features,
    }, period='PT1S', add_last_point=True).add_to(m)

    m.save('members\\'+member+'\\'+str(nowData)+'.html')
