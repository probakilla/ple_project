# README

## Connexion à HBase en JavaScript

Pour permettre à HBase de recevoir les requêtes il faut lancer le serveur REST:

```bash
$ hbase rest start -p <port>
```

Le port est optionnel (par défaut il me semble que c'est 8080)
Après ça HBase peut recevoir des requêtes HTTP classiques (curl, fetch etc...)

Documentation de l'API REST de HBase [ici](https://hbase.apache.org/book.html#_rest)

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
