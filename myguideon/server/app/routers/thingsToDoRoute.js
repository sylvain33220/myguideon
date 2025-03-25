/**
 * @file  thingsToDoRoute.js
 * @description  Gestion de la route thingsToDo (things_to_do)
 * @module  Route thingsToDo - Router
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-25
 */

const express = require("express");
const router = express.Router();
const {
  addThingsToDo,
  updateThingsToDo,
  deleteThingsToDo,
  getThingsToDo,
  getAllThingsToDo,
} = require("../controllers/thingsToDoController");

const  uploadFile  = require("../middleware/uploadFile");
const authMiddleware = require("../middleware/auth");
const {
  userproMiddleware,
  checkUserProVerified,
} = require("../middleware/userproMiddleware");

/**************** 🔓 Routes publiques ****************/

// 🔓 Récupérer tous les things_to_do
router.get("/", getAllThingsToDo);

// 🔓 Récupérer un things_to_do par ID
router.get("/:id", getThingsToDo);

/**************** 🔒 Routes protégées ****************/

// 🔒 Ajouter un things_to_do (UserPro vérifié)
router.post(
  "/",
  authMiddleware(),
  userproMiddleware,
  checkUserProVerified(),
  uploadFile().array("gallery", 10),
  addThingsToDo
);

// 🔒 Modifier un things_to_do
router.put(
  "/:id",
  authMiddleware(),
  userproMiddleware,
  checkUserProVerified(),
  uploadFile().array("gallery",10),
  updateThingsToDo
);

// 🔒 Supprimer un things_to_do
router.delete(
  "/:id",
  authMiddleware(),
  userproMiddleware,
  checkUserProVerified(),
  deleteThingsToDo
);

module.exports = router;
