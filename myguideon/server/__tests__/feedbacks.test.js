/**
 * @file  feedbacks.test.js
 * @description  Test API pour les feedbacks
 * @module Test API pour les feedbacks - Tests unitaires
 * @requires Supertest
 * @requires server
 * @requires pool
 * @requires generateToken
 * @requires jwtHelper
 * @requires dotenv
 * @requires path
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const request = require('supertest');
const { server } = require('../server');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');

// 🔄 Génération des tokens pour les tests

const tokenAdmin = generateToken({ id: 1, email: 'admin@example.com', role_id: 1 });
const userToken = generateToken({ id: 2, email: 'client@example.com', role_id: 3 });
const invalidToken = "Bearer invalid.token.value";
const uniqueEmail = `testuser${Date.now()}@example.com`;

jest.setTimeout(60000);

let feedbackId ;
let createdDestinationId;
let createdThingsToDoId;

console.log("🔑 Token Admin :", tokenAdmin);
console.log("🔑 Token UserClient :", userToken);



beforeAll(async () => {
    await pool.query(`
  INSERT INTO user_admin (id, name , email, password, role_id)
  VALUES (1, 'Admin','admin@example.com', 'adminhash', 1)
`);

     // ✅ Création du user client attendu par le token
  await pool.query(
    `INSERT INTO user_client (id, firstname, lastname, email, password, role_id)
     VALUES (2, 'Jean', 'Testeur', 'client@example.com', 'hashed_password', 3)`
  );
    // Création d'une destination au format JSON (aligné avec le code existant)
  const basicInfo = {
    destinationName: "Test City",
    language: "fr",
    budget: "économique",
    currency: "euro",
    status: "active",
    address: "France",
    categories: ["nature"],
    lon: "1.2345",
    lat: "5.6789",
    imgpath: null
  };

  const author = "test_admin";

  const [result] = await pool.query(
    "INSERT INTO destination (basic_info, author) VALUES (?, ?)",
    [JSON.stringify(basicInfo), author]
  );

  createdDestinationId = result.insertId;

  // Création d'un things_to_do lié à cette destination
  const [thingsToDoResult] = await pool.query(`
    INSERT INTO things_to_do 
      (name, adress, destination_id, description, longitude, latitude, icon, gallery, destination_name, category, status)
    VALUES 
      ('Balade test', 'Rue test', ?, 'Découverte sympa', '2.2', '48.8', '📍', '[]', 'Test City', 'nature', 'active')
  `, [createdDestinationId]);

  createdThingsToDoId = thingsToDoResult.insertId;
})

afterAll(async () => {

    await pool.query("DELETE FROM user_admin WHERE id = 1");
    
    await pool.query("DELETE FROM user_client WHERE id = 2");

    if (server) {
        await new Promise((resolve) => server.close(resolve));
        console.log('🔒 Serveur fermé');
    }
    if (pool) {
        await pool.end();
        console.log('🔒 Connexion à la BDD fermée');
    }
});

describe('📌 Test API UserClient', () => {
    it('POST /api/feedbacks - devrait ajouter un feedback', async () => {
        const res = await request(server)
            .post('/api/feedbacks')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                activity_id: null,
                things_to_do_id: createdThingsToDoId,
                rating: 8,
                comment: "Très bonne activité test"
            })
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        feedbackId = res.body.id;
    });
    it ('GET /api/feedbacks - devrait retourner tous les feedbacks', async () => {
        const res = await request(server)
            .get('/api/feedbacks')
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /api/feedbacks/:id - devrait retourner un feedback par ID', async () => {
        expect(feedbackId).toBeDefined();
    
        const res = await request(server)
            .get(`/api/feedbacks/${feedbackId}`);
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', feedbackId); // Assure que c’est bien le bon
    });
    
    
    it('PUT /api/feedbacks/:id - devrait modifier un feedback', async () => {
        expect(feedbackId).toBeDefined();
       const res = await request(server)
            .put(`/api/feedbacks/${feedbackId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                activity_id: 1,
                things_to_do_id: null,
                rating: 9,
                comment: "Mise à jour du commentaire"
            });
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Feedback modifié");
    });
    

    it('DELETE /api/feedbacks/:id - devrait supprimer un feedback', async () => {
        const res = await request(server)
            .delete(`/api/feedbacks/${feedbackId}`)
            .set('Authorization', `Bearer ${userToken}`)
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message","Feedback supprimé");
    });

    it('POST /api/feedbacks - admin peut créer un feedback', async () => {
        const res = await request(server)
          .post('/api/feedbacks')
          .set('Authorization', `Bearer ${tokenAdmin}`)
          .send({
            activity_id: null,
            things_to_do_id: createdThingsToDoId,
            rating: 7,
            comment: "Feedback depuis admin"
          });
    
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        feedbackId = res.body.id;
      });
    
      it('PUT /api/feedbacks/:id - admin peut modifier un feedback', async () => {
        const res = await request(server)
          .put(`/api/feedbacks/${feedbackId}`)
          .set('Authorization', `Bearer ${tokenAdmin}`)
          .send({
            activity_id: null,
            things_to_do_id: createdThingsToDoId,
            rating: 10,
            comment: "Commentaire modifié par admin"
          });
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Feedback modifié');
      });
    
      it('DELETE /api/feedbacks/:id - admin peut supprimer un feedback', async () => {
        const res = await request(server)
          .delete(`/api/feedbacks/${feedbackId}`)
          .set('Authorization', `Bearer ${tokenAdmin}`);
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Feedback supprimé');
      });
    });

    /*************TEST SECURITE************************************************** */
    it('POST /api/feedbacks - devrait retourner une erreur 401 si le token est manquant', async () => {
        const res = await request(server)
            .post('/api/feedbacks')
            .send({
                activity_id: 1,
                things_to_do_id: null,
                user_id: 10,
                rating: 8,
                comment: "Devrait"
            })
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
    it('POST /api/feedbacks - devrait refuser une note > 10', async () => {
        const res = await request(server)
            .post('/api/feedbacks')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                activity_id: null,
                things_to_do_id: createdThingsToDoId,
                rating: 15,
                comment: "Note trop élevée"
            });
    
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    
   
    /******************************************************************************* */
