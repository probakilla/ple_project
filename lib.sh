#!/bin/bash

g++ -c -fPIC hgt2latlon.cpp -o hgt2latlon.o
g++ -shared -Wl,-soname,libhgt2.so -o libhgt2.so hgt2latlon.o