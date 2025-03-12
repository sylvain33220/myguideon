/**
 * @file rolePermissions.test.js
 * @description Fichier de test pour l'API RolePermissions de l'application.
 * @module Test API pour RolePermissions - Tests unitaires
 * @description Les tests sont effectués avec Jest et Supertest.
 * @description Avant de lancer les tests, assurez-vous que le serveur est démarré.
 * @description Les tests nécessitent un token valide pour l'authentification.
 * @description Les tests nécessitent une base de données valide.
 * @description Les tests nécessitent un utilisateur Admin et un utilisateur UserPro.
 * @description Les tests nécessitent un rôle Admin et un rôle UserPro.
 * @description Les tests nécessitent une permission valide.
 * @description Les tests nécessitent un rôle valide.
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const request = require('supertest');
const { app, server } = require('../server');
const { pool } = require('../database/client');
const {generateToken} = require('../app/helpers/jwtHelper');

const tokenAdmin = generateToken({ id: 1, email: 'admin@example.com', role_id: 1 });
const tokenUserPro = generateToken({ id: 2, email: 'testuserpro@example.com', role_id: 2 });

jest.setTimeout(60000);

let testAdminId;
let testUserProId;

beforeAll(async () => {
    console.log("🔄 Création des utilisateurs de test...");

    // Création d'un utilisateur Admin de test
    const [adminRes] = await pool.query(
        "INSERT INTO user_admin (name,email, password, role_id) VALUES (?,?, ?, ?)", 
        ['adminTest','admin_test@example.com', 'hashedpassword123', 1]
    );
    testAdminId = adminRes.insertId;

    // Création d'un utilisateur Pro de test
    const [userProRes] = await pool.query(
        "INSERT INTO userpro (name,email, password, role_id) VALUES (?,?, ?, ?)", 
        ['userPro Test','userpro_test@example.com', 'hashedpassword123', 2]
    );
    testUserProId = userProRes.insertId;
});

// 🛠️ Fermer le serveur et la connexion DB après les tests
afterAll(async () => {
    console.log("🗑️ Suppression des utilisateurs de test...");

    if (testAdminId) {
        await pool.query("DELETE FROM user_admin WHERE id = ?", [testAdminId]);
    }

    if (testUserProId) {
        await pool.query("DELETE FROM userpro WHERE id = ?", [testUserProId]);
    }

    if (server) {
        await new Promise(resolve => server.close(resolve));
        console.log('🔒 Serveur fermé');
    }
    if (pool) {
        await pool.end();
        console.log('🔒 Connexion à la BDD fermée');
    }
});

describe('📌 Test API RolePermissions', () => {
    console.log("🟢 Début des tests pour RolePermissions");

   // 🔹 POST /api/role-permissions/assign-role - Attribuer un rôle à un UserPro
   it('POST /api/role-permissions/assign-role-admin - devrait attribuer un rôle à un admin', async () => {
    console.log("🟢 Test POST /api/role-permissions/assign-role-admin");
    const res = await request(app)
        .post('/api/role-permissions/assign-role-admin')
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({ userAdminId: testAdminId, roleId: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('affectedRows');
    });

    // 🔹 POST /api/role-permissions/add-permission - Ajouter une permission à un rôle
    it('POST /api/role-permissions/add-permission - devrait ajouter une permission à un rôle', async () => {
        console.log("🟢 Test POST /api/role-permissions/add-permission");
        const res = await request(app)
            .post('/api/role-permissions/add-permission')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ roleId: 3, permissionId: 6 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
    });
    // 🔹 POST /api/role-permissions/add-new-permission - Ajouter une nouvelle permission
    it('POST /api/role-permissions/add-new-permission - devrait ajouter une nouvelle permission', async () => {
        console.log("🟢 Test POST /api/role-permissions/add-new-permission");
        const res = await request(app)
            .post('/api/role-permissions/add-new-permission')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ name: 'manage_payments', description: 'Gérer les paiements' });
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('permissionId');
    });
    it('POST /api/role-permissions/assign-role - devrait attribuer un rôle à un UserPro', async () => {
        console.log("🟢 Test POST /api/role-permissions/assign-role");
        const res = await request(app)
            .post('/api/role-permissions/assign-role')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ userProId: testUserProId, roleId: 3 });
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
    });

    // 🔹 DELETE /api/role-permissions/remove - Supprimer un rôle ou une permission
    it('DELETE /api/role-permissions/remove-permission - devrait supprimer un rôle', async () => {
        console.log("🟢 Test DELETE /api/role-permissions/remove");
        const res = await request(app)
            .delete('/api/role-permissions/remove-permission')
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ type: 'role', id: 3 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('success', true);
    });
});
