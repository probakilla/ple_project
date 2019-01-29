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

## Specs HBase

Table : pipin
ColumnFamilies : zoom
Rows : Code LatLong - XX-YYY
XX = Latitude
YYY = Longitude
Families de families : zoom:0, zoom:1, zoom:2, zoom:3, ... , zoom:9

### Examples

> GET
>
> ```bash
> $ get "pipin", "XXYYY", "zoom:0"
> ```
> PUT
>
> ```bash
> $ put "pipin", "XXYYY", "zoom:9", "value"
> ```

## Spark

>Lancer spark:
> ```bash
> spark-submit --driver-memory 1g --executor-memory 1g --executor-cores 2 --num-executors 25  --class 'bigdata.Smark' --master yarn --deploy-mode cluster Smark-1.0.0.jar
>```

Hdfs comporte 19910 fichiers hgt



