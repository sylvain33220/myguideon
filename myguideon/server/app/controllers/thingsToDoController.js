/**
 * @file  thingsToDoRoute.js
 * @description  Gestion de la route thingsToDo (things_to_do)
 * @module  Route thingsToDo - Router
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const tables = require('../../database/table');
const path = require('node:path');

const { validateAddThingsToDo,
validateDeleteThingsToDo,
validateGetThingsToDo,
validateUpdateThingsToDo
} = require('../validator/thingsToDoValidator');

      /******************* Ajouter un ThingsToDo *******************/
async function addThingsToDo(req, res) {
    const connection = await tables.things_to_do.getConnection();
    try {
      const { error } = validateAddThingsToDo(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });
  
      await connection.beginTransaction();
  
      // ➕ Création du ThingsToDo
      const id = await tables.things_to_do.addThingsToDo(req.body);
  
      // 📷 Ajout des images (type gallery)
      if (req.files && req.files.length > 0) {
        const insertImages = req.files.map((file) => {
          const url = `/assets/images/${file.filename}`;
          return connection.query(
            `INSERT INTO images (url, type, owner_id, owner_type, created_at) VALUES (?, 'gallery', ?, 'things_to_do', NOW())`,
            [url, id]
          );
        });
        await Promise.all(insertImages);
      }
  
      await connection.commit();
      res.status(201).json({ message: "things_to_do créé", id });
    } catch (error) {
      await connection.rollback();
      console.error("❌ ERREUR addThingsToDo:", error);
      res.status(500).json({ error: "Erreur serveur" });
    } finally {
      connection.release();
    }
  }

  /******************* Modifier un ThingsToDo *******************/
async function updateThingsToDo(req, res) {
    const connection = await tables.things_to_do.getConnection();
    try {
      const { error } = validateUpdateThingsToDo(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });
  
      await connection.beginTransaction();
  
      const updated = await tables.things_to_do.updateThingsToDo(
        req.params.id,
        req.body
      );
  
      // 📷 Ajout de nouvelles images si présentes
      if (req.files && req.files.length > 0) {
        const insertImages = req.files.map((file) => {
          const url = `/assets/images/${file.filename}`;
          return connection.query(
            `INSERT INTO images (url, type, owner_id, owner_type, created_at) VALUES (?, 'gallery', ?, 'things_to_do', NOW())`,
            [url, req.params.id]
          );
        });
        await Promise.all(insertImages);
      }
  
      await connection.commit();
      res.status(200).json({ message: "things_to_do modifié" });
    } catch (error) {
      await connection.rollback();
      console.error("❌ ERREUR updateThingsToDo:", error);
      res.status(500).json({ error: "Erreur serveur" });
    } finally {
      connection.release();
    }
  }
  
  /******************* Supprimer un ThingsToDo *******************/
  async function deleteThingsToDo(req, res) {
    try {
      const { error } = validateDeleteThingsToDo(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });
  
      const deleted = await tables.things_to_do.deleteThingsToDo(req.body.id);
      if (!deleted)
        return res.status(404).json({ error: "things_to_do non trouvé" });
  
      res.status(200).json({ message: "things_to_do supprimé" });
    } catch (error) {
      console.error("❌ ERREUR deleteThingsToDo:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
  
  /******************* Récupérer un ThingsToDo *******************/
  async function getThingsToDo(req, res) {
    try {
      const id = Number.parseInt(req.params.id, 10);
  
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "ID invalide" });
      }
  
      const result = await tables.things_to_do.getThingsToDoById(id);
  
      if (!result || result.length === 0) {
        return res.status(404).json({ error: "things_to_do non trouvé" });
      }
  
      res.status(200).json(result[0]); // ⚠️ Tu renvoies 1 seul objet
    } catch (error) {
      console.error("❌ ERREUR getThingsToDo:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
  
  /******************* Récupérer tous les ThingsToDo *******************/
  async function getAllThingsToDo(req, res) {
    try {
      const result = await tables.things_to_do.getAllThingsToDo();
      if (!result || result.length === 0)
        return res.status(404).json({ error: "Aucun things_to_do trouvé" });
  
      res.status(200).json(result);
    } catch (error) {
      console.error("❌ ERREUR getAllThingsToDo:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
  
  module.exports = {
    addThingsToDo,
    updateThingsToDo,
    deleteThingsToDo,
    getThingsToDo,
    getAllThingsToDo,
  };
