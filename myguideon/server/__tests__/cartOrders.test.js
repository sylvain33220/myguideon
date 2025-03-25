/**
 * @file cartOrders.test.js
 * @description  Test API pour les commandes
 * @module Test  API pour les commandes - Tests unitaires
 * @requires supertest
 * @requires path
 * @requires server
 * @requires pool
 * @requires generateToken
 * @requires jwtHelper
 * @requires dotenv
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const request = require('supertest');
const path = require('node:path');
const { server } = require('../server');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');


// 🔄 Génération des tokens pour les tests
const tokenAdmin = generateToken({ id: 1, email: 'admin@example.com', role_id: 1 });
const tokenUserPro = generateToken({ id: 2, email: 'userpro@example.com', role_id: 2 });
const userClientToken = generateToken({ id: 4, email: 'userclient@example.com', role_id: 3 });
const invalidToken = "Bearer invalid.token.value";
let cartOrderId;

jest.setTimeout(60000);

console.log("🔑 Token Admin :", tokenAdmin);
console.log("🔑 Token UserPro :", tokenUserPro);
console.log("🔑 Token UserClient :", userClientToken);

afterAll(async () => {
    // if (cartOrderId) {
    //     await pool.query("DELETE FROM cart_orders WHERE id = ?", [cartOrderId]);
    //     console.log(`🗑 Commande supprimée (id: ${cartOrderId})`);
    // }
    if (server) {
        await new Promise((resolve) => server.close(resolve));
        console.log('🔒 Serveur fermé');
    }
    if (pool) {
        await pool.end();
        console.log('🔒 Connexion à la BDD fermée');
    }
});

describe('🛒 CartOrders API Endpoints', () => {

     /** ✅ 1️⃣ Créer une commande **/
     it('POST /api/cartorders 🔹 Devrait permettre à un user_client de créer une commande', async () => {
      const res = await request(server)
          .post('/api/cartorders')
          .set('Authorization', `Bearer ${userClientToken}`)
          .send({
            userID: 4,
            totalAmount: 50.00,
            status: "pending",
            quantity: 2
          })
          console.log("📩 Réponse création commande :", res.body);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('orderId');
      cartOrderId = res.body.orderId;
    });

    it('POST /api/cartorders 🔹 Ne doit pas permettre la création sans authentification (401)', async () => {
        const res = await request(server)
            .post('/api/cartorders')
            .send({ product_id: 1, quantity: 2, total_amount: 50 });
        
        expect(res.statusCode).toBe(401);
    });

    
    /** ✅ 2️⃣ Récupérer toutes les commandes **/
    it('GET /api/cartorders 🔹 Un admin peut voir toutes les commandes (200)', async () => {
        const res = await request(server)
            .get('/api/cartorders')
            .set('Authorization', `Bearer ${tokenAdmin}`);
        
        expect(res.statusCode).toBe(200);
    });

    it('GET /api/cartorders 🔹 Un user_client ne peut pas voir toutes les commandes (403)', async () => {
        const res = await request(server)
            .get('/api/cartorders')
            .set('Authorization', `Bearer ${userClientToken}`);
        
        expect(res.statusCode).toBe(403);
    });

    /** ✅ 3️⃣ Récupérer une commande spécifique **/
    it('GET /api/cartorders/:id 🔹 Un admin peut voir une commande spécifique (200)', async () => {
        const res = await request(server)
            .get(`/api/cartorders/${cartOrderId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`);
        
        expect(res.statusCode).toBe(200);
    });

    it('GET /api/cartorders/:id 🔹 Un user_client ne peut pas voir la commande d’un autre utilisateur (403)', async () => {
        const res = await request(server)
            .get(`/api/cartorders/${cartOrderId + 1}`)
            .set('Authorization', `Bearer ${userClientToken}`);
        
        expect(res.statusCode).toBe(403);
    });

    /** ✅ 4️⃣ Modifier une commande **/
    it('PUT /api/cartorders/:id 🔹 Un admin peut modifier une commande (200)', async () => {
        const res = await request(server)
            .put(`/api/cartorders/${cartOrderId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ status: "paid" });
        
        expect(res.statusCode).toBe(200);
    });

    it('PUT /api/cartorders/:id 🔹 Un user_client ne peut pas modifier une commande (403)', async () => {
        const res = await request(server)
            .put(`/api/cartorders/${cartOrderId}`)
            .set('Authorization', `Bearer ${userClientToken}`)
            .send({ status: "paid" });
        
        expect(res.statusCode).toBe(403);
    });

    /** ✅ 5️⃣ Supprimer une commande **/
    it('DELETE /api/cartorders/:id 🔹 Un admin peut supprimer une commande (200)', async () => {
        const res = await request(server)
            .delete(`/api/cartorders/${cartOrderId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`);
        
        expect(res.statusCode).toBe(200);
    });

    it('DELETE /api/cartorders/:id 🔹 Un user_client ne peut pas supprimer une commande d’un autre utilisateur (403)', async () => {
        const res = await request(server)
            .delete(`/api/cartorders/${cartOrderId + 1}`)
            .set('Authorization', `Bearer ${userClientToken}`);
        
        expect(res.statusCode).toBe(403);
    });
    console.log("🛒 Vérification avant suppression : cartOrderId =", cartOrderId);
    

    it('DELETE /api/cartorders/:id 🔹 Ne doit pas permettre la suppression sans authentification (401)', async () => {
        const res = await request(server)
            .delete(`/api/cartorders/${cartOrderId}`);
        
        expect(res.statusCode).toBe(401);
    });

    it('DELETE /api/cartorders/:id 🔹 Ne doit pas permettre la suppression avec un token invalide (401)', async () => {
        const res = await request(server)
            .delete(`/api/cartorders/${cartOrderId}`)
            .set('Authorization', invalidToken);
        
        expect(res.statusCode).toBe(401);
    });

    it('DELETE /api/cartorders/:id 🔹 Ne doit pas permettre la suppression d’une commande inexistante (404)', async () => {
        const res = await request(server)
            .delete('/api/cartorders/999999')
            .set('Authorization', `Bearer ${tokenAdmin}`);
        
        expect(res.statusCode).toBe(404);
    });
});