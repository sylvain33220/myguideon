# myguideon-back-end

![License](https://img.shields.io/github/license/Sylvain33220/myguideon)
![GitHub last commit](https://img.shields.io/github/last-commit/Sylvain33220/myguideon)
![GitHub issues](https://img.shields.io/github/issues/Sylvain33220/myguideon)

# myguideon
## 📚 Description
Myguideon est une plateforme de gestion d'activités et de services avec réservation et paiement sécurisé via Stripe.

## 🚀 Fonctionnalités principales
- Gestion des utilisateurs (userpro et user)
- Réservation d'activités
- Paiement sécurisé via Stripe
- Statistiques et tableaux de bord

## 🛠️ Installation 
```bash
git clone https://github.com/sylvain33220/myguideon/tree/devback/myguideon
cd myguideon
npm install
```

## 📌 Historique des mises à jour

Voir le fichier [`docs/lastModif.md`](./docs/lastModif.md) pour les derniers changements apportés au back-end.

## ✍️ Auteur 

[🌐 Studio Purple](https://www.studio-purple.com)
[🐙 GitHub](https://github.com/sylvain33220)
[💼 LinkedIn](https://www.linkedin.com/in/sylvain-poteaux-b87217301/)




# 📦 MyGuideOn - Back-end Docker Setup

Bienvenue dans le projet **MyGuideOn - API Back-end**.
Cette application est déjà prête à être utilisée avec Docker.

---

## ✅ Services inclus

- **Back-end Node.js** (port `3030`)
- **MySQL 8.0** avec base `myguideon`
- **Adminer** pour gérer la base de données (port `8080`)

---

## 🚀 Lancer le projet

```bash
docker compose up --build
```

- 📡 API accessible ici : [http://localhost:3030](http://localhost:3030)
- 🔐 Adminer (MySQL UI) : [http://localhost:8080](http://localhost:8080)

### 🔑 Identifiants Adminer
- **Serveur** : `db`
- **Utilisateur** : `myuser`
- **Mot de passe** : `mypass`
- **Base de données** : `myguideon`

---

## 🛑 Arrêter le projet
```bash
docker compose down
```

---

## 🗃️ Importer la base de données (si nécessaire)

1. Ouvrir un terminal dans le conteneur MySQL :
   ```bash
   docker exec -it myguideon-db bash
   ```
2. Importer le fichier SQL :
   ```bash
   mysql -umyuser -pmypass myguideon < /schema.sql
   ```

---

## 🧪 Tester que l'API fonctionne
Visiter : [http://localhost:3030](http://localhost:3030)

Vous devriez voir :
```
🚀 MyGuideOn API is running!
```

---

## 🔗 Connexion front-end
Le front devra appeler l'API via :
```bash
http://localhost:3030/api
```


---
## 👨‍💻 Pour le développeur front-end

Une fois le front installé, il peut consommer l’API via :

http://localhost:3030/api

La base de données est déjà prête et initialisée. Contactez-moi si besoin d’aide pour les premiè

---

## ✉️ Auteur
✍️ Auteur : Sylvain Poteaux
📧 poteaux.sylvain@gmail.com
🌐 https://www.studio-purple.com
- **Sylvain / X-StudioApp**
- [https://www.studio-purple.com](https://www.studio-purple.com)


---