/**
 * @file userproController.js
 * @description Gestion des utilisateurs professionnels
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const tables = require('../../database/table');
const { hashPassword, verifyPassword } = require('../helpers/argonHelper');
const { generateToken } = require('../helpers/jwtHelper');
const path = require('node:path');
const { addUserProValidation,
  updateUserProValidation,
   updatePasswordValidation,
  authUserProValidation } = require('../validator/userproValidator');

/*********************** Récupérer tous les UserPro ***********************/
async function getAllUserPro(req, res) {
    try {
        const users = await tables.userpro.getAllUsersPro();
        const sanitizedUsers = users.map(user => {
            const { password, ...rest } = user;  // 🔓 Enlève le mot de passe
            return rest;
        });
        res.status(200).json(sanitizedUsers);
    } catch (error) {
        console.error("❌ ERREUR getAllUserPro:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Récupérer un UserPro par ID ***********************/
async function getUserProById(req, res) {
    try {
        const userId =req.params.id || req.user.id; 
        const isAdmin = req.user.role_id === 1; 

        if (Number.parseInt(req.params.id) !== userId && !isAdmin) {
            return res.status(403).json({ error: "Accès refusé" });
        }

        const user = await tables.userpro.getUserProById(userId || req.params.id);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        const { password, ...sanitizedUser } = user;  // 🔓 Enlève le mot de passe
        res.status(200).json(sanitizedUser);
    } catch (error) {
        console.error("❌ ERREUR getUserProById:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Ajouter un UserPro ***********************/
async function addUserPro(req, res) {
    try {
        const { error } = addUserProValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const profileImage = req.file?.filename ? `/assets/img/${req.file.filename}` : null;
        const newUserPro = await tables.userpro.AddUserPro({
            ...req.body,
            profile_image: profileImage
        });
        res.status(201).json(newUserPro);
    } catch (error) {
        console.error("❌ ERREUR addUserPro:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Mettre à jour un UserPro ***********************/
async function updateUserPro(req, res) {
    try {
      const { error } = updateUserProValidation(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
        const userId = req.user.id;
        const profileImage = req.file?.filename ? `/assets/img/${req.file.filename}` : null;


        const isUpdated = await tables.userpro.updateUserPro(userId, {
            ...req.body,
            profile_image: profileImage
        });

        if (isUpdated) {
            res.status(200).json({ message: 'Profil mis à jour avec succès.' });
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error("❌ ERREUR updateUserPro:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Mettre à jour le mot de passe ***********************/
async function updatePassword(req, res) {
    try {
      const { error } = updatePasswordValidation(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
        const { oldPassword, newPassword } = req.body;
        const user = await tables.userpro.getUserProById(req.user.id);
        if (!await verifyPassword(user.password, oldPassword)) {
            return res.status(400).json({ error: "Ancien mot de passe incorrect" });
        }
        const hashedPassword = await hashPassword(newPassword);
        await tables.userpro.updatePassword(req.user.id, hashedPassword);
        res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
        console.error("❌ ERREUR updatePassword:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Supprimer un UserPro ***********************/
async function deleteUserPro(req, res) {
  const userId = req.user.id;      
  const isAdmin = req.user.role_id === 1; 

  // 🔒 Vérification : Seul l'utilisateur lui-même ou un admin peut supprimer le compte
  if (Number.parseInt(req.params.id) !== userId && !isAdmin) {
      return res.status(403).json({ error: "Accès refusé" });
  }

  try {
      const isDeleted = await tables.userpro.deleteUserPro(req.params.id);
      if (isDeleted) {
          res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
      } else {
          res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
  } catch (error) {
      console.error("❌ ERREUR deleteUserPro:", error);
      res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function loginUserPro(req, res) {
  const { error } = authUserProValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password ,role_id} = req.body;
  try {
        const user = await tables.userpro.authenticateUserPro(email, password, role_id);
        if (!user) return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        res.status(200).json({ token: user.token,role_id:user.role_id ,message: 'Connexion réussie' });
    } catch (error) {
        if (error.message.includes("User not found")) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
    } else {
        console.error("❌ ERREUR loginUserPro:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
}

/*********************** EXPORTS ***********************/
module.exports = {
    getAllUserPro,
    getUserProById,
    addUserPro,
    updateUserPro,
    updatePassword,
    deleteUserPro,
    loginUserPro,
};
