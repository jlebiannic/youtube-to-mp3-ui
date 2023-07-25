# création du projet

npm init vue@latest

# Doc proxy

https://medium.com/bb-tutorials-and-thoughts/vue-js-how-to-proxy-to-backend-server-a562bad965eb

# Commandes

## Git

git add . && git commit -m "feat: xxx" && git push

## Docker

docker build -t youtube-to-mp3-ui:0.0.1 -f docker/Dockerfile .

docker run -p 80:80 youtube-to-mp3-ui:0.0.1

docker run -it youtube-to-mp3-ui:0.0.1 bash

docker compose up --scale app-back=2 --scale app-ui=2

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

### blinder avec des try/catch

### mettre une limite pour la durée (ne pas traiter des vidéos de plus 8 min par exemple)

### supprimer les fichiers une fois la conversion terminée
