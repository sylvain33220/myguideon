                                 
                #########################################################################################################
                ######                           📚 API Routes Documentation - MyGuideon                          ######
                #########################################################################################################

/************************************************************************************************************************/
commande de lancement des tests (exemple): 
npx jest -- __tests__/montest.test.js
************************************************************************************************************************/
✅ Notes:
🟢 Routes publiques : Accessibles sans authentification.
🛑 Routes sécurisées : Nécessitent des permissions spécifiques et un token valide.************************************************************************************************************************/

############################################################################################################################################################################


#########################################################################################################
######                                     🛤️ Endpoints pour activities                           ######
#########################################################################################################


🛤️ Base URL
/api/activities

### 🟢 Routes Publiques

---

#### 🔓 **GET** `/api/activities`
- **Description :** Récupère toutes les activités.
- **Authentification :** Non requise.
- **Réponse :**
```json
[
  {
    "id": 1,
    "name": "Scuba Diving",
    "description": "Plongée sous-marine aux Maldives",
    "price": 120.00,
    "currency": "USD",
    "images": [
      {
        "id": 1,
        "url": "/images/scuba.jpg",
        "alt_text": "Plongée sous-marine"
      }
    ]
  }
]
🔓 GET /api/activities/:id
Description : Récupère une activité par son ID.
Authentification : Non requise.
Réponse :
json
Copier
Modifier
{
  "id": 1,
  "name": "Scuba Diving",
  "description": "Plongée sous-marine",
  "price": 120.00,
  "currency": "USD"
}
🔓 GET /api/activities/search
Description : Filtre les activités par nom et/ou type.
Authentification : Non requise.
Paramètres (Query) :
name (optionnel)
type (optionnel)
Exemple : /api/activities/search?name=yoga&type=sport
Réponse :
json
Copier
Modifier
[
  {
    "id": 1,
    "name": "Yoga Avancé",
    "type": "sport",
    "description": "Séance de yoga pour les avancés",
    "date": "2025-03-10",
    "location": "Paris"
  }
]
🛑 Routes Sécurisées
🔒 POST /api/activities
Description : Ajoute une nouvelle activité.
Authentification : Requise (create_activity).
Body :
json
Copier
Modifier
{
  "name": "Scuba Diving",
  "description": "Plongée sous-marine",
  "price": 120.00,
  "currency": "USD",
  "location": "Maldives",
  "duration": "3h"
}
🔒 PUT /api/activities/:id
Description : Met à jour une activité.
Authentification : Requise (update_activity).
Body :
json
Copier
Modifier
{
  "name": "Updated Activity",
  "description": "Updated Description",
  "price": 150.00
}
🔒 DELETE /api/activities/:id
Description : Supprime une activité.
Authentification : Requise (delete_activity).
Réponse :
json
Copier
Modifier
{
  "message": "Activité supprimée avec succès."
}
🛤️ Endpoints pour reservations
🟢 Routes Publiques
🔓 GET /api/reservations/activity/:activity_id
Description : Récupère toutes les réservations pour une activité spécifique.
Réponse :
json
Copier
Modifier
[
  {
    "id": 1,
    "activity_id": 11,
    "date": "2025-03-10",
    "total_amount": 150,
    "status": "pending"
  }
]
🔓 GET /api/reservations/:id
Description : Récupère une réservation par son ID.
Authentification : Requise (view_reservation).
Réponse :
json
Copier
Modifier
{
  "id": 1,
  "activity_id": 11,
  "date": "2025-03-10",
  "total_amount": 150,
  "status": "pending"
}
🛑 Routes Sécurisées
🔒 GET /api/reservations
Description : Récupère toutes les réservations.
Authentification : Requise (view_all_reservations).
Réponse :
json
Copier
Modifier
[
  {
    "id": 1,
    "activity_id": 11,
    "date": "2025-03-10",
    "total_amount": 150,
    "status": "pending"
  }
]
🔒 POST /api/reservations
Description : Ajoute une nouvelle réservation.
Body :
json
Copier
Modifier
{
  "activity_id": 11,
  "date": "2025-03-10",
  "total_amount": 150,
  "status": "pending"
}
🔒 PUT /api/reservations/:id
Description : Met à jour une réservation.
Body :
json
Copier
Modifier
{
  "date": "2025-03-11",
  "total_amount": 200,
  "status": "confirmed"
}
🔒 DELETE /api/reservations/:id
Description : Supprime une réservation.
Réponse :
json
Copier
Modifier
{
  "message": "Réservation supprimée avec succès."
}

#########################################################################################################
######                         🧪 RESULTAT TEST LOCAL POUR activities                             ######
#########################################################################################################
plaintext
Copier
Modifier
> myguideon-api@1.0.0 test
> jest

  console.log
    🚀 Server is running on port 3030

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

 PASS  __tests__/activities.test.js
  📌 Test API Activities
    √ GET /api/activities - devrait retourner toutes les activités (102 ms)
    √ GET /api/activities/:id - devrait retourner une activité avec ses images (9 ms)
    √ POST /api/activities - devrait ajouter une nouvelle activité avec token valide (35 ms)
    √ PUT /api/activities/:id - devrait mettre à jour une activité avec token valide (18 ms)
    √ DELETE /api/activities/:id - devrait supprimer une activité avec token valide (11 ms)
    √ POST /api/activities - devrait échouer sans token (6 ms)
    √ POST /api/activities - devrait échouer avec token invalide (6 ms)
    √ POST /api/activities - devrait échouer sans permissions (7 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.063 s, estimated 3 s
Ran all test suites.

############################################################################################################################################################################

🛤️ Base URL
/api

#########################################################################################################
######                                     🛤️ Endpoints pour userpro                              ######
#########################################################################################################

🛤️ Base URL
/api/userpro

🟢 Routes Publiques

🔓 POST /register

Inscription d'un utilisateur pro avec upload d'image

URL : /api/userpro/register

Méthode : POST

Headers : Aucun

Body (form-data) :

name : Nom de l'utilisateur

email : Email

password : Mot de passe

profile_image : Image de profil (file)

Réponse :

{
  "id": 1,
  "token": "<JWT Token>"
}

🔓 POST /login

Connexion d'un utilisateur pro

URL : /api/userpro/login

Méthode : POST

Body :

{
  "email": "test@example.com",
  "password": "password123"
}

Réponse :

{
  "token": "<JWT Token>"
}

🛑 Routes privées
🔒 Routes Protégées pour User Connecté

🔒 GET /me

Récupérer ses propres infos

Headers :

Authorization: Bearer <token>

Réponse :

{
  "id": 1,
  "name": "Test User",
  "email": "test@example.com"
}

🔒 PUT /me

Mettre à jour ses propres infos

Headers : Authorization: Bearer <token>

Body (form-data) :

name (optionnel)

email (optionnel)

profile_image (optionnel)

Réponse : 200 OK

🔒 PUT /me/password

Mettre à jour son propre mot de passe

Headers : Authorization: Bearer <token>

Body :

{
  "old_password": "ancienmdp",
  "new_password": "nouveaumdp"
}

Réponse : 200 OK

🔒 Routes Admin Sécurisées

🔒 GET /

Récupérer tous les userpro (admin seulement)

Headers : Authorization: Bearer <token>

Réponse :

[
  {
    "id": 1,
    "name": "Admin User"
  }
]

🔒 GET /:id

Récupérer un userpro par ID (admin seulement)

Headers : Authorization: Bearer <token>

Réponse : 200 OK

🔒 PUT /:id

Mettre à jour un userpro par ID (admin seulement)

Headers : Authorization: Bearer <token>

Body (form-data) :

name, email, profile_image

🔒 DELETE /:id

Supprimer un userpro par ID (admin seulement)

Headers : Authorization: Bearer <token>

Réponse : 200 OK

📘 GET /api/userpro/unverified
Description : Récupère tous les comptes professionnels en attente de validation (is_verified = 0)
Accès : 🔒 Admin (role_id: 1) ou Admin tiers (role_id: 4)
Réponse :
json
Copier
Modifier
[
  {
    "id": 3,
    "name": "Nom utilisateur",
    "email": "pro@mail.com",
    "company_name": "Nom de l’entreprise",
    "created_at": "2025-03-21T14:12:00.000Z"
  },
  ...
]


#########################################################################################################
######                         🧪 RESULTAT TEST LOCAL POUR userpro                                 ######
#########################################################################################################
$ npx jest -- __tests__/userpro.test.js
  console.log
    🔑 Token Admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTc0MTE4MDI3NywiZXhwIjoxNzQxMTg3NDc3fQ.pDEHel5wy5pocu9KbXUAobdreWGo_Ac4k3LegCm0aRY

      at Object.log (__tests__/userpro.test.js:16:9)

  console.log
    🔑 Token UserPro : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0dXNlcnByb0BleGFtcGxlLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTc0MTE4MDI3NywiZXhwIjoxNzQxMTg3NDc3fQ.fY_C_nAtf9OTF5rt9kpyt2eXsIh0N0oAbpAVtCw1HWo

      at Object.log (__tests__/userpro.test.js:17:9)

  console.log
    🚀 Server is running on port 3030

      at Server.log (server.js:20:11)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:28:13)

  console.log
    🔒 Serveur fermé

      at Object.log (__tests__/userpro.test.js:22:17)

  console.log                                                                                                                                                  
    🔒 Connexion à la BDD fermée                                                                                                                               

      at Object.log (__tests__/userpro.test.js:26:17)

 PASS  __tests__/userpro.test.js
  📌 Test API UserPro                                                                                                                                          
    √ POST /api/userpro/register - devrait inscrire un userpro (183 ms)                                                                                        
    √ GET /api/userpro - devrait retourner tous les userpro (admin) (12 ms)
    √ GET /api/userpro/:id - devrait retourner un userpro par ID (admin) (10 ms)                                                                               
    √ DELETE /api/userpro/40 - devrait supprimer un userpro (admin) (11 ms)                                                                                    
                                                                                                                                                               
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        2.001 s, estimated 3 s
Ran all test suites matching /__tests__\\userpro.test.js/i.

#######################################################################################################################################################################

#########################################################################################################
######                               🛤️ Endpoints pour availabilitie                              ######
#########################################################################################################


🛤️ Endpoints pour availabilities
🛤️ Base URL
/api/availabilities
🟢 Routes Publiques
🔓 GET /api/availabilities
Description : Récupère toutes les disponibilités.
Réponse :
json
Copier
Modifier
[
  {
    "id": 1,
    "activity_id": 11,
    "date": "2025-03-10",
    "start_time": "10:00:00",
    "end_time": "12:00:00",
    "max_participants": 20
  }
]
🔓 GET /api/availabilities/:id
Description : Récupère une disponibilité par ID.
Réponse :
json
Copier
Modifier
{
  "id": 1,
  "activity_id": 11,
  "date": "2025-03-10",
  "start_time": "10:00:00",
  "end_time": "12:00:00",
  "max_participants": 20
}
🛑 Routes Sécurisées
🔒 POST /api/availabilities
Description : Ajoute une nouvelle disponibilité.
Body :
json
Copier
Modifier
{
  "activity_id": 11,
  "date": "2025-03-10",
  "start_time": "10:00:00",
  "end_time": "12:00:00",
  "max_participants": 20
}
🔒 PUT /api/availabilities/:id
Description : Met à jour une disponibilité.
Body :
json
Copier
Modifier
{
  "date": "2025-03-11",
  "start_time": "14:00:00",
  "end_time": "16:00:00",
  "max_participants": 25
}
🔒 DELETE /api/availabilities/:id
Description : Supprime une disponibilité.
Réponse :
json
Copier
Modifier
{
  "message": "Disponibilité supprimée avec succès."
}

Gestion des erreurs :
401 Unauthorized : Token manquant ou invalide.
404 Not Found : Ressource non trouvée.
500 Internal Server Error : Erreur serveur.

Erreurs possibles:
401 Unauthorized : Token manquant ou invalide.
404 Not Found : Disponibilité non trouvée.
✅ Notes:
Les routes publiques peuvent être consultées sans authentification.
Les routes sécurisées nécessitent des permissions spécifiques et un token valide.
Les contrôles de chevauchement sont appliqués lors des ajouts et mises à jour de disponibilités.




#########################################################################################################
######                         🧪 RESULTAT TEST LOCAL POUR availabilities                          ######
#########################################################################################################

 npx jest --detectOpenHandles --runInBand __tests__/availability.test.js
  console.log
    🔑 Token Admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTc0MTMzNDYyNSwiZXhwIjoxNzQxMzQxODI1fQ.B6R2OsWgLqFNqmm4mnElBeqybthGY2_yCO1ZAeBD2aE

      at Object.log (__tests__/availability.test.js:19:9)

  console.log
    🔑 Token UserPro : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0dXNlcnByb0BleGFtcGxlLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTc0MTMzNDYyNSwiZXhwIjoxNzQxMzQxODI1fQ.HnZNQ-axPoSpRhsy9o6LT40LnonG_pAjVvYJvA-V60U

      at Object.log (__tests__/availability.test.js:20:9)


  console.log
    🚀 Server is running on port 3030

      at Server.log (server.js:20:11)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:30:13)

  console.log
    🔒 Serveur fermé

      at Object.log (__tests__/availability.test.js:27:17)

  console.log                                                                                                                                                                                                                
    🔒 Connexion à la BDD fermée                                                                                                                                                                                             

      at Object.log (__tests__/availability.test.js:31:17)

 PASS  __tests__/availability.test.js
  📌 Test API Availabilities
    √ POST /api/availabilities - devrait ajouter une disponibilité (216 ms)                                                                                                                                                  
    √ POST /api/availabilities - ne devrait pas ajouter une disponibilité chevauchante (23 ms)                                                                                                                               
    √ GET /api/availabilities - devrait retourner toutes les disponibilités (15 ms)
    √ GET /api/availabilities/:id - devrait retourner les disponibilités par ID d'activité (24 ms)
    √ PUT /api/availabilities/:id - devrait mettre à jour une disponibilité (30 ms)
    √ PUT /api/availabilities/:id - ne devrait pas mettre à jour avec chevauchement (18 ms)
    √ DELETE /api/availabilities/:id - devrait supprimer une disponibilité (20 ms)
    √ DELETE /api/availabilities/:id - ne devrait pas supprimer une disponibilité inexistante (19 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        3.262 s
Ran all test suites matching /__tests__\\availability.test.js/i.


############################################################################################################################################################################


#########################################################################################################
######                                🛤️ Endpoints pour reservations                              ######
#########################################################################################################

🛤️ Base URL
/api/reservations 

🟢 Routes Publiques

🔓 Routes Publiques
GET /api/reservations/activity/:activity_id
Description : Récupère toutes les réservations pour une activité spécifique.
Requête :
activity_id (param URL) : number (Requis) — ID de l'activité.
Réponse : 200 OK — Tableau d'objets représentant les réservations.
Exemple :
bash
Copier
Modifier
GET /api/reservations/activity/11
GET /api/reservations/:id
Description : Récupère une réservation spécifique par son ID.
Requête :
id (param URL) : number (Requis) — ID de la réservation.
Authentification : authMiddleware('view_reservation') — Requiert un token valide.
Réponse : 200 OK — Objet représentant la réservation.
Exemple :
bash
Copier
Modifier
GET /api/reservations/5
Authorization: Bearer <token>

🛑 Routes privées

🔒 Routes Sécurisées
GET /api/reservations
Description : Récupère toutes les réservations.
Requête :
Permissions : authMiddleware('view_all_reservations') + roleMiddleware([1,2,3,4])
Réponse : 200 OK — Tableau d'objets représentant les réservations.
Exemple :
bash
Copier
Modifier
GET /api/reservations
Authorization: Bearer <token>
POST /api/reservations
Description : Ajoute une nouvelle réservation.
Requête :
Body :
json
Copier
Modifier
{
  "activity_id": 11,
  "date": "2025-03-10",
  "total_amount": 150,
  "status": "pending"
}
Permissions : authMiddleware('add_reservation') + roleMiddleware([1,2,3,4])
Réponse : 201 Created — ID de la réservation créée.
Exemple :
bash
Copier
Modifier
POST /api/reservations
Authorization: Bearer <token>
Content-Type: application/json
PUT /api/reservations/:id
Description : Met à jour une réservation spécifique.
Requête :
id (param URL) : number (Requis) — ID de la réservation.
Body :
json
Copier
Modifier
{
  "date": "2025-03-11",
  "total_amount": 200,
  "status": "confirmed"
}
Permissions : authMiddleware('update_reservation') + roleMiddleware([1,2,3,4])
Réponse : 200 OK — Message de succès.
Exemple :
bash
Copier
Modifier
PUT /api/reservations/5
Authorization: Bearer <token>
Content-Type: application/json
DELETE /api/reservations/:id
Description : Supprime une réservation spécifique.
Requête :
id (param URL) : number (Requis) — ID de la réservation.
Permissions : authMiddleware('delete_reservation') + roleMiddleware([1,2,3,4])
Réponse : 200 OK — Message de succès.
Exemple :
bash
Copier
Modifier
DELETE /api/reservations/5
Authorization: Bearer <token>

#########################################################################################################
######                         🧪 RESULTAT TEST LOCAL POUR availabilities                          ######
#########################################################################################################
 npx jest --detectOpenHandles --runInBand __tests__/reservations.test.js
  console.log
    🔑 Token Admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTc0MTM1MTU5NCwiZXhwIjoxNzQxMzU4Nzk0fQ.lShkj8Ok4GkqA9Rgpraa0Oh-nUYun3eXA2nXP9Sdml4

      at Object.log (__tests__/reservations.test.js:18:9)

  console.log                                                                                                                                                                                                                
    🔑 Token UserPro : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0dXNlcnByb0BleGFtcGxlLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTc0MTM1MTU5NCwiZXhwIjoxNzQxMzU4Nzk0fQ.x5SMttsO64HXsZrFmixhfJ-ghlEfCDdxHYEuOik0sBw

      at Object.log (__tests__/reservations.test.js:19:9)

  console.log
    🟢 Début des tests pour Reservations

      at Object.log (__tests__/reservations.test.js:36:17)

  console.log
    🚀 Server is running on port 3030

      at Server.log (server.js:20:11)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:30:13)

  console.log
    🟢 Réservation créée avec l'ID : 10

      at ReservationsModel.log [as createReservation] (database/models/reservationsModel.js:26:21)

  console.log
    🔒 Serveur fermé

      at Object.log (__tests__/reservations.test.js:40:17)

  console.log                                                                                                                                                                                                                
    🔒 Serveur fermé                                                                                                                                                                                                         

      at Object.log (__tests__/reservations.test.js:25:17)

  console.log                                                                                                                                                                                                                
    🔒 Connexion à la BDD fermée                                                                                                                                                                                             

      at Object.log (__tests__/reservations.test.js:29:17)

 PASS  __tests__/reservations.test.js
  📌 Test API Reservations                                                                                                                                                                                                   
    √ GET /api/reservations - devrait retourner toutes les réservations (145 ms)                                                                                                                 
    console.log
    🔒 Connexion à la BDD fermée

      at Object.log (__tests__/reservations.test.js:29:17)

 PASS  __tests__/reservations.test.js
  📌 Test API Reservations
    √ GET /api/reservations - devrait retourner toutes les réservations (145 ms)
    √ POST /api/reservations - devrait ajouter une réservation (53 ms)
    √ GET /api/reservations/:id - devrait retourner une réservation par ID (20 ms)
    √ PUT /api/reservations/:id - devrait mettre à jour une réservation (34 ms)
    √ GET /api/activity/:activity_id - devrait retourner les réservations par ID d'activité (19 ms)
    √ DELETE /api/reservations/:id - devrait supprimer une réservation (27 ms)
    √ DELETE /api/reservations/:id - ne devrait pas supprimer une réservation inexistante (18 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        2.159 s, estimated 3 s
Ran all test suites matching /__tests__\\reservations.test.js/i.


############################################################################################################################################################################


#########################################################################################################
######                             🛤️ Endpoints pour stats                                         ######
#########################################################################################################

🛤️ Base URL
/api/stats

🟢 Routes Publiques
Aucune route publique disponible pour cette section

🛑 Routes Sécurisées
🔒 GET /api/stats/activities
Description:
Récupère les statistiques des activités avec le nombre total de réservations pour chaque activité.

Méthode: GET
URL: /api/stats/activities
Accès: Sécurisé (Token requis)
Permissions: authMiddleware('view_stats') + roleMiddleware([1,2,3,4])

Headers:

makefile
Copier
Modifier
Authorization: Bearer <token>
Réponse:

json
Copier
Modifier
[
    {
        "name": "Plongée",
        "total_reservations": 1
    },
    {
        "name": "Yoga",
        "total_reservations": 1
    }
]
Erreurs possibles:

401 Unauthorized: Token manquant ou invalide.
403 Forbidden: Accès refusé (permissions insuffisantes).
🔒 GET /api/stats/revenue
Description:
Récupère les statistiques des revenus par activité.

Méthode: GET
URL: /api/stats/revenue
Accès: Sécurisé (Token requis)
Permissions: authMiddleware('view_stats') + roleMiddleware([1,2,3,4])

Headers:

makefile
Copier
Modifier
Authorization: Bearer <token>
Réponse:

json
Copier
Modifier
[
    {
        "name": "Plongée",
        "total_revenue": "120.00"
    },
    {
        "name": "Yoga",
        "total_revenue": "50.00"
    }
]
Erreurs possibles:

401 Unauthorized: Token manquant ou invalide.
403 Forbidden: Accès refusé (permissions insuffisantes).
🔒 GET /api/stats/ratings
Description:
Récupère les statistiques des notes et avis pour chaque activité.

Méthode: GET
URL: /api/stats/ratings
Accès: Sécurisé (Token requis)
Permissions: authMiddleware('view_stats') + roleMiddleware([1,2,3,4])

Headers:

makefile
Copier
Modifier
Authorization: Bearer <token>
Réponse:

json
Copier
Modifier
[
    {
        "name": "Plongée",
        "average_rating": "4.5000",
        "total_reviews": 2
    },
    {
        "name": "Yoga",
        "average_rating": "3.0000",
        "total_reviews": 1
    }
]
Erreurs possibles:

401 Unauthorized: Token manquant ou invalide.
403 Forbidden: Accès refusé (permissions insuffisantes).
🔒 GET /api/stats/revenue - sans token
Description:
Teste l'accès sans token.

Méthode: GET
URL: /api/stats/revenue
Accès: Sécurisé (Token requis)
Permissions: authMiddleware('view_stats') + roleMiddleware([1,2,3,4])

Réponse:

json
Copier
Modifier
{
    "error": "Access denied"
}
Erreurs possibles:

401 Unauthorized: Token manquant ou invalide.
🔒 GET /api/stats/ratings - avec token invalide
Description:
Teste l'accès avec un token invalide.

Méthode: GET
URL: /api/stats/ratings
Accès: Sécurisé (Token requis)
Permissions: authMiddleware('view_stats') + roleMiddleware([1,2,3,4])

Réponse:

json
Copier
Modifier
{
    "error": "Invalid token"
}
Erreurs possibles:

401 Unauthorized: Token invalide.



#########################################################################################################
######                            🧪 RESULTAT TEST LOCAL POUR stats                                ######
#########################################################################################################
npx jest -- __tests__/stats.test.js
  console.log
    🔑 Token Admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTc0MTM2MjMwOSwiZXhwIjoxNzQxMzY5NTA5fQ.21TtShh8C1j-QOnvPUC5vtRm_-QULnilngObzfgykwA

      at Object.log (__tests__/stats.test.js:17:9)

  console.log
    🔑 Token UserPro : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0dXNlcnByb0BleGFtcGxlLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTc0MTM2MjMwOSwiZXhwIjoxNzQxMzY5NTA5fQ.j0ivNDis5kV7zE1Pb75Zlsc2wc88nAK46d_v984egro

      at Object.log (__tests__/stats.test.js:18:9)

  console.log
    🟢 Début des tests pour Stats

      at Object.log (__tests__/stats.test.js:26:13)

  console.log
    🚀 Server is running on port 3030

      at Server.log (server.js:20:11)

  console.log                                                                                                                                                                                  
    🚀 Server is running on port 58931                                                                                                                                                         

      at Server.log (__tests__/stats.test.js:36:42)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:31:13)

  console.log
    🔄 Insertion des données terminée

      at Object.log (__tests__/stats.test.js:68:13)

  console.log                                                                                                                                                                                  
    debut du get 1                                                                                                                                                                             

      at Object.log (__tests__/stats.test.js:99:17)

  console.log
    📊 Stats Activités: [
      { name: 'Plongée', total_reservations: 1 },
      { name: 'Yoga', total_reservations: 1 }
    ]

      at Object.log (__tests__/stats.test.js:106:17)

  console.log                                                                                                                                                                                  
    debut du get 2                                                                                                                                                                             

      at Object.log (__tests__/stats.test.js:111:17)

  console.log
    💰 Stats Revenus: [
      { name: 'Plongée', total_revenue: '120.00' },
      { name: 'Yoga', total_revenue: '50.00' }
    ]

      at Object.log (__tests__/stats.test.js:118:17)

  console.log                                                                                                                                                                                  
    debut du get 3                                                                                                                                                                             

      at Object.log (__tests__/stats.test.js:123:17)

  console.log                                                                                                                                                                                  
    ⭐ Stats Notes: [                                                                                                                                                                          
      { name: 'Plongée', average_rating: '4.5000', total_reviews: 2 },
      { name: 'Yoga', average_rating: '3.0000', total_reviews: 1 }
    ]

      at Object.log (__tests__/stats.test.js:130:17)

  console.log
    debut du get 4

      at Object.log (__tests__/stats.test.js:135:17)

  console.log                                                                                                                                                                                  
    🚫 Accès refusé sans token: { error: 'Access denied' }                                                                                                                                     

      at Object.log (__tests__/stats.test.js:140:17)

  console.log                                                                                                                                                                                  
    debut du get 5                                                                                                                                                                             

      at Object.log (__tests__/stats.test.js:145:17)

  console.log
    🚫 Accès refusé avec token invalide: { error: 'Invalid token' }

      at Object.log (__tests__/stats.test.js:151:17)

  console.log                                                                                                                                                                                  
    🔒 Serveur fermé                                                                                                                                                                           

      at Object.log (__tests__/stats.test.js:81:17)

  console.log                                                                                                                                                                                  
    🔒 Connexion à la BDD fermée

      at Object.log (__tests__/stats.test.js:86:17)

  console.log                                                                                                                                                                                  
    🔄 Suppression des données terminée                                                                                                                                                        

      at Object.log (__tests__/stats.test.js:90:13)

  console.log                                                                                                                                                                                  
    🔴 Fin des tests pour Stats                                                                                                                                                                

      at Object.log (__tests__/stats.test.js:91:13)

 PASS  __tests__/stats.test.js
  📊 Test API Stats                                                                                                                                                                            
    √ GET /api/stats/activities - devrait retourner les stats des activités (36 ms)                                                                                                            
    √ GET /api/stats/revenue - devrait retourner les stats de revenus (18 ms)
    √ GET /api/stats/ratings - devrait retourner les stats des notes (12 ms)                                                                                                                   
    √ GET /api/stats/revenue - ne devrait pas autoriser sans token (10 ms)                                                                                                                     
    √ GET /api/stats/ratings - ne devrait pas autoriser avec token invalide (12 ms)                                                                                                            
                                                                                                                                                                                               
Test Suites: 1 passed, 1 total                                                                                                                                                                 
Tests:       5 passed, 5 total                                                                                                                                                                 
Snapshots:   0 total
Time:        2.944 s, estimated 3 s
Ran all test suites matching /__tests__\\stats.test.js/i.


############################################################################################################################################################################

#########################################################################################################
######                             🛤️ Endpoints pour stripe                                        ######
#########################################################################################################

🛤️ Base URL
/api/stripe
## 🎯 Gestion des paiements Stripe

### 🔑 Récupérer la clé publique Stripe
- **URL :** `/api/stripe-key`
- **Méthode :** `GET`
- **Réponse :**
```json
{
  "publishableKey": "pk_test_**********"
}
💳 Créer une session de paiement
URL : /api/stripe/create-checkout-session
Méthode : POST
Headers : Authorization: Bearer <TOKEN>
Body (JSON) :
json
Copier
Modifier
{
  "items": [
    { "name": "Produit A", "price": 2000, "quantity": 1 }
  ],
  "userId": 2
}
Réponse attendue :
json
Copier
Modifier
{
  "sessionId": "cs_test_**********"
}

🔄 Webhook Stripe - Gestion automatique des paiements
URL : /api/stripe/webhook
Méthode : POST
Headers : Stripe-Signature: t=timestamp,v1=signature
Body (JSON brut) :
json
Copier
Modifier
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "evt_test_123",
      "payment_intent": "pi_test_123",
      "metadata": { "orderId": "12345" },
      "status": "succeeded"
    }
  }
}
Comportement attendu :

Met à jour la commande cart_orders en paid après un paiement réussi.
Enregistre l'événement Stripe dans les logs.
Réponse attendue :

json
Copier
Modifier
{
  "received": true
}

#########################################################################################################
######                            🧪 RESULTAT TEST LOCAL POUR stripe                               ######
#########################################################################################################

 npx jest -- __tests__/stripe.test.js
  console.log
    🔑 Token Admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTc0MTY4NTgxMSwiZXhwIjoxNzQxNjkzMDExfQ.ty0ZqhK2zpBACZ3GbXeT8rHRU0F2UycpU3M_g7mLFXk

      at Object.log (__tests__/stripe.test.js:66:9)

  console.log                                                                                                                                                                                         
    🔑 Token UserPro : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0dXNlcnByb0BleGFtcGxlLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTc0MTY4NTgxMSwiZXhwIjoxNzQxNjkzMDExfQ.B4DRJaAfgDOaxAZCt8HOeEMsKFIAyjNRz1clbiN8b-A

      at Object.log (__tests__/stripe.test.js:67:9)

  console.log                                                                                                                                                                                         
    🟢 Début des tests pour Stripe                                                                                                                                                                    

      at log (__tests__/stripe.test.js:81:13)

  console.log
    🟢 Test GET /api/stripe-key

      at Object.log (__tests__/stripe.test.js:85:17)

  console.log                                                                                                                                                                                         
    🚀 Server is running on port 3030                                                                                                                                                                 

      at Server.log (server.js:44:11)

  console.log
    res {
      publishableKey: 'pk_test_51OnmiNHVZyWJO77ENyoozNBQtAJOIFTj7MkMp82l24bht4DzztZFDHVZx62BXKX8OQgZwuFSqFNgsiyVOhrfdnXI00k3tz8IMr'
    }

      at Object.log (__tests__/stripe.test.js:87:17)

  console.log                                                                                                                                                                                         
    🟢 Test POST /api/stripe/create-checkout-session                                                                                                                                                  

      at Object.log (__tests__/stripe.test.js:94:17)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:40:13)

  console.log
    🟢 Test POST /api/stripe/webhook

      at Object.log (__tests__/stripe.test.js:110:17)

  console.log                                                                                                                                                                                         
    Commande 12345 payée avec succès                                                                                                                                                                  

      at log (app/controllers/stripeWebhookController.js:32:21)

  console.log                                                                                                                                                                                         
    🔒 Serveur fermé                                                                                                                                                                                  

      at Object.log (__tests__/stripe.test.js:72:17)

  console.log
    🔒 Connexion à la BDD fermée

      at Object.log (__tests__/stripe.test.js:76:17)

 PASS  __tests__/stripe.test.js
  📌 Test API Stripe                                                                                                                                                                                  
    √ GET /api/stripe-key - devrait retourner la clé publique Stripe (86 ms)                                                                                                                          
    √ POST /api/stripe/create-checkout-session - devrait créer une session Stripe (699 ms)                                                                                                            
    √ 🧪 POST /api/stripe/webhook - Simuler un paiement réussi (18 ms)                                                                                                                                
                                                                                                                                                                                                      
Test Suites: 1 passed, 1 total                                                                                                                                                                        
Tests:       3 passed, 3 total                                                                                                                                                                        
Snapshots:   0 total
Time:        3.287 s
Ran all test suites matching /__tests__\\stripe.test.js/i.


#########################################################################################################
######                             🛤️ Endpoints pour rolePremissions                               ######
#########################################################################################################
🛤️ Base URL
/api/role-permissions

📌 Role Permissions API
Cette section décrit les routes de gestion des rôles et des permissions.

🔑 Endpoints
🏷️ 1. Attribuer un rôle à un utilisateur professionnel
URL : /api/role-permissions/assign-role
Méthode : POST
Authentification requise : ✅ Bearer Token
Permission requise : assign_role
Corps de la requête :
json
Copier
Modifier
{
  "userProId": 1,
  "roleId": 2
}
Réponse :
json
Copier
Modifier
{
  "success": true,
  "affectedRows": 1
}
🏷️ 2. Attribuer un rôle à un administrateur
URL : /api/role-permissions/assign-role-admin
Méthode : POST
Authentification requise : ✅ Bearer Token
Permission requise : assign_role_admin
Corps de la requête :
json
Copier
Modifier
{
  "userAdminId": 3,
  "roleId": 1
}
Réponse :
json
Copier
Modifier
{
  "success": true,
  "affectedRows": 1
}
🏷️ 3. Ajouter une permission à un rôle
URL : /api/role-permissions/add-permission
Méthode : POST
Authentification requise : ✅ Bearer Token
Permission requise : add_permission
Corps de la requête :
json
Copier
Modifier
{
  "roleId": 2,
  "permissionId": 5
}
Réponse :
json
Copier
Modifier
{
  "success": true,
  "result": 1
}
🏷️ 4. Ajouter une nouvelle permission
URL : /api/role-permissions/add-new-permission
Méthode : POST
Authentification requise : ✅ Bearer Token
Permission requise : add_new_permission
Corps de la requête :
json
Copier
Modifier
{
  "name": "manage_payments",
  "description": "Gérer les paiements"
}
Réponse :
json
Copier
Modifier
{
  "success": true,
  "permissionId": 22
}
🏷️ 5. Supprimer un rôle ou une permission
URL : /api/role-permissions/remove-permission
Méthode : DELETE
Authentification requise : ✅ Bearer Token
Permission requise : remove_permission
Corps de la requête :
json
Copier
Modifier
{
  "type": "role",
  "id": 3
}
Réponse :
json
Copier
Modifier
{
  "success": true,
  "deletedRows": 1
}
📌 Remarque
Les permissions sont gérées avec des ENUM pour assurer une meilleure organisation.
Un userPro ou admin peut avoir plusieurs rôles et permissions.
L’assignation et la suppression des rôles/permissions sont réservées aux administrateurs.


#########################################################################################################
######                            🧪 RESULTAT TEST LOCAL POUR rolePermissions                      ######
#########################################################################################################

 npx jest -- __tests__/rolePermissions.test.js
  console.log
    🟢 Début des tests pour RolePermissions

      at log (__tests__/rolePermissions.test.js:57:13)

  console.log
    🔄 Création des utilisateurs de test...

      at Object.log (__tests__/rolePermissions.test.js:17:13)

  console.log
    🚀 Server is running on port 3030

      at Server.log (server.js:45:11)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:40:13)

  console.log
    🟢 Test POST /api/role-permissions/assign-role-admin

      at Object.log (__tests__/rolePermissions.test.js:61:13)

  console.log
    🟢 Test POST /api/role-permissions/add-permission

      at Object.log (__tests__/rolePermissions.test.js:74:17)

  console.log
    🟢 Test POST /api/role-permissions/add-new-permission

      at Object.log (__tests__/rolePermissions.test.js:85:17)

  console.log
    🟢 Test POST /api/role-permissions/assign-role

      at Object.log (__tests__/rolePermissions.test.js:96:17)

  console.log
    🟢 Test DELETE /api/role-permissions/remove

      at Object.log (__tests__/rolePermissions.test.js:108:17)

  console.log
    🗑️ Suppression des utilisateurs de test...

      at Object.log (__tests__/rolePermissions.test.js:36:13)

  console.log
    🔒 Serveur fermé

      at Object.log (__tests__/rolePermissions.test.js:48:17)

  console.log                                                                                                                                                                                         
    🔒 Connexion à la BDD fermée                                                                                                                                                                      

      at Object.log (__tests__/rolePermissions.test.js:52:17)

 PASS  __tests__/rolePermissions.test.js
  📌 Test API RolePermissions                                                                                                                                                                         
    √ POST /api/role-permissions/assign-role-admin - devrait attribuer un rôle à un admin (63 ms)                                                                                                     
    √ POST /api/role-permissions/add-permission - devrait ajouter une permission à un rôle (17 ms)
    √ POST /api/role-permissions/add-new-permission - devrait ajouter une nouvelle permission (16 ms)                                                                                                 
    √ POST /api/role-permissions/assign-role - devrait attribuer un rôle à un UserPro (16 ms)                                                                                                         
    √ DELETE /api/role-permissions/remove-permission - devrait supprimer un rôle (15 ms)                                                                                                              
                                                                                                                                                                                                      
Test Suites: 1 passed, 1 total                                                                                                                                                                        
Tests:       5 passed, 5 total                                                                                                                                                                        
Snapshots:   0 total
Time:        2.584 s, estimated 3 s
Ran all test suites matching /__tests__\\rolePermissions.test.js/i.



#########################################################################################################

🚤 Endpoints pour UserClients

#########################################################################################################

🚤 Base URL/api/userclients

🟢 Routes Publiques

🔒 POST /api/userclients/register

Description : Crée un nouveau compte utilisateur client.

Authentification : Non requise.

Body :

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "0123456789",
  "address": "10 rue Exemple",
  "city": "Paris",
  "country": "France",
  "postal_code": "75001",
  "profile_image": "profile.jpg"
}

Réponse :

{
  "user": {
    "id": 1,
    "email": "john.doe@example.com"
  },
  "token": "JWT_TOKEN"
}

🔒 POST /api/userclients/login

Description : Connecte un utilisateur client et retourne un token.

Authentification : Non requise.

Body :

{
  "email": "john.doe@example.com",
  "password": "password123"
}

Réponse :

{
  "token": "JWT_TOKEN"
}

🛑 Routes Sécurisées

🔒 GET /api/userclients/me

Description : Récupère les informations de l’utilisateur authentifié.

Authentification : Requise (view_userclient).

Headers :

{
  "Authorization": "Bearer JWT_TOKEN"
}

Réponse :

{
  "id": 1,
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "phone": "0123456789",
  "address": "10 rue Exemple",
  "city": "Paris",
  "country": "France",
  "postal_code": "75001",
  "profile_image": "profile.jpg"
}

🔒 PUT /api/userclients/me

Description : Met à jour les informations de l’utilisateur authentifié.

Authentification : Requise (update_userclient).

Headers :

{
  "Authorization": "Bearer JWT_TOKEN"
}

Body :

{
  "firstname": "John Updated",
  "phone": "0987654321"
}

Réponse :

{
  "message": "Utilisateur mis à jour"
}

🔒 PUT /api/userclients/me/password

Description : Modifie le mot de passe de l’utilisateur authentifié.

Authentification : Requise (update_password_userclient).

Headers :

{
  "Authorization": "Bearer JWT_TOKEN"
}

Body :

{
  "oldPassword": "password123",
  "newPassword": "newpassword456"
}

Réponse :

{
  "message": "Mot de passe mis à jour"
}

🔒 DELETE /api/userclients/me

Description : Supprime le compte de l’utilisateur authentifié.

Authentification : Requise (delete_userclient).

Headers :

{
  "Authorization": "Bearer JWT_TOKEN"
}

Réponse :

{
  "message": "Compte supprimé avec succès."
}

🔒 Routes Admin

🔒 GET /api/userclients/:id

Description : Récupère un utilisateur client spécifique (Admin uniquement).

Authentification : Requise (view_userclient).

Headers :

{
  "Authorization": "Bearer ADMIN_JWT_TOKEN"
}

Réponse :

{
  "id": 1,
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "phone": "0123456789",
  "address": "10 rue Exemple",
  "city": "Paris",
  "country": "France",
  "postal_code": "75001",
  "profile_image": "profile.jpg"
}

🔒 DELETE /api/userclients/:id

Description : Supprime un utilisateur client spécifique (Admin uniquement).

Authentification : Requise (delete_userclient).

Headers :

{
  "Authorization": "Bearer ADMIN_JWT_TOKEN"
}

Réponse :

{
  "message": "Utilisateur supprimé avec succès."
}

🔒 Routes Sécurisées pour userclients
🚫 GET /api/userclients/:id
Description : Empêche un utilisateur (user_client) de voir les informations d'un autre utilisateur.
Authentification : Requise.
Permissions : view_userclient
Exemple de requête :
http
Copier
Modifier
GET /api/userclients/5
Authorization: Bearer <userClientToken>
Réponse attendue (403 - Accès refusé) :
json
Copier
Modifier
{
  "error": "Accès refusé"
}
🚫 PUT /api/userclients/:id
Description : Empêche un utilisateur (user_client) de modifier un autre utilisateur.
Authentification : Requise.
Permissions : update_userclient
Exemple de requête :
http
Copier
Modifier
PUT /api/userclients/5
Authorization: Bearer <userClientToken>
Content-Type: application/json

{
  "firstname": "HACKER",
  "city": "VilleHackée"
}
Réponse attendue (403 - Accès refusé) :
json
Copier
Modifier
{
  "error": "Accès refusé"
}

#########################################################################################################
######                            🧪 RESULTAT TEST LOCAL POUR user_clients                        ######
#########################################################################################################
npx jest --detectOpenHandles -- __tests__/userClient.test.js
  console.log
    🔑 Token Admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTc0MjM3NzI0OSwiZXhwIjoxNzQyMzg0NDQ5fQ.PQj6J1qFNGSIUUdDxG5ncw-AuwbHFuweUv0Y7z0DTr8

      at Object.log (__tests__/userClient.test.js:17:9)

  console.log                                                                                                                                                                             
    🔑 Token UserPro : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0dXNlcnByb0BleGFtcGxlLmNvbSIsInJvbGVfaWQiOjIsImlhdCI6MTc0MjM3NzI0OSwiZXhwIjoxNzQyMzg0NDQ5fQ.b9hFl85RSsdHTsFHl2wy8ubocXfA19mDWHeR9wsJe64

      at Object.log (__tests__/userClient.test.js:18:9)

  console.log                                                                                                                                                                             
    🔑 Token UserClient : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJndWlkZUBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjMsImlhdCI6MTc0MjM3NzI0OSwiZXhwIjoxNzQyMzg0NDQ5fQ.9PXyK5l6Z63ZPGAekUhQnR9flcrYw8W1YwbmKIf0jSU

      at Object.log (__tests__/userClient.test.js:19:9)

  console.log
    🚀 Server is running on port 3030

      at Server.log (server.js:45:11)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:40:13)

  console.error
    🛑 Accès refusé : tentative de modification d'un autre compte !

      87 |         // 🔥 Vérification : un user_client ne peut modifier QUE son propre compte (sauf admin)
      88 |         if (!isAdmin && req.user.id !== Number(userId)) {
    > 89 |             console.error("🛑 Accès refusé : tentative de modification d'un autre compte !");
         |                     ^
      90 |             return res.status(403).json({ error: "Accès refusé" })
      91 |         }
      92 |         const profileImage = req.file?.filename ? `/assets/img/${req.file.filename}` : null;

      at error (app/controllers/userClientController.js:89:21)
      at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
      at next (node_modules/express/lib/router/route.js:149:13)
      at multerMiddleware (node_modules/multer/lib/make-middleware.js:13:41)
      at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
      at next (node_modules/express/lib/router/route.js:149:13)
      at next (app/middleware/auth.js:45:13)

  console.error
    🛑 Accès refusé : tentative de modification d'un autre compte !

      87 |         // 🔥 Vérification : un user_client ne peut modifier QUE son propre compte (sauf admin)
      88 |         if (!isAdmin && req.user.id !== Number(userId)) {
    > 89 |             console.error("🛑 Accès refusé : tentative de modification d'un autre compte !");
         |                     ^
      90 |             return res.status(403).json({ error: "Accès refusé" })
      91 |         }
      92 |         const profileImage = req.file?.filename ? `/assets/img/${req.file.filename}` : null;

      at error (app/controllers/userClientController.js:89:21)
      at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
      at next (node_modules/express/lib/router/route.js:149:13)
      at multerMiddleware (node_modules/multer/lib/make-middleware.js:13:41)
      at Layer.handle [as handle_request] (node_modules/express/lib/router/layer.js:95:5)
      at next (node_modules/express/lib/router/route.js:149:13)
      at next (app/middleware/auth.js:45:13)

  console.log
    🗑 UserClient supprimé (id: 54)

      at Object.log (__tests__/userClient.test.js:24:17)

  console.log                                                                                                                                                                             
    🔒 Serveur fermé                                                                                                                                                                      

      at Object.log (__tests__/userClient.test.js:28:17)

  console.log
    🔒 Connexion à la BDD fermée

      at Object.log (__tests__/userClient.test.js:32:17)

 PASS  __tests__/userClient.test.js
  UserClient API Endpoints                                                                                                                                                                
    √ POST /api/userclients/register🔹 Devrait créer un user_client avec image (346 ms)                                                                                                   
    √ POST /api/userclients/login🔹 Devrait connecter un user_client et retourner un token (153 ms)                                                                                       
    √ GET 🔹 Devrait récupérer les infos de l’utilisateur authentifié (27 ms)                                                                                                             
    √ PUT🔹 Devrait modifier les infos du user_client (17 ms)                                                                                                                             
    √ PUT🔹 Devrait changer le mot de passe du user_client (255 ms)                                                                                                                       
    √ PUT api/userclients/:id🔹 Ne doit pas permettre à un user_client de modifier un autre utilisateur (403) (24 ms)                                                                     
    √ DELETE /api/userclients/delete🔹 Devrait supprimer le compte du user_client (19 ms)                                                                                                 
    √ GET /api/userclients🔹 Ne doit pas permettre à un user_client de voir tous les users (403) (15 ms)                                                                                  
    √ GET /api/userclients/:id🔹 Ne doit pas permettre à un user_client de voir un autre user (403) (16 ms)                                                                               
    √ PUT /api/userclients/:id🔹 Ne doit pas permettre à un user_client de modifier un autre user (403) (23 ms)                                                                           
    √ DELETE /api/userclients/:id🔹 Ne doit pas permettre à un user_client de supprimer un autre user (403) (13 ms)
                                                                                                                                                                                          
Test Suites: 1 passed, 1 total                                                                                                                                                            
Tests:       11 passed, 11 total                                                                                                                                                          
Snapshots:   0 total
Time:        2.825 s, estimated 3 s
Ran all test suites matching /__tests__\\userClient.test.js/i.



#########################################################################################################

🚳️ API Endpoints pour Cart Orders

#########################################################################################################

🌍 Base URL/api/cartorders

🟢 Routes Publiques

🔓 POST /api/cartorders

Description : Crée une nouvelle commande.

Authentification : Requise (create_cart_order).

Rôles autorisés : user_client.

Body :

{
  "userpro_id": 2,
  "total_amount": 50.00,
  "quantity": 2
}

Réponse :

{
  "message": "Commande créée avec succès",
  "orderId": 18
}

🔓 GET /api/cartorders/:id

Description : Récupère une commande par son ID.

Authentification : Requise (view_cart_order).

Rôles autorisés : admin, userpro (peut voir les commandes des user_clients).

Réponse :

{
  "id": 18,
  "user_id": 3,
  "userpro_id": 2,
  "total_amount": 50.00,
  "status": "pending",
  "created_at": "2025-03-19T11:40:12.000Z",
  "updated_at": "2025-03-19T11:40:12.000Z"
}

🔓 GET /api/cartorders/user/:id

Description : Récupère toutes les commandes d'un utilisateur.

Authentification : Requise (view_all_orders_by_user).

Rôles autorisés : admin, user_client (peut voir ses propres commandes).

🔓 GET /api/cartorders/userpro/:id

Description : Récupère toutes les commandes d'un userpro.

Authentification : Requise (view_cart_order).

Rôles autorisés : admin, userpro.

🚫 Routes Sécurisées

🔒 PUT /api/cartorders/:id

Description : Met à jour le statut d'une commande.

Authentification : Requise (update_cart_order).

Rôles autorisés : admin, userpro.

Body :

{
  "status": "paid"
}

Réponse :

{
  "message": "Statut de la commande mis à jour"
}

🔒 DELETE /api/cartorders/:id

Description : Supprime une commande.

Authentification : Requise (delete_cart_order).

Rôles autorisés : admin, user_client (peut supprimer ses propres commandes).

Réponse :

{
  "message": "Commande supprimée avec succès."
}



#########################################################################################################
######                            🧪 RESULTAT TEST LOCAL POUR cart_orders                        ######
#########################################################################################################


npx jest --detectOpenHandles -- __tests__/cartOrders.test.js
  console.log
    🔑 Token Admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTc0MjM4NDYxNCwiZXhwIjoxNzQyMzkxODE0fQ.DhpRlbUtqTHuoYhiJ-30LZrC2vE_bNaObbmT3Y6KDWs

      at Object.log (__tests__/cartOrders.test.js:18:9)

  console.log                                                                                                                                                                             
    🔑 Token UserPro : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VycHJvQGV4YW1wbGUuY29tIiwicm9sZV9pZCI6MiwiaWF0IjoxNzQyMzg0NjE0LCJleHAiOjE3NDIzOTE4MTR9.WHBdP0ddodNDDHvBOeYznQiFGuvhfbyuM6GsmknA0OM

      at Object.log (__tests__/cartOrders.test.js:19:9)

  console.log                                                                                                                                                                             
    🔑 Token UserClient : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyY2xpZW50QGV4YW1wbGUuY29tIiwicm9sZV9pZCI6MywiaWF0IjoxNzQyMzg0NjE0LCJleHAiOjE3NDIzOTE4MTR9.gM0zYNbDkYYfFDQ5S21hAoAB5AAiSS1OUbUTr1n3Jxg

      at Object.log (__tests__/cartOrders.test.js:20:9)

  console.log                                                                                                                                                                             
    🛒 Vérification avant suppression : cartOrderId = undefined

      at log (__tests__/cartOrders.test.js:134:13)

  console.log
    🚀 Server is running on port 3030

      at Server.log (server.js:45:11)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:40:13)

  console.log
    📩 Réponse création commande : { message: 'Commande créée avec succès', orderId: 19 }

      at Object.log (__tests__/cartOrders.test.js:50:19)

  console.error
    🛑 Permission refusée : update_cart_order

      39 |                 const hasPermission = req.user.permissions.includes(requiredPermission);
      40 |                 if (!hasPermission) {
    > 41 |                     console.error(`🛑 Permission refusée : ${requiredPermission}`);
         |                             ^
      42 |                     return res.status(403).json({ error: 'Accès refusé' });
      43 |                 }
      44 |             }

      at error (app/middleware/auth.js:41:29)

  console.error
    🛑 Permission refusée : delete_cart_order

      39 |                 const hasPermission = req.user.permissions.includes(requiredPermission);
      40 |                 if (!hasPermission) {
    > 41 |                     console.error(`🛑 Permission refusée : ${requiredPermission}`);
         |                             ^
      42 |                     return res.status(403).json({ error: 'Accès refusé' });
      43 |                 }
      44 |             }

      at error (app/middleware/auth.js:41:29)

  console.error
    Erreur lors de la vérification du token : JsonWebTokenError {
      name: 'JsonWebTokenError',
      message: 'invalid token'
    }

      23 |         return jwt.verify(token, SECRET);
      24 |     } catch (error) {
    > 25 |         console.error('Erreur lors de la vérification du token :', error);
         |                 ^
      26 |         return null;
      27 |     }
      28 | }

   
  console.log
    🗑 Commande supprimée (id: 19)

      at Object.log (__tests__/cartOrders.test.js:25:17)

  console.log                                                                                                                                                                             
    🔒 Serveur fermé                                                                                                                                                                      

      at Object.log (__tests__/cartOrders.test.js:29:17)

  console.log                                                                                                                                                                             
    🔒 Connexion à la BDD fermée                                                                                                                                                          

      at Object.log (__tests__/cartOrders.test.js:33:17)

 PASS  __tests__/cartOrders.test.js
  🛒 CartOrders API Endpoints
    √ POST /api/cartorders 🔹 Devrait permettre à un user_client de créer une commande (220 ms)                                                                                           
    √ POST /api/cartorders 🔹 Ne doit pas permettre la création sans authentification (401) (17 ms)
    √ GET /api/cartorders 🔹 Un admin peut voir toutes les commandes (200) (23 ms)
    √ GET /api/cartorders 🔹 Un user_client ne peut pas voir toutes les commandes (403) (14 ms)
    √ GET /api/cartorders/:id 🔹 Un admin peut voir une commande spécifique (200) (20 ms)
    √ GET /api/cartorders/:id 🔹 Un user_client ne peut pas voir la commande d’un autre utilisateur (403) (15 ms)
    √ PUT /api/cartorders/:id 🔹 Un admin peut modifier une commande (200) (21 ms)
    √ PUT /api/cartorders/:id 🔹 Un user_client ne peut pas modifier une commande (403) (22 ms)
    √ DELETE /api/cartorders/:id 🔹 Un admin peut supprimer une commande (200) (21 ms)
    √ DELETE /api/cartorders/:id 🔹 Un user_client ne peut pas supprimer une commande d’un autre utilisateur (403) (21 ms)
    √ DELETE /api/cartorders/:id 🔹 Ne doit pas permettre la suppression sans authentification (401) (12 ms)
    √ DELETE /api/cartorders/:id 🔹 Ne doit pas permettre la suppression avec un token invalide (401) (28 ms)
    √ DELETE /api/cartorders/:id 🔹 Ne doit pas permettre la suppression d’une commande inexistante (404) (22 ms)

Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        2.806 s, estimated 3 s
Ran all test suites matching /__tests__\\cartOrders.test.js/i.


#########################################################################################################

🚤 Endpoints pour feedbacks

#########################################################################################################


## 🔁 API - Feedbacks

### 🔓 GET /api/feedbacks
> Récupérer tous les feedbacks
- ✅ Accès : Public
- 🔄 Retour : Liste de tous les feedbacks avec détails (activity_name, user_name, etc.)

---

### 🔓 GET /api/feedbacks/:id
> Récupérer un feedback par son ID
- ✅ Accès : Public
- 🔢 Paramètre : `id` (number)
- 📦 Retour : Un objet `feedback`

---

### 🔓 GET /api/feedbacks/activity/:id
> Récupérer tous les feedbacks liés à une activité
- ✅ Accès : Public
- 🔢 Paramètre : `activity_id`
- 📦 Retour : Liste des feedbacks liés

---

### 🔓 GET /api/feedbacks/user/:id
> Récupérer tous les feedbacks d’un utilisateur
- ✅ Accès : Public
- 🔢 Paramètre : `user_id`
- 📦 Retour : Liste des feedbacks

---

### 🔓 GET /api/feedbacks/things-to-do/:id
> Récupérer les feedbacks d’un `things_to_do`
- ✅ Accès : Public
- 🔢 Paramètre : `things_to_do_id`
- 📦 Retour : Liste des feedbacks

---

### 🔓 GET /api/feedbacks/rating/:rating
> Récupérer les feedbacks selon une note donnée
- ✅ Accès : Public
- 🔢 Paramètre : `rating`
- 📦 Retour : Liste filtrée

---

### 🔒 POST /api/feedbacks
> Ajouter un feedback
- 🔐 Accès : Authentifié (`user_client` ou `admin`)
- 📥 Body :
```json
{
  "activity_id": 1,
  "things_to_do_id": null,
  "rating": 8,
  "comment": "Activité très sympa"
}
📤 Retour : { "id": 321 }
🔒 PUT /api/feedbacks/:id
Modifier un feedback existant

🔐 Accès : Authentifié (user_client ou admin)
🔢 Paramètre : id
📥 Body :
json
Copier
Modifier
{
  "activity_id": 1,
  "things_to_do_id": null,
  "rating": 9,
  "comment": "Mise à jour du commentaire"
}
📤 Retour : { "message": "Feedback modifié" }
🔒 DELETE /api/feedbacks/:id
Supprimer un feedback

🔐 Accès : Authentifié (user_client ou admin)
🔢 Paramètre : id
📤 Retour : { "message": "Feedback supprimé" }

### 🔒 GET /api/stats/feedbacks/activities
> Retourne la note moyenne par activité
- 🔐 Accès : Admin uniquement
- 📦 Retour :
```json
[
  {
    "activity_id": 108,
    "activity_name": "Plongée",
    "average_rating": 4.5
  },
  ...
]
🔒 GET /api/stats/feedbacks/things-to-do
Retourne la note moyenne par things_to_do

🔐 Accès : Admin uniquement
📦 Retour :
json
Copier
Modifier
[
  {
    "things_to_do_id": 5,
    "things_to_do_name": "Balade",
    "average_rating": 3.7
  },
  ...
]

#########################################################################################################
######                            🧪 RESULTAT TEST LOCAL POUR feedbacks                           ######
#########################################################################################################

npx jest __tests__/feedbacks.test.js
  console.log
    🔑 Token Admin : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInJvbGVfaWQiOjEsImlhdCI6MTc0MjU2NDQzOSwiZXhwIjoxNzQyNTcxNjM5fQ.y6wzPYhNPdtRc4zKkogTJAeBwcKn6A4dw7idOFxXLYU

      at Object.log (__tests__/feedbacks.test.js:19:9)

  console.log                                                                                                                                                                             
    🔑 Token UserClient : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjbGllbnRAZXhhbXBsZS5jb20iLCJyb2xlX2lkIjozLCJpYXQiOjE3NDI1NjQ0MzksImV4cCI6MTc0MjU3MTYzOX0.PNjo75PAC_X6KNVRTPiag768aKip-OXbcf8Q1O-r9HU

      at Object.log (__tests__/feedbacks.test.js:20:9)

  console.log                                                                                                                                                                             
    🚀 Server is running on port 3030                                                                                                                                                     

      at Server.log (server.js:45:11)

  console.log
    Connexion réussie ! Résultat : [ { solution: 2 } ]

      at log (database/client.js:40:13)

  console.log
    🔒 Serveur fermé

      at Object.log (__tests__/feedbacks.test.js:77:17)

  console.log                                                                                                                                                                             
    🔒 Connexion à la BDD fermée                                                                                                                                                          

      at Object.log (__tests__/feedbacks.test.js:81:17)

 PASS  __tests__/feedbacks.test.js
  √ POST /api/feedbacks - devrait retourner une erreur 401 si le token est manquant (8 ms)                                                                                                
  √ POST /api/feedbacks - devrait refuser une note > 10 (11 ms)
  📌 Test API UserClient                                                                                                                                                                  
    √ POST /api/feedbacks - devrait ajouter un feedback (53 ms)                                                                                                                           
    √ GET /api/feedbacks - devrait retourner tous les feedbacks (11 ms)                                                                                                                   
    √ GET /api/feedbacks/:id - devrait retourner un feedback par ID (9 ms)                                                                                                                
    √ PUT /api/feedbacks/:id - devrait modifier un feedback (15 ms)                                                                                                                       
    √ DELETE /api/feedbacks/:id - devrait supprimer un feedback (10 ms)
    √ POST /api/feedbacks - admin peut créer un feedback (10 ms)
    √ PUT /api/feedbacks/:id - admin peut modifier un feedback (12 ms)
    √ DELETE /api/feedbacks/:id - admin peut supprimer un feedback (11 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        2.998 s, estimated 3 s
Ran all test suites matching /__tests__\\feedbacks.test.js/i.