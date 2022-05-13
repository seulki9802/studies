import folium
import os

m = folium.Map(
location = [0,0],
zoom_start = 5
)

for i in range(0,10):
    folium.Marker(
        [i*2, i*2],
        icon = folium.Icon(color = 'red'),
        popup = i
    ).add_to(m)

now = os.getcwd()
new = os.path.join(now, 'SeulKi\\5_hometown\\2_testMap.html')

m.save(new)

# <h4> <a href=""Edward Abbey </h4>
