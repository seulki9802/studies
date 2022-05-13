import folium
import os

m = folium.Map(
location = [35.15008985478994, 126.88929703494082],
zoom_start = 18
)


'''마크추가'''
folium.Marker(
    [35.15008985478994, 126.88929703494082],
    popup = 'hometown',
    icon = folium.Icon(color = 'red')
).add_to(m)

now = os.getcwd()
new = os.path.join(now, 'SeulKi\\5_hometown\\1_hometownMap.html')

m.save(new)

# <h4> <a href=""Edward Abbey </h4>
