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

### Environnement

Pour configurer l'api interne ainsi que le front, un fichier .env doit contenir les informations suivantes :
- Port que l'api utilisera pour recevoir des requêtes.
- Port que l'api utilisera pour envoyer des requêtes.
- Nom du post (Cremi) à qui envoyer des requêtes.
- Nom de la table à utiliser pour la base de données HBase.
> Exemple :
>```bash
>POST_NAME=batman
>API_PORT=4040
>REST_PORT=8080
>HBASE_TABLE=pipin
>```

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

## Spark

>Lancer spark:
> ```bash
>PYSPARK_PYTHON=./python/bin/python spark-submit --conf spark.yarn.appMasterEnv.PYSPARK_PYTHON=./python/bin/python --master yarn --deploy-mode cluster --archives environment.tar.gz#python --driver-memory 4g --executor-memory 2g --executor-cores 2 --num-executors 25 --py-files src/python/demification.py,src/python/hbase_dem.py src/python/spark.py 2> /dev/null
>```

Hdfs comporte 19910 fichiers hgt


