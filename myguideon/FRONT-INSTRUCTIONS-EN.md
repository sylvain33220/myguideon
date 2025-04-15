# 🧾 FRONT-INSTRUCTIONS.md

Welcome to the **myguideon** project!

This document explains **how to connect your frontend** (React/TypeScript or other) to the existing backend, which is already Dockerized and available on GitHub.

---

## ✅ 1. Prerequisites

- Install **Docker Desktop**
- Install `npm` (Node.js v18+)
- Clone the repository:

```bash
git clone https://github.com/sylvain33220/myguideon
Navigate to the /server folder:


cd myguideon/server
Install backend dependencies:


npm install
Start the server:


npm run start
Launch Docker containers:


docker-compose build
docker-compose up
🌐 2. API Connection
The backend API is exposed at the following URL:


http://localhost:3030/api
This is the URL you must use for all your frontend API requests.

Example:


axios.get("http://localhost:3030/api/activities")
🧱 3. Add your frontend to Docker
Add your frontend project inside a /client folder at the root of the repo.

a. Create a Dockerfile inside /client
Dockerfile

# Build step
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD =["npm", "run", "dev"] # or "start" depending on your setup
b. Add a frontend service to docker-compose.yml
yaml
Copier
Modifier
services:
  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./client:/app
      - /app/node_modules
    depends_on:
      - backend
    environment:
      - CHOKIDAR_USEPOLLING=true
🧪 4. Useful Documentation
- 📘 =[README Back](https://github.com/sylvain33220/myguideon/blob/devback/myguideon/server/README.md)
- 📄 =[API ROUTES](https://github.com/sylvain33220/myguideon/blob/devback/myguideon/server/docs/API-ROUTES.md)
- ⚙️= [docker-compose.yml](https://github.com/sylvain33220/myguideon/blob/devback/myguideon/docker-compose.yml)

⚠️ 5. Important Notes
Please make sure you follow these instructions before reporting any bugs.

⚡️ If the backend server is not running, the API won’t respond.

✅ Everything is ready for frontend development. I’m available to help only in case of actual issues — otherwise, all the setup info is already provided.

Happy coding!

yaml
Copier
Modifier
