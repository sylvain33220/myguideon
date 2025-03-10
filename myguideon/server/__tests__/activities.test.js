/**
 * @file activities.test.js
 * @description Tests pour les activités
 * @module Tests API Activities - Tests unitaires
 * @requires supertest
 * @requires path
 * @requires server
 * @requires pool
 * @requires generateToken
 * @requires jwtHelper
 * @requires __tests__/assets/test-image.jpg
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

jest.setTimeout(20000);  // Augmente le timeout pour éviter les erreurs de timeout

// 🔑 Tokens pour les tests
const tokenAdmin = generateToken({ id: 1, email: 'admin@example.com', role_id: 1 });
const tokenGuide = generateToken({ id: 2, email: 'guide@example.com', role_id: 2 });
const invalidToken = "Bearer invalid.token.value";

afterAll(async () => {
    server.close();
    await pool.end();
});

describe('📌 Test API Activities', () => {
    // 🔓 Route publique
    it('GET /api/activities - devrait retourner toutes les activités', async () => {
        const res = await request(server).get('/api/activities');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // 🔓 Route publique par ID
    it('GET /api/activities/:id - devrait retourner une activité avec ses images', async () => {
        const res = await request(server).get('/api/activities/40');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id');
    });

    // 🟢 Route sécurisée - POST avec token et permissions
    it('POST /api/activities - devrait ajouter une nouvelle activité avec token valide', async () => {
        const res = await request(server)
            .post('/api/activities')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .field('name', 'nouvelle activité')
            .field('description', 'Description test')
            .field('price', 100)
            .field('currency', 'USD')
            .field('location', 'france')
            .field('duration', 24)
            .field('created_by', 1)
            .attach('imageCover', path.resolve('__tests__/assets/test-image.jpg'));
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    // 🟢 Route sécurisée - PUT avec token et permissions
    it('PUT /api/activities/:id - devrait mettre à jour une activité avec token valide', async () => {
        const res = await request(server)
            .put('/api/activities/40')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .field('name', 'Updated Activity')
            .field('location', 'france')
            .field('price', 150)
            .field('description', 'Updated Description')
            .field('currency', 'USD')
            .field('created_by', 1)
            .attach('imageCover', path.resolve('__tests__/assets/test-image.jpg'));
        expect(res.status).toBe(200);
        expect(res.body.message).toContain('mise à jour');
    });

    // 🟢 Route sécurisée - DELETE avec token et permissions
    it('DELETE /api/activities/:id - devrait supprimer une activité avec token valide', async () => {
        const res = await request(server)
            .delete('/api/activities/40')
            .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Activité supprimée avec succès.');
    });

    // ❌ Sans token
    it('POST /api/activities - devrait échouer sans token', async () => {
        const res = await request(server)
            .post('/api/activities')
            .field('name', 'nouvelle activité')
            .field('location', 'france')
            .field('description', 'Description test')
            .field('price', 100)
            .field('currency', 'USD')
            .field('created_by', 1);
        expect(res.status).toBe(401);  // Unauthorized
    });

    // ❌ Token invalide
    it('POST /api/activities - devrait échouer avec token invalide', async () => {
        const res = await request(server)
            .post('/api/activities')
            .set('Authorization', invalidToken)
            .field('name', 'nouvelle activité')
            .field('location', 'france')
            .field('description', 'Description test')
            .field('price', 100)
            .field('currency', 'USD')
            .field('created_by', 1);
        expect(res.status).toBe(401);  // Unauthorized
    });

    // ❌ Token valide mais sans permissions
    it('POST /api/activities - devrait échouer sans permissions', async () => {
        const res = await request(server)
            .post('/api/activities')
            .set('Authorization', `Bearer ${tokenGuide}`)
            .field('name', 'nouvelle activité')
            .field('location', 'france')
            .field('description', 'Description test')
            .field('price', 100)
            .field('currency', 'USD')
            .field('created_by', 2);
        expect(res.status).toBe(403);  // Forbidden
    });
});




// const request = require('supertest');
// const {server} = require('../server');  // 🚨 Importer server et non app !
// const { pool } = require('../database/client');
// const path = require('node:path');

// afterAll(async () => {
//     server.close();          // 🚨 Ferme le serveur proprement
//     await pool.end();        // 🚨 Ferme la connexion MySQL proprement    
// });
// it('POST /api/activities - devrait ajouter...', async () => {}, 30000); 
// it('PUT /api/activities/:id - devrait mettre à jour...', async () => {}, 30000);

// describe('📌 Test API Activities', () => {
//     it('GET /api/activities - devrait retourner toutes les activités', async () => {
//         const res = await request(server).get('/api/activities');  // 🚨 Utiliser server et non app
//         expect(res.status).toBe(200);
//         expect(res.body).toBeInstanceOf(Array);
//         expect(res.body[0]).toHaveProperty('images'); // Vérifier que `images` existe
//     });

//     it('GET /api/activities/:id - devrait retourner une activité avec ses images', async () => {
//         const res = await request(server).get('/api/activities/27');  // 🚨 Utiliser server et non app
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty('id');
//         expect(res.body).toHaveProperty('images');
//     });

//     it('POST /api/activities - devrait ajouter une nouvelle activité avec images', async () => {
//         const res = await request(server)
//             .post('/api/activities')
//             .field('name', 'Test Activity')
//             .field('description', 'Test Description')
//             .field('price', 100)
//             .field('currency', 'USD')  
//             .field('location', 'Paris') 
//             .field('language', 'English') 
//             .field('latitude', 48.8566)   
//             .field('longitude', 2.3522)   
//             .field('duration', 120)       
//             .field('max_participants', 20) 
//             .field('category', 'Aventure') 
//             .field('status', 'Published')  
//             .field('created_by', 1)        
//             .attach('imageCover', path.resolve('__tests__/assets/test-image.jpg'));
    
//         expect(res.status).toBe(201);
//         expect(res.body).toHaveProperty('id');
//         expect(res.body).toHaveProperty('name', 'Test Activity');
//     });

//     it('PUT /api/activities/:id - devrait mettre à jour une activité avec images', async () => {
//         const res = await request(server)
//             .put('/api/activities/27')
//             .field('name', 'Updated Activity')
//             .field('description', 'Updated Description')
//             .field('price', 150)  
//             .field('currency', 'USD')
//             .field('location', 'Paris')
//             .field('language', 'English')
//             .field('latitude', 48.8566)
//             .field('longitude', 2.3522)
//             .field('duration', 120)
//             .field('max_participants', 20)
//             .field('category', 'Aventure')
//             .field('status', 'Published')
//             .field('created_by', 1)
//             .attach('imageCover', path.resolve('__tests__/assets/test-image.jpg'));
    
//         expect(res.status).toBe(200);
//         expect(res.body.message).toContain("mise à jour");
//     });
    
    

//     it('DELETE /api/activities/:id - devrait supprimer une activité', async () => {
//         const res = await request(server).delete('/api/activities/27');
//         expect(res.status).toBe(200);
//         expect(res.body.message).toBe('Activité supprimée avec succès.');
//     });
// });
