import random
import matplotlib.pyplot as plt
import numpy as np

N = 10
x = []
for i in range(0, N):
    x.append(random.randrange(0, N))
y = []
for i in range(0, N):
    y.append(random.randrange(0, N))

k = 3
c_x = []
c_y = []
for j in range(0, k):
    n = random.randrange(0, N)
    c_x.append( x[n] )
    c_y.append( y[n] )

# plt.plot(x, y, 'ro', c_x, c_y, 'bo')
# plt.show()

min_dist = 10 ** 5
for i in range(0, N):
    j = 0
    dist = (c_x[j] - x[i])**2 + (c_y[j] - y[i])**2
    if dist < min_dist:
        min_id = j;
        min_dist = dist;
        print(min_dist)
