/**
 * @file stats.test.js
 * @description Test API pour les statistiques
 * @module Test API pour les statistiques - Tests unitaires
 * @requires supertest
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
const {app} = require('../server');
const jwt = require('jsonwebtoken');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');
require('dotenv').config();

const adminToken = generateToken(
  { id: 1, email: 'admin@example.com', role_id: 1 },
 
);

const userProToken = generateToken(
  { id: 2, email: 'testuserpro@example.com', role_id: 2 },

);
console.log("🔑 Token Admin :", adminToken);
console.log("🔑 Token UserPro :", userProToken);

jest.setTimeout(60000);

let server;


beforeAll(async() => {
    console.log('🟢 Début des tests pour Stats');
    // 🔄 Vérifier les IDs existants dans la BDD
    // const [rows] = await pool.query("SELECT id FROM activities");
    // console.log('🔍 IDs existants dans la table activities:', rows);
    // const [rows2] = await pool.query("SELECT id FROM reservations");
    // console.log('🔍 IDs existants dans la table reservations:', rows2);
    // const [rows3] = await pool.query("SELECT id FROM feedbacks");
    // console.log('🔍 IDs existants dans la table feedbacks:', rows3);
    // const [autoInc] = await pool.query(`SHOW TABLE STATUS LIKE 'activities'`);
    // console.log('🔍 Auto-incrémentation actuelle:', autoInc[0].Auto_increment);
    server = app.listen(0, () => console.log(`🚀 Server is running on port ${server.address().port}`));


    // 🔄 Désactiver les contraintes de clé étrangère pour le TRUNCATE
    await pool.query("SET FOREIGN_KEY_CHECKS = 0");
    await pool.query("TRUNCATE TABLE activities");
    await pool.query("TRUNCATE TABLE reservations");
    await pool.query("TRUNCATE TABLE feedbacks");

    // 🔄 Réinitialiser l'auto-incrémentation pour chaque table
    await pool.query("ALTER TABLE activities AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE reservations AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE feedbacks AUTO_INCREMENT = 1");

    await pool.query("SET FOREIGN_KEY_CHECKS = 1");

    // 🔄 Insérer des données de test
    await pool.query(`
        INSERT INTO activities (id, name, description, price, currency, location, created_by) VALUES
        (108, 'Plongée', 'Plongée sous-marine', 120, 'USD', 'Marseille', 1),
        (109, 'Yoga', 'Séance de yoga', 50, 'USD', 'Paris', 1);

        INSERT INTO reservations (id, activity_id, date, total_amount, status, created_at, updated_at) VALUES
        (208, 108, '2025-03-10', 120, 'confirmed', NOW(), NOW()),
        (209, 109, '2025-03-11', 50, 'confirmed', NOW(), NOW());

        INSERT INTO feedbacks (id, activity_id, user_id, rating, comment, created_at) VALUES
        (310, 108, 1, 5, 'Super activité!', NOW()),
        (311, 108, 2, 4, 'Très bien', NOW()),
        (312, 109, 3, 3, 'Pas mal', NOW());
    `);

    console.log('🔄 Insertion des données terminée');
});

afterAll(async() => {
      // Supprimer les données de test
      await pool.query(`
      DELETE FROM feedbacks WHERE id IN (301, 302, 303);
      DELETE FROM reservations WHERE id IN (201, 202);
      DELETE FROM activities WHERE id IN (101, 102);
  `);

    if (server) {
        await new Promise((resolve) => server.close(resolve));
        console.log('🔒 Serveur fermé');
    }

    if (pool) {
        await pool.end();
        console.log('🔒 Connexion à la BDD fermée');
    }
    

    console.log('🔄 Suppression des données terminée');
    console.log('🔴 Fin des tests pour Stats');
});
describe('📊 Test API Stats', () => {



    /************* Test GET /api/stats/activities *************/
    it('GET /api/stats/activities - devrait retourner les stats des activités', async () => {
        console.log("debut du get 1")
        const res = await request(server)
            .get('/api/stats/activities')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        console.log('📊 Stats Activités:', res.body);
    });

    /************* Test GET /api/stats/revenue *************/
    it('GET /api/stats/revenue - devrait retourner les stats de revenus', async () => {
        console.log("debut du get 2")
        const res = await request(server)
            .get('/api/stats/revenue')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        console.log('💰 Stats Revenus:', res.body);
    });

    /************* Test GET /api/stats/ratings *************/
    it('GET /api/stats/ratings - devrait retourner les stats des notes', async () => {
        console.log("debut du get 3")
        const res = await request(server)
            .get('/api/stats/ratings')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        console.log('⭐ Stats Notes:', res.body);
    });

    /************* Test GET /api/stats/revenue sans token *************/
    it('GET /api/stats/revenue - ne devrait pas autoriser sans token', async () => {
        console.log("debut du get 4")
        const res = await request(server)
            .get('/api/stats/revenue');

        expect(res.status).toBe(401);
        console.log('🚫 Accès refusé sans token:', res.body);
    });

    /************* Test GET /api/stats/ratings avec token invalide *************/
    it('GET /api/stats/ratings - ne devrait pas autoriser avec token invalide', async () => {
        console.log("debut du get 5")
        const res = await request(server)
            .get('/api/stats/ratings')
            .set('Authorization', "Bearer token_invalide");

        expect(res.status).toBe(401);
        console.log('🚫 Accès refusé avec token invalide:', res.body);
    });
});
