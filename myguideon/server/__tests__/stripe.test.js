/**
 * @file stripe.test.js
 * @description Fichier de test pour l'API Stripe de l'application.
 * @module Test API pour Stripe - Tests unitaires
 * @commentaire Le wehook Stripe est testé avec un payload brut et une signature valide.
 * @commentaire Le webhook Stripe est testé avec un paiement réussi.
 * @description Les tests sont effectués avec Jest et Supertest.
 * @description Avant de lancer les tests, assurez-vous que le serveur est démarré.
 * @description Les tests nécessitent un token valide pour l'authentification.
 * @description Les tests nécessitent une base de données valide.
 * @description Les tests nécessitent un utilisateur Admin et un utilisateur UserPro.
 * @description Les tests nécessitent un rôle Admin et un rôle UserPro.
 * @description Les tests nécessitent une permission valide.
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */

const request = require('supertest');
const { app, server } = require('../server');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');
const { date } = require('joi');

const tokenAdmin = generateToken({ id: 1, email: 'admin@example.com', role_id: 1 });
const tokenUserPro = generateToken({ id: 2, email: 'testuserpro@example.com', role_id: 2 });
const crypto = require('node:crypto');
jest.setTimeout(30000);

console.log("🔑 Token Admin :", tokenAdmin);
console.log("🔑 Token UserPro :", tokenUserPro);

afterAll(async () => {
    if (server) {
        await new Promise(resolve => server.close(resolve));
        console.log('🔒 Serveur fermé');
    }
    if (pool) {
        await pool.end();
        console.log('🔒 Connexion à la BDD fermée');
    }
});

describe('📌 Test API Stripe', () => {
    console.log("🟢 Début des tests pour Stripe");

    // 🔑 GET /api/stripe-key - Vérifier la récupération de la clé publique Stripe
    it('GET /api/stripe-key - devrait retourner la clé publique Stripe', async () => {
        console.log("🟢 Test GET /api/stripe-key");
        const res = await request(app).get('/api/stripe-key');
        console.log("res", res.body);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('publishableKey');
    });

    // 💳 POST /api/stripe/create-checkout-session - Tester la création de session de paiement
    it('POST /api/stripe/create-checkout-session - devrait créer une session Stripe', async () => {
        console.log("🟢 Test POST /api/stripe/create-checkout-session");

        const res = await request(app)
            .post('/api/stripe/create-checkout-session')
            .set('Authorization', `Bearer ${tokenUserPro}`)
            .send({
                items: [
                    { name: 'Produit Test', price: 2000, quantity: 1 }
                ],
                userId: 2
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('sessionId');
    });
    it('🧪 POST /api/stripe/webhook - Simuler un paiement réussi', async () => {
        console.log("🟢 Test POST /api/stripe/webhook");
    
        // Payload brut attendu par Stripe
        const stripeEvent = JSON.stringify({
            type: "checkout.session.completed",
            data: {
                object: {
                    id: "evt_test_123",
                    payment_intent: "pi_test_123",
                    metadata: { orderId: "12345" },
                    status: "succeeded"
                }
            }
        });
    
        // 🔹 Générer un timestamp valide
        const timestamp = Math.floor(Date.now() / 1000);
    
        // 🔹 Simuler une signature Stripe correcte avec timestamp
        const secret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_123';
        const payloadToSign = `${timestamp}.${stripeEvent}`;
        const signature = crypto
            .createHmac('sha256', secret)
            .update(payloadToSign, 'utf8')
            .digest('hex');
    
        // 🔹 Construire le header Stripe-Signature correctement formaté
        const stripeSignatureHeader = `t=${timestamp},v1=${signature}`;
    
        // 🔹 Envoyer la requête avec un body brut et un header Stripe valide
        const res = await request(app)
            .post('/api/stripe/webhook')
            .set('Stripe-Signature', stripeSignatureHeader)
            .set('Content-Type', 'application/json')
            .send(stripeEvent); // ✅ On envoie du JSON brut
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('received', true);
    });

});
