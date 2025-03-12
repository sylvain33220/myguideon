/**
 * @file availability.test.js
 * @description Test API pour les disponibilités des activités
 * @module Test API pour les disponibilités des activités - Tests unitaires
 * @requires supertest
 * @requires path
 * @requires server
 * @requires pool
 * @requires generateToken
 * @requires jwtHelper
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */

/**
 * 📌 NOTE :
 * - Les tests doivent être lancés DEUX FOIS pour que l'entrée initiale en base de données soit prise en compte.
 * - On investiguera la cause de ce comportement plus tard.
 */

const request = require('supertest');
const path = require('node:path');
const { app ,server } = require('../server');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');


const tokenAdmin = generateToken({ id: 1, email: 'admin@example.com', role_id: 1 });
const tokenUserPro = generateToken({ id: 2, email: 'testuserpro@example.com', role_id: 2 });

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

describe('📌 Test API Availabilities', () => {
    console.log("🟢 Début des tests pour Availabilities");
      // 🔒 POST /api/availabilities - Ajouter une disponibilité
      it('POST /api/availabilities - devrait ajouter une disponibilité', async () => {
        console.log("🟢 Test POST /api/availabilities - devrait ajouter une disponibilité");
        const res = await request(server)
            .post('/api/availabilities')
            .set('Authorization', `Bearer ${tokenUserPro}`)
            .send({
                activity_id: 11,
                date: '2025-03-10',
                start_time: '10:00:00',
                end_time: '12:00:00',
                max_participants: 20
            });
            const [rows] = await pool.query('SELECT * FROM availabilities');
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdAvailabilityId = res.body.id;  // 🔄 On garde l'ID pour les prochains tests
    });

    // 🛑 POST /api/availabilities - Ne devrait pas ajouter de chevauchement
    console.log("🛑 Test POST /api/availabilities - Ne devrait pas ajouter une disponibilité chevauchante");
    it('POST /api/availabilities - ne devrait pas ajouter une disponibilité chevauchante', async () => {
        const res = await request(server)
            .post('/api/availabilities')
            .set('Authorization', `Bearer ${tokenUserPro}`)
            .send({
                activity_id: 11,
                date: '2025-03-10',
                start_time: '11:00:00',
                end_time: '13:00:00',
                max_participants: 20
            });
            const [rows] = await pool.query('SELECT * FROM availabilities');
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Les disponibilités se chevauchent');
    });

    // 🟢 GET /api/availabilities - Récupérer toutes les disponibilités
    console.log("🟢 Test GET /api/availabilities - devrait retourner toutes les disponibilités");
    it('GET /api/availabilities - devrait retourner toutes les disponibilités', async () => {
        const res = await request(server).get('/api/availabilities');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // 🟢 GET /api/availabilities/:id - Récupérer les disponibilités par activité
    console.log("🟢 Test GET /api/availabilities/:id - devrait retourner les disponibilités par ID d'activité");
    it('GET /api/availabilities/:id - devrait retourner les disponibilités par ID d\'activité', async () => {
        const res = await request(server).get('/api/availabilities/1');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // 🔄 PUT /api/availabilities/:id - Mettre à jour une disponibilité
    console.log("🔄 Test PUT /api/availabilities/:id - devrait mettre à jour une disponibilité");
    it('PUT /api/availabilities/:id - devrait mettre à jour une disponibilité', async () => {
        const res = await request(server)
            .put(`/api/availabilities/${createdAvailabilityId}`)
            .set('Authorization', `Bearer ${tokenUserPro}`)
            .send({
                date: '2025-03-11',
                start_time: '14:00:00',
                end_time: '16:00:00',
                max_participants: 25
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Disponibilité mise à jour avec succès');
    });

    // 🛑 PUT /api/availabilities/:id - Ne devrait pas mettre à jour si chevauchement
    console.log("🛑 Test PUT /api/availabilities/:id - Ne devrait pas mettre à jour avec chevauchement");
    it('PUT /api/availabilities/:id - ne devrait pas mettre à jour avec chevauchement', async () => {
        const res = await request(server)
            .put(`/api/availabilities/${createdAvailabilityId}`)
            .set('Authorization', `Bearer ${tokenUserPro}`)
            .send({
                date: '2025-03-10',
                start_time: '11:00:00',
                end_time: '13:00:00',
                max_participants: 25
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Les disponibilités se chevauchent');
    });

    // 🗑️ DELETE /api/availabilities/:id - Supprimer une disponibilité
    console.log("🗑️ Test DELETE /api/availabilities/:id - devrait supprimer une disponibilité");
    it('DELETE /api/availabilities/:id - devrait supprimer une disponibilité', async () => {
        const res = await request(server)
            .delete(`/api/availabilities/${createdAvailabilityId}`)
            .set('Authorization', `Bearer ${tokenUserPro}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Disponibilité supprimée avec succès');
    });

    // 🛑 DELETE /api/availabilities/:id - Ne devrait pas supprimer une disponibilité inexistante
    console.log("🛑 Test DELETE /api/availabilities/:id - Ne devrait pas supprimer une disponibilité inexistante");
    it('DELETE /api/availabilities/:id - ne devrait pas supprimer une disponibilité inexistante', async () => {
        const res = await request(server)
            .delete("/api/availabilities/999999")
            .set('Authorization', `Bearer ${tokenUserPro}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Disponibilité non trouvée');
    });
});
