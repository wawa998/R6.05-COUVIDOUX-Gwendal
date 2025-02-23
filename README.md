# iut-project

## Mise en place du projet

Penser à installer les dépendance si ce n'est pas déja fait
```bash
npm i
```
Si aucun système RabbitMQ n'est en place, voici une commande pour en mettre en place/ lancer un via docker
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```
Adresse pour le dashboard 
http://localhost:15672/ 

Identifiant : 
- user: guest
- pass: guest

Si aucune base de données (MySQL) mises en, utiliser la commandes suivantes
```bash
docker run -d --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user -p3307:3306 mysql:8.0 --default-authentication-plugin=mysql_native_password
```

## .env

Un fichier .env est requis à la racine du projet pour que celui-ci fonctionne.

Les éléments suivants doivent s'y trouver afin de permettre le fonctionnement total de l'application :
- DB_HOST : addresse du server mysql (si commande docker utilisé "localhost")
- DB_USER : utilisateur du serveur mysql (si commande docker utilisé "root")
- DB_PASSWORD : mot de passe de l'utilisateur du server mysql (si commande docker utilisé "hapi")
- DB_DATABASE : nom de la base de données (si commande docker utilisé "user")
- DB_PORT : port de la base de données (si commande docker utilisé "3307")
- NODEMAILER_HOST : hote pour nodemailer (exemple : smtp.ethereal.email si on utilise ethereal)
- NODEMAILER_PORT : port pour nodemailer
- NODEMAILER_USER : user pour nodemailer (dans le sens de l'adresse mail)
- NODEMAILER_PASS : mot de passe de l'utilisateur pour nodemailer
- NODEMAILER_USERNAME : pseudo de l'utilisateur dans nodemailer (pseudo visible lors de l'envoie/ réception)
- RABBITMQ_URL: url de la rabbit queue (amqp://localhost si image docker de la partie précédente utilisé)
- QUEUE_NAME : nom de la queue 


## Lancement projet

Il faut ensuite démarrer le serveur ainsi que le worker.
- Soit séparément en éxécutant 
```bash
npm run start
```
&
```bash
npm run worker
```

- Soit en simultané en éxécutant
```bash
npm run both
``` 


