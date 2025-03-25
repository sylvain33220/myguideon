/**
 * @file useradmin.test.js
 * @description Tests unitaires pour l'API userAdmin
 * @module Test API UserAdmin - CRUD et Authentification
 * @requires supertest, path, server, jwtHelper, dotenv
 * @author Sylvain
 * @created 2025-03-25
 */

const request = require('supertest');
const path = require('node:path');
const { server } = require('../server');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');

const tokenAdmin = generateToken({ id: 1, email: 'admin@example.com', role_id: 1 });
const uniqueEmail = `admin${Date.now()}@example.com`;

jest.setTimeout(60000);

afterAll(async () => {
    if (server) await new Promise((resolve) => server.close(resolve));
    if (pool) await pool.end();
});

describe('📌 Test API UserAdmin', () => {
    let createdId;

    it('POST /api/useradmin/add - devrait créer un nouvel administrateur', async () => {
        const res = await request(server)
            .post('/api/useradmin/add')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .field('name', 'Admin Test')
            .field('email', uniqueEmail)
            .field('password', 'password123')
            .attach('profile_image', path.resolve(__dirname, 'test.jpg'));

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdId = res.body.id;
    });

    it('GET /api/useradmin - devrait retourner tous les administrateurs', async () => {
        const res = await request(server)
            .get('/api/useradmin')
            .set('Authorization', `Bearer ${tokenAdmin}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /api/useradmin/:id - devrait retourner un admin par ID', async () => {
        const res = await request(server)
            .get(`/api/useradmin/${createdId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', createdId);
    });

    it('DELETE /api/useradmin/:id - devrait supprimer l admin créé', async () => {
        const res = await request(server)
            .delete(`/api/useradmin/${createdId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toContain('supprimé');
    });

    it('POST /api/useradmin/login - devrait authentifier un admin', async () => {
        const res = await request(server)
            .post('/api/useradmin/login')
            .send({ email: 'admin@example.com', password: 'adminpassword' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('POST /api/useradmin/reset - devrait envoyer un code de reset', async () => {
        const res = await request(server)
            .post('/api/useradmin/reset')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ email: 'admin@example.com' });

        expect(res.status).toBe(200);
        expect(res.body.message).toContain('Code');
    });

    it('PUT /api/useradmin/:id - devrait mettre à jour un admin', async () => {
        const res = await request(server)
            .put(`/api/useradmin/${createdId}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .field('name', 'Admin Modifié')
            .field('password', 'newpassword123')
            .attach('profile_image', path.resolve(__dirname, 'test.jpg'));

        expect(res.status).toBe(200);
        expect(res.body.message).toContain('mis à jour');
    });
});
