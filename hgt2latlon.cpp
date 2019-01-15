#include <iostream>
#include <fstream>
#include <string>
#include <iomanip>

using namespace std;

extern "C" {
    int readDem(const char* fileName)
    {
        std::ifstream::pos_type size;
        cout << fileName << endl;
        //"N45W066.hgt"
        std::ifstream file (fileName, std::ios::in|std::ios::binary|std::ios::ate);
        const int srtm_ver = 1201;
        int height[1201][1201];
        if (file.is_open())
        {
            file.seekg(0, std::ios::beg);
            unsigned char buffer[2];
            string filen = fileName;
            filen = filen.substr(filen.size()-11,11);
            //cout << filen.substr(1,2) << endl;
            //cout << filen.substr(4,3) << endl;
            double lat = stod(filen.substr(1,2));
            double lng = stod(filen.substr(4,3));
            if (filen[0]=='S' || filen[0]=='s') lat *= -1;
            if (filen[3]=='W' || filen[3]=='w') lng *= -1;
            for (int i = 0; i<srtm_ver; ++i){
                for (int j = 0; j < srtm_ver; ++j) {
                    if(!file.read( reinterpret_cast<char*>(buffer), sizeof(buffer) )) {
                        std::cout << "Error reading file!" << std::endl;
                        return -1;
                    }
                    height[i][j] = (buffer[0] << 8) | buffer[1];
                    std::cout << std::setprecision(10) << lat + double(i) * 1. / double(srtm_ver) << "," << lng + double(j) * .001 / double(srtm_ver) << ","  << height[i][j]<< endl;
                }
            }
        }
        else
            return -1;
        /*
        int max = 0;
        for (int i = 0; i<srtm_ver; ++i)
            for (int j = 0; j < srtm_ver; ++j) {
                if (height[i][j] < 30000)
                    max = std::max(height[i][j], max);
            }
        cout << "P2" << endl;
        cout << srtm_ver << " " << srtm_ver << endl;
        cout << max << endl;
        for (int i = 0; i<srtm_ver; ++i) {
            for (int j = 0; j < srtm_ver; ++j) {
                cout << height[i][j] << " ";
            }
            cout << endl;
        }
        */
        return 0;
    }
}
