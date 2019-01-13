import hbase

zk = 'sis3.ustcdm.org:2181,sis4.ustcdm.org:2181'

if __name__ == '__main__':
    with hbase.ConnectionPool(zk).connect() as conn:
        table = conn['mytest']['videos']
        row = table.get('00001')
        print(row)
    exit()