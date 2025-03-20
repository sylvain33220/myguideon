const request = require('supertest');
const path = require('node:path');
const { server } = require('../server');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');
const exp = require('node:constants');

// 🔄 Génération des tokens pour les tests
const tokenAdmin = generateToken({ id: 1, email: 'admin@example.com', role_id: 1 });
const tokenUserPro = generateToken({ id: 2, email: 'testuserpro@example.com', role_id: 2 });
let userClientToken = generateToken({ id: 2, email: 'guide@example.com', role_id: 3 });
const invalidToken = "Bearer invalid.token.value";
const uniqueEmail = `testuser${Date.now()}@example.com`;

jest.setTimeout(60000);

console.log("🔑 Token Admin :", tokenAdmin);
console.log("🔑 Token UserPro :", tokenUserPro);
console.log("🔑 Token UserClient :", userClientToken);

afterAll(async () => {
    if (userClientId) {
        await pool.query("DELETE FROM user_client WHERE id = ?", [userClientId]);
        console.log(`🗑 UserClient supprimé (id: ${userClientId})`);
    }
    if (server) {
        await new Promise((resolve) => server.close(resolve));
        console.log('🔒 Serveur fermé');
    }
    if (pool) {
        await pool.end();
        console.log('🔒 Connexion à la BDD fermée');
    }
});

describe('UserClient API Endpoints', () => {
    /** ✅ 1️⃣ Inscription d’un utilisateur client */
    it('POST /api/userclients/register🔹 Devrait créer un user_client avec image', async () => {
        const res = await request(server)
            .post('/api/userclients/register')
            .field('firstname', 'Test')
            .field('lastname', 'Client')
            .field('email', uniqueEmail)
            .field('password', 'password123')
            .field('phone', '0123456789')
            .field('address', '123 Rue Test')
            .field('city', 'TestVille')
            .field('country', 'France')
            .field('postal_code', '75000')
            .field('role_id', 3)
            .attach('profile_image', path.resolve(__dirname, 'test.jpg'));

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toHaveProperty("id");

        userClientId = res.body.user.id;
        userClientToken = res.body.token; 
        registeredEmail = uniqueEmail; // Pour les tests suivants
    });
    

    /** ✅ 2️⃣ Connexion d’un utilisateur client */
    it('POST /api/userclients/login🔹 Devrait connecter un user_client et retourner un token', async () => {
        const res = await request(server)
            .post('/api/userclients/login')
            .send({
                email: uniqueEmail,
                password: "password123"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        userClientToken = res.body.token;
    });

    /** ✅ 3️⃣ Récupérer ses propres infos */
    it('GET 🔹 Devrait récupérer les infos de l’utilisateur authentifié', async () => {
        const res = await request(server)
            .get('/api/userclients/me')
            .set('Authorization', `Bearer ${userClientToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe(registeredEmail);
    });

    /** ✅ 4️⃣ Modifier ses infos */
    it('PUT🔹 Devrait modifier les infos du user_client', async () => {
        const res = await request(server)
            .put('/api/userclients/me/profile')
            .set('Authorization', `Bearer ${userClientToken}`)
            .send({
                firstname: "TestModifié",
                city: "VilleModifiée"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Utilisateur mis à jour");
    });

    /** ✅ 5️⃣ Changer son mot de passe */
    it('PUT🔹 Devrait changer le mot de passe du user_client', async () => {
        const res = await request(server)
            .put('/api/userclients/me/security')
            .set('Authorization', `Bearer ${userClientToken}`)
            .send({
                oldPassword: "password123",
                newPassword: "newpassword456"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Mot de passe mis à jour");
    });
    it('PUT api/userclients/:id🔹 Ne doit pas permettre à un user_client de modifier un autre utilisateur (403)', async () => {
        const res = await request(server)
            .put(`/api/userclients/${userClientId + 1}`) // ID d’un autre utilisateur
            .set('Authorization', `Bearer ${userClientToken}`)
            .send({
                firstname: "HACKER",
                city: "VilleHackée"
            });
            
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty("error", "Accès refusé");
    });

    /** ✅ 6️⃣ Supprimer son compte */
    it('DELETE /api/userclients/delete🔹 Devrait supprimer le compte du user_client', async () => {
        const res = await request(server)
            .delete('/api/userclients/me')
            .set('Authorization', `Bearer ${userClientToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Utilisateur supprimé avec succès.");
    });

    /** ✅ 7️⃣ Vérifier qu’un user_client ne peut pas voir tous les users */
    it('GET /api/userclients🔹 Ne doit pas permettre à un user_client de voir tous les users (403)', async () => {
        const res = await request(server)
            .get('/api/userclients')
            .set('Authorization', `Bearer ${userClientToken}`);

        expect(res.statusCode).toBe(403);
    });

    /** ✅ 8️⃣ Vérifier qu’un user_client ne peut pas voir un autre user */
    it('GET /api/userclients/:id🔹 Ne doit pas permettre à un user_client de voir un autre user (403)', async () => {
        const res = await request(server)
            .get(`/api/userclients/${userClientId + 1}`) // ID d’un autre utilisateur
            .set('Authorization', `Bearer ${userClientToken}`);

        expect(res.statusCode).toBe(403);
    });

    /** ✅ 9️⃣ Vérifier qu’un user_client ne peut pas modifier un autre user */
    it('PUT /api/userclients/:id🔹 Ne doit pas permettre à un user_client de modifier un autre user (403)', async () => {
        const res = await request(server)
            .put(`/api/userclients/${userClientId + 1}`) // ID d’un autre utilisateur
            .set('Authorization', `Bearer ${userClientToken}`)
            .send({
                firstname: "HACKER",
                city: "VilleHackée"
            });

        expect(res.statusCode).toBe(403);
    });

    /** ✅ 🔟 Vérifier qu’un user_client ne peut pas supprimer un autre user */
    it('DELETE /api/userclients/:id🔹 Ne doit pas permettre à un user_client de supprimer un autre user (403)', async () => {
        const res = await request(server)
            .delete(`/api/userclients/${userClientId + 1}`) // ID d’un autre utilisateur
            .set('Authorization', `Bearer ${userClientToken}`);

        expect(res.statusCode).toBe(403);
    });



})