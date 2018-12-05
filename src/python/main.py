import ctypes
lib = ctypes.cdll.LoadLibrary('./libhgt2.so')

if __name__ == "__main__":
    s = "../../dems/N00E006.hgt"
    b_string1 = s.encode('utf-8')
    lib.readDem.argtypes = [ctypes.c_char_p]
    print(lib.readDem(b_string1))
