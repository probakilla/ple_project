import happybase

connection = happybase.Connection('young', 9090)

print(connection.tables())
