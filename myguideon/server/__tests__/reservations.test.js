/**
 * @file reservations.test.js
 * @description Test API pour les réservations
 * @module Test API pour les réservations - Tests unitaires
 * @description Les tests sont effectués avec Jest et Supertest.
 * @description Avant de lancer les tests, assurez-vous que le serveur est démarré.
 * @description Les tests nécessitent un token valide pour l'authentification.
 * @description Les tests nécessitent une base de données valide.
 * @description Les tests nécessitent une réservation valide.
 * @description Les tests nécessitent une activité valide.
 * @description Les tests nécessitent un utilisateur Admin et un utilisateur UserPro.
 * @description Les tests nécessitent un rôle Admin et un rôle UserPro.
 * @description Les tests nécessitent une permission valide.
 * @requires supertest
 * @requires server
 * @requires pool
 * @requires generateToken
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */


const request = require('supertest');
const {app, server} = require('../server');
const jwt = require('jsonwebtoken');
const { pool } = require('../database/client');
// const config = require('../config');
const { generateToken } = require('../app/helpers/jwtHelper');
const { date } = require('joi');
// 🛡️ Génération des tokens
const adminToken = generateToken({ id: 1,email: 'admin@example.com',  role_id: 1 });
const userProToken = generateToken({ id: 2, email: 'testuserpro@example.com', role_id: 2 });

let createdReservationId;

jest.setTimeout(30000);

console.log("🔑 Token Admin :", adminToken);
console.log("🔑 Token UserPro :", userProToken);


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


describe('📌 Test API Reservations', () => {
    beforeAll(() => {
        console.log('🟢 Début des tests pour Reservations');
    });

    afterAll(async () => {
        console.log('🔒 Serveur fermé');
        server.close();
    });

    /************* Test GET /api/reservations (All Reservations) *************/
    it('GET /api/reservations - devrait retourner toutes les réservations', async () => {
        const res = await request(server)
            .get('/api/reservations')
            .set('Authorization', `Bearer ${adminToken}`);
        
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    /************* Test POST /api/reservations (Add Reservation) *************/
    it('POST /api/reservations - devrait ajouter une réservation', async () => {
        const res = await request(server)
            .post('/api/reservations')
            .set('Authorization', `Bearer ${userProToken}`)
            .send({
                activity_id: 11,
                date: '2025-03-15',
                total_amount: 150,
                status: 'pending'
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdReservationId = res.body.id; // 🔄 Sauvegarde l'ID pour les tests suivants
    });

    /************* Test GET /api/reservations/:id (Single Reservation) *************/
    it('GET /api/reservations/:id - devrait retourner une réservation par ID', async () => {
        const res = await request(server)
            .get(`/api/reservations/${createdReservationId}`)
            .set('Authorization', `Bearer ${userProToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', createdReservationId);
    });

    /************* Test PUT /api/reservations/:id (Update Reservation) *************/
    it('PUT /api/reservations/:id - devrait mettre à jour une réservation', async () => {
        const res = await request(server)
            .put(`/api/reservations/${createdReservationId}`)
            .set('Authorization', `Bearer ${userProToken}`)
            .send({
                activity_id: 11,
                date: '2025-03-15',
                total_amount: 200,
                status: 'confirmed'
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Réservation mise à jour avec succès');
    });
    it('GET /api/activity/:activity_id - devrait retourner les réservations par ID d\'activité', async () => {
        const res = await request(server)
            .get('/api/reservations/activity/11')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    /************* Test DELETE /api/reservations/:id (Delete Reservation) *************/
    it('DELETE /api/reservations/:id - devrait supprimer une réservation', async () => {
        const res = await request(server)
            .delete(`/api/reservations/${createdReservationId}`)
            .set('Authorization', `Bearer ${userProToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Réservation supprimée avec succès');
    });

    /************* Test DELETE /api/reservations/:id (Delete Non-Existent) *************/
    it('DELETE /api/reservations/:id - ne devrait pas supprimer une réservation inexistante', async () => {
        const res = await request(server)
            .delete("/api/reservations/9999")
            .set('Authorization', `Bearer ${userProToken}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Réservation non trouvée');
    });
});
