const request = require('supertest');
const { server } = require('../server');
const path = require('node:path');
const { pool } = require('../database/client');
const { generateToken } = require('../app/helpers/jwtHelper');

// 🔄 Génération des tokens pour les tests
const userProToken = generateToken({
    id: 2,
    email: "userpro@example.com",
    role_id: 2,
    is_verified: 1,
  });
  

  let createdId;
  
  beforeAll(async () => {
    const basicInfo = {
      destinationName: "Testville",
      language: "fr",
      budget: "économique",
      currency: "euro",
      status: "active",
      address: "France",
      categories: ["nature"],
      lon: "1.2345",
      lat: "5.6789",
      imgpath: null,
    };
  
    const author = "test_admin";
  
    const [result] = await pool.query(
      "INSERT INTO destination (basic_info, author) VALUES (?, ?)",
      [JSON.stringify(basicInfo), author]
    );
  
    // Stocke l'id pour clean après
    createdDestinationId = result.insertId;
  });
  
  afterAll(async () => {
    if(createdDestinationId) {
        await pool.query("DELETE FROM destination WHERE id = ?", [createdDestinationId]);
    }
    if (createdId) {
      await pool.query("DELETE FROM things_to_do WHERE id = ?", [createdId]);
      await pool.query(
        "DELETE FROM images WHERE owner_id = ? AND owner_type = 'things_to_do'",
        [createdId]
      );
    }
    if (server) await new Promise((resolve) => server.close(resolve));
    if (pool) await pool.end();
  });
  
  describe("🧪 Test API things_to_do", () => {
    it('POST /api/thingsToDo - devrait créer un things_to_do avec images', async () => {
        expect(createdDestinationId).toBeDefined();
    
        const res = await request(server)
          .post('/api/thingsToDo')
          .set('Authorization', `Bearer ${userProToken}`)
          .field('name', 'Test activité')
          .field('adress', '1 rue des tests')
          .field('destination_id', String(createdDestinationId)) // ✅ cast explicite
          .field('description', 'Une activité test vraiment cool')
          .field('longitude', '1.23')
          .field('latitude', '5.67')
          .field('icon', '🧪')
          .field('destination_name', 'Testville')
          .field('category', 'Culture') // ✅ propre
          .field('status', 'active')
          .attach('gallery', path.resolve('__tests__/assets/test-image.jpg'));
    
        console.log("🔎 RES POST:", res.body);
    
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        createdId = res.body.id;
    });
  
    it("GET /api/thingsToDo/:id - devrait retourner le things_to_do créé", async () => {
      const res = await request(server)
        .get(`/api/thingsToDo/${createdId}`);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name", "Test activité");
    });
  
    it("PUT /api/thingsToDo/:id - devrait modifier un things_to_do", async () => {
      const res = await request(server)
        .put(`/api/thingsToDo/${createdId}`)
        .set("Authorization", `Bearer ${userProToken}`)
        .field("name", "Activité modifiée")
        .field("adress", "2 rue modifiée")
        .field("destination_id", 6)
        .field("description", "Description modifiée")
        .field("longitude", "3.14")
        .field("latitude", "1.618")
        .field("icon", "🔧")
        .field("destination_name", "Modifville")
        .field("category", "modif")
        .field("status", "active");
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "things_to_do modifié");
    });
  
    it("DELETE /api/thingsToDo/:id - devrait supprimer le things_to_do", async () => {
      const res = await request(server)
        .delete(`/api/thingsToDo/${createdId}`)
        .set("Authorization", `Bearer ${userProToken}`)
        .send({ id: createdId });
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("message", "things_to_do supprimé");
      createdId = null;
    });
  });