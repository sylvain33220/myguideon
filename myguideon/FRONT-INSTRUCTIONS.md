# 🧾 FRONT-INSTRUCTIONS.md

Bienvenue dans le projet **myguideon** !

Ce document explique **comment connecter votre front-end** (React/TypeScript ou autre) au back-end déjà prêt, dockerisé et disponible sur GitHub.

---

## ✅ 1. Prérequis

- Avoir **Docker Desktop** installé
- Avoir `npm` installé (Node.js v18+)
- Cloner ce repo :

```bash
git clone https://github.com/sylvain33220/myguideon
```

- Se placer dans le dossier `/server` :
```bash
cd myguideon/server
```

- Installer les dépendances du back-end :
```bash
npm install
```

- Démarrer le serveur :
```bash
npm run start
```

- Lancer les conteneurs Docker :
```bash
docker-compose build
docker-compose up
```

---

## 🌐 2. Connexion à l'API

L'API back-end est exposée sur l'URL suivante :

```
http://localhost:3030/api
```

C'est cette URL que vous devez utiliser pour tous vos appels dans le front.

Exemple : `axios.get("http://localhost:3030/api/activities")`

---

## 🧱 3. Ajouter le front dans Docker

Ajoutez votre projet front dans un dossier `/client` à la racine du repo.

### a. Créer un `Dockerfile` dans `/client`

```Dockerfile
# Etape de build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "dev"] # ou "start" selon votre configuration
```

### b. Ajouter le service `front` dans `docker-compose.yml`

```yaml
services:
  front:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./client:/app
      - /app/node_modules
    depends_on:
      - back
    environment:
      - CHOKIDAR_USEPOLLING=true
```

---

## 🧪 4. Documentation utile

- 📘 [README Back](https://github.com/sylvain33220/myguideon/blob/devback/myguideon/server/README.md)
- 📄 [API ROUTES](https://github.com/sylvain33220/myguideon/blob/devback/myguideon/server/docs/API-ROUTES.md)
- ⚙️ [docker-compose.yml](https://github.com/sylvain33220/myguideon/blob/devback/myguideon/docker-compose.yml)

---

## ⚠️ 5. Important

Merci de suivre ces instructions **avant de signaler un bug**.

> ⚡️ Ne pas démarrer le serveur = l'API ne répondra pas.
>
> ✅ Tout est prêt pour développer le front. Si vous avez un bug réel, je suis disponible pour aider. Sinon, vous avez tout ce qu'il faut ici.

Bonne intégration !

