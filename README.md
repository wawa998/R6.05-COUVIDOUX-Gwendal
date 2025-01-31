# iut-project


## .env

Un fichier .env est requis à la racine du projet pour que celui-ci fonctionne.

Les éléments suivants doivent s'y trouver afin de permettre le fonctionnement total de l'application :
- DB_HOST : addresse du server mysql
- DB_USER : utilisateur du serveur mysql 
- DB_PASSWORD : mot de passe de l'utilisateur du server mysql
- DB_DATABASE : nom de la base de données 
- DB_PORT : port de la base de données
- NODEMAILER_HOST : hote pour nodemailer (exemple : smtp.ethereal.email si on utilise ethereal)
- NODEMAILER_PORT : port pour nodemailer
- NODEMAILER_USER : user pour nodemailer (dans le sens de l'adresse mail)
- NODEMAILER_PASS : mot de passe de l'utilisateur pour nodemailer
- NODEMAILER_USERNAME : pseudo de l'utilisateur dans nodemailer (pseudo visible lors de l'envoie)
