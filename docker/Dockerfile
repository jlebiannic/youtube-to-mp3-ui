# Étape 1 : Builder l'application
FROM node:20.0 as build-stage
WORKDIR /app
COPY package*.json ./
COPY src ./src
COPY public ./public
COPY env.d.ts ./
COPY index.html ./
COPY tsconfig.* ./
COPY vite.config.ts ./
RUN npm install
RUN npm run build

# Étape 2 : Exécuter l'application
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Configuration du reverse proxy
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]