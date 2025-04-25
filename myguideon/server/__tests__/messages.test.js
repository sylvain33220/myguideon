const request = require('supertest');
const path = require('node:path');
const { server } = require('../server');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');

jest.setTimeout(20000);

// 🔑 Utilisateurs existants en BDD :
const clientId = 5;  // ID d’un user_client existant
const proId = 1;     // ID d’un userpro existant

// 🔑 Tokens
const tokenClient = generateToken({ id: clientId, email: 'client@example.com', role_id: 1 });
const tokenPro = generateToken({ id: proId, email: 'pro@example.com', role_id: 2 });
const invalidToken = "Bearer invalid.token.value";
console.log("🔑 Token Client :", tokenClient);
console.log("🔑 Token Pro :", tokenPro);

let messageId; // ID du message créé lors du test

afterAll(async () => {
    server.close();
    await pool.end();
});

describe('📩 Test API Messages', () => {
    // 🟢 POST - Envoyer un message texte
    it('POST /api/messages - devrait envoyer un message texte avec token client', async () => {
        const res = await request(server)
            .post('/api/messages')
            .set('Authorization', `Bearer ${tokenClient}`)
            .field('sender_id', clientId)
            .field('sender_type', 'user_client')
            .field('receiver_id', proId)
            .field('receiver_type', 'userpro')
            .field('content', 'Hello le pro !');

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    // 🟢 POST - Envoyer un message avec image
    it('POST /api/messages - devrait envoyer un message avec image', async () => {
        const res = await request(server)
            .post('/api/messages')
            .set('Authorization', `Bearer ${tokenClient}`)
            .field('sender_id', clientId)
            .field('sender_type', 'user_client')
            .field('receiver_id', proId)
            .field('receiver_type', 'userpro')
            .attach('media_url', path.resolve('__tests__/assets/test-image.jpg'));

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    // ❌ POST - Sans token
    it('POST /api/messages - devrait échouer sans token', async () => {
        const res = await request(server)
            .post('/api/messages')
            .field('sender_id', 5)
            .field('sender_type', 'user_client')
            .field('receiver_id', 6)
            .field('receiver_type', 'userpro')
            .field('content', 'Message sans token');

        expect(res.status).toBe(401); // Unauthorized
    });

    // ❌ POST - Token invalide
    it('POST /api/messages - devrait échouer avec token invalide', async () => {
        const res = await request(server)
            .post('/api/messages')
            .set('Authorization', invalidToken)
            .field('sender_id', 5)
            .field('sender_type', 'user_client')
            .field('receiver_id', 6)
            .field('receiver_type', 'userpro')
            .field('content', 'Message avec token invalide');

        expect(res.status).toBe(401); // Unauthorized
    });

    // 🟢 GET conversation - Récupérer les messages entre deux users
    it('GET /api/messages/conversation/5/6 - devrait récupérer la conversation', async () => {
        const res = await request(server).get('/api/messages/conversation/5/6');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
     /** 🟢 On capture l’ID du premier message pour la suite */
     it('POST /api/messages - capture l’ID du message pour tests suivants', async () => {
        const res = await request(server)
            .post('/api/messages')
            .set('Authorization', `Bearer ${tokenClient}`)
            .field('sender_id', clientId)
            .field('sender_type', 'user_client')
            .field('receiver_id', proId)
            .field('receiver_type', 'userpro')
            .field('content', 'Message pour tests suivants');

        expect(res.status).toBe(201);
        messageId = res.body.id;
    });

    /** 🟢 PATCH - Marquer comme lu */
    it('PATCH /api/messages/markAsRead/:messageId - devrait marquer le message comme lu', async () => {
        const res = await request(server)
            .patch(`/api/messages/markAsRead/${messageId}`) 
            .set('Authorization', `Bearer ${tokenPro}`);  // Le pro lit le message
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
    });

    /** 🟢 GET - Récupérer le message par ID */
    it('GET /api/messages/:id - devrait récupérer le message par ID', async () => {
        const res = await request(server)
            .get(`/api/messages/${messageId}`)
            .set('Authorization', `Bearer ${tokenClient}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', messageId);
    });

    /** 🟢 DELETE - Supprimer le message */
    it('DELETE /api/messages/:id - devrait supprimer le message', async () => {
        const res = await request(server)
            .delete(`/api/messages/${messageId}`)
            .set('Authorization', `Bearer ${tokenClient}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message');
    });
});
