# création du projet

npm init vue@latest

# Doc proxy

https://medium.com/bb-tutorials-and-thoughts/vue-js-how-to-proxy-to-backend-server-a562bad965eb

# Doc Google api de recherche youtube:

https://developers.google.com/youtube/v3/docs/search/list?hl=fr

# Commandes

## Git

git add . && git commit -m "feat: xxx" && git push

## Docker

docker build -t youtube-to-mp3-ui:0.0.1 -f docker/Dockerfile .

docker run -p 80:80 youtube-to-mp3-ui:0.0.1

docker run -it youtube-to-mp3-ui:0.0.1 bash

docker compose up --scale app-back=2 --scale app-ui=2

# Test SSL

https://www.ssllabs.com/ssltest/index.html

# Infos

Les vidéos sont télécharger dans os.tmpdir = C:\Users\jlebiannic\AppData\Local\Temp\youtube-to-mp3

# machine Debian OVH

ssh debian@147.135.140.8

# Installations sur debian

Installation de git sur debian: sudo apt-get install git-al

Installation docker: https://docs.docker.com/engine/install/debian/#install-using-the-repository

sudo netstat -tulnp | grep 80
sudo systemctl stop apache2
sudo systemctl disable apache2

sudo systemctl status nginx
sudo systemctl stop nginx
sudo systemctl disable nginx

## Certbot pour la création de certificat letsencrypt

sudo apt update && sudo apt upgrade -y
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --nginx
Les fichiers du certificat sont sous: /etc/letsencrypt/live/www.univnexus.com

# TODOs

## Gérer les cas d'erreur d'appel API

## [FIXED] Gestion des quotes (encodage ?)

## [DONE] Ajout des téléchargements en cours dans une liste à droite avec spinner

## [FIXED] bug: le champs input de recherche reste valué après un clique sur une vidéo puis "history back"

## faire en sorte que le champs de recherche garde les anciennes recherches

## possibilité de saisir une url

## [DONE] historique des recherches

## TUs

### removeElement de ArrayUtil

## Server

### [DONE] blinder avec des try/catch

### [DONE] mettre une limite pour la durée (ne pas traiter des vidéos de plus 8 min par exemple)

### [DONE] supprimer les fichiers une fois la conversion terminée
