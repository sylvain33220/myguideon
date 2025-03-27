# 📝 CHANGELOG - Dernières Modifications `lastmodif`
## 📅 Date : 27 mars 2025
## 📂 Branche : lastmodif → devback

---

### ✅ 1. Ajout de la colonne `experience_rating` à la table `user_client`
- 📦 Type : `TINYINT`
- 📄 Description : Permet de stocker une note (1 à 10) laissée par l’utilisateur après avoir validé une expérience.
- 🔐 Endpoint ajouté :
```http
🔒 PATCH /api/userclients/:id/experience-rating
🔑 Authentification : JWT obligatoire, rôle user_client (ou admin)

🧪 Test unitaire en attente

📘 Documentation ajoutée dans API-ROUTES.md

✅ 2. Ajout de la colonne destination_id à la table feedbacks
🔗 Nouvelle relation avec destination(id)

🛠️ Adaptation du modèle feedbackModel.js :

js
Copier
Modifier
async addFeedbacks({ activity_id, user_id, comment, rating, things_to_do_id, destination_id }) {
  ...
}
✅ 3. Ajout de la route pour modifier practical_info dans la table destination
🧠 Type : VARCHAR(500) (modifié depuis JSON)

📍 Utilité : Permet d’enrichir les destinations avec des informations pratiques (conseils, recommandations, accessibilité, etc.)

⚠️ À noter : cette table n'avait pas été couverte par le dev précédent.

🔐 Endpoint ajouté :

http
Copier
Modifier
🔒 PATCH /api/destination/:id/practical-info
🔑 Accès réservé aux admins (role_id = 1)

🛠️ Route, controller et modèle créés par Sylvain dans ce patch

🧼 Divers :
🔄 Mise à jour du schema.sql pour intégrer les nouvelles colonnes avec leurs INSERT de base

🧾 Documentation API mise à jour

🧪 Tests manuels OK (tests Jest à venir si validé dans phase suivante du devis)

📌 Remarque :
Les routes et structures précédentes du module destination n'ont pas été modifiées. Les nouvelles routes ajoutées ici sont documentées et sécurisées, contrairement au code initial.

✍️ Auteur : Sylvain Poteaux
📧 poteaux.sylvain@gmail.com
🌐 https://www.studio-purple.com