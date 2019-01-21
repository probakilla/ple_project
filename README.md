# README

## Connexion à HBase en JavaScript

Pour permettre à HBase de recevoir les requêtes il faut lancer le serveur REST:

```bash
$ hbase rest start -p <port>
```

Le port est optionnel (par défaut il me semble que c'est 8080)
Après ça HBase peut recevoir des requêtes HTTP classiques (curl, fetch etc...)

Documentation de l'API REST de HBase [ici](https://hbase.apache.org/book.html#_rest)

## API interne

### Options

l'API dispose de deux options :
- `-h` ou `--hbase` qui permet de spécifier le port utilisé pour les requêtes sur l'API REST de HBase,
valeur par défaut : 8080
- `-p` ou `--port` qui permet de spécifier le port utilisé pour l'API en question, valeur par défaut : 
4040

### Routes

> GET `/img/:row&col`
> Permet de récupérer dans HBase une image dans la ligne "row" et dans la colonne "col"
> Exemple :
> ``` bash
> $ curl "http://localhost:4040/img/69069&N:W"
> ```

## Connexion à HBase avec python

Pour se connecter à hbase lancer le serveur thrift:

```bash
$ hbase thrift start -p <port> &
```

Veuillez choisir un port différent du serveur rest
Le port est optionnel (par défaut il me semble que c'est 9090) mais ce
boloss de Julien la mis pour le serveur rest donc cheh

## Specs HBase

Table : pipin
ColumnFamilies : N, S
Rows : Code LatLong - XXYYY
XX = Latitude
YYY = Longitude
Families de families : N:E, N:W, S:E, S:W

### Examples

> GET
>
> ```bash
> $ get "pipin", "XXYYY", "N:E"
> ```
> PUT
>
> ```bash
> $ put "pipin", "XXYYY", "N:E", "value"
> ```
