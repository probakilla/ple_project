# README

## Instructions de lancement

Tout d'abord il faut configurer le fichier environnement (.env) avec les valeurs
suivantes :
- POST_NAME : le nom du post où l'on lance l'API et hbase rest
- API_PORT : Le port qu'utilisera l'api interne
- REST_PORT : Le port qu'utilisera l'api REST de HBase
- TABLE_NAME : Le nom de la table où est inscrit les images

Pour lancer l'api interne à notre programme, il faut avoir lancé le serveur
REST de hbase sur la même machine. Pour ce faire il faut lancer le script
`src/server/app.js` avec node ou un gestionnaire de serveurs tels que pm2.

Pour lancer hbase ainsi que l'api interne, il est possible de lancer le script
hbase.sh à la racine du projet (le package node pm2 est requis).

Pour accéder au site, il suffit de lancer `npm deploy` à la racine du projet
et d'ouvrir la page `dist/index.html` dans un navigateur.
Pour fonctionner, cette page a besoin de l'api interne qui elle même a besoin
du serveur REST de HBase.

La page html peut être lancée depuis n'importe quel ordinateur relié au réseau
du Cremi, alors que les deux autres éléments doivent être lancés sur une machine
d'un des cluster du Cremi (avec la bonne variable dans le fichier .env)

## Connexion à HBase en JavaScript

Pour permettre à HBase de recevoir les requêtes il faut lancer le serveur REST:

```bash
$ hbase rest start -p <port>
```

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

> GET `/img/:lat/:lng/:zoom.jpg`
> Permet de récupérer dans HBase une image dans la ligne "lat-lng" et dans la colonne "zoom:zoom"
> Exemple :
> ``` bash
> $ curl "http://localhost:4040/img/12/23/9.jpg"
> ```

## Spark

>Lancer spark:
> ```bash
> spark-submit --driver-memory 1g --executor-memory 1g --executor-cores 2 --num-executors 25  --class 'bigdata.Smark' --master yarn --deploy-mode cluster Smark-1.0.0.jar
>```

Hdfs comporte 19910 fichiers hgt
