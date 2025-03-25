/**
 * @file  useradminController.js
 * @description  User admin controller
 * @module  User admin controller
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created  2025-03-10
 * 
 */

const tables = require('../../database/table');
const { hashPassword, verifyPassword } = require('../helpers/argonHelper');
const { generateToken } = require('../helpers/jwtHelper');
const sendMail = require('../utils/transporter');
const {
    addAdminValidator,
    updateAdminValidator,
    authAdminValidator
} = require('../validator/userAdminValidator');

//Ajouter un administrateur(avec images , hash, email unique)
async function addAdmin(req, res, next) {
    const { error } = addAdminValidator(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password, role_id, is_first_time } = req.body;
    const profile_image = req.file ? `/assets/img/${req.file.filename}` : null;

    try {
      const existing = await tables.user_admin.findByEmail(email);
      if (existing) return res.status(409).json({ error: "Email déjà utilisé" });

      const hashedPassword = await hashPassword(password);
      const insertId = await tables.user_admin.addAdminUser({
        name,
        email,
        password: hashedPassword,
        profile_image,
        role_id: role_id || 4,
        is_first_time: is_first_time ?? true,
      });

      const html = `  <h1>Un compte admin a été créé</h1>
      <p>Email : ${email}</p>
      <p><strong>Mot de passe :</strong> seul vous le connaissez. Si vous ne l’avez pas reçu, contactez l’administrateur principal.</p>`;
      await sendMail(email, "Nouveau compte admin", html);

      res.status(201).json({ message: "Admin créé", id: insertId });
    } catch (err) {
      next(err);
    }
}

// Afficher tous les administrateurs
async function getAllAdmins(req, res, next) {
    try {
      const admins = await tables.user_admin.findAll();
      res.status(200).json(admins);
    } catch (err) {
      next(err);
    }
}

// Afficher un administrateur par ID
async function getAdminById(req, res, next) {
    try {
        const admin = await tables.user_admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ error: "Admin non trouvé" });
        res.status(200).json(admin);
    } catch (err) {
        next(err);
    }
}

// Mettre à jour un administrateur
async function updateAdmin(req, res, next) {
    const { error } = updateAdminValidator(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const {id} = req.params;
    const { name, email, password, role_id, is_first_time } = req.body;
    const profile_image = req.file ? `/assets/img/${req.file.filename}` : null;

    try {
        let finalPassword = password;
        if (password && !password.startsWith("$argon2")) {
          finalPassword = await hashPassword(password);
        }
  
        await tables.user_admin.updateUser({
            id,
            name: name ?? null,
            email: email ?? null,
            password: finalPassword ?? null,
            profile_image: profile_image ?? null,
            role_id: role_id ?? null,
            is_first_time: is_first_time ?? null,
        });
  
        res.status(200).json({ message: "Admin mis à jour" });
      } catch (err) {
        console.error("❌ Erreur updateAdmin :", err);
        next(err);
      }
}

// Supprimer un administrateur
async function deleteAdmin(req, res,next) {
    const { id } = req.params;
    try {
        const result = await tables.user_admin.deleteAdmin(id);
        if (result.affectedRows === 0)
        return res.status(404).json({ message: "Admin non trouvé" });

      res.status(200).json({ message: "Admin supprimé" });
    } catch (err) {
        console.error("❌ Erreur deleteAdmin :", err);
        next(err);
    }
}

// Authentification d'un administrateur
async function login(req, res, next) {
    const { error } = authAdminValidator(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    try {
        const admin = await tables.user_admin.findByEmail(email);
        if (!admin) return res.status(404).json({ error: "Admin non trouvé" });

        const isPasswordValid = await verifyPassword(admin.password, password);
        if (!isPasswordValid) return res.status(401).json({ error: "Mot de passe incorrect" });

        const token = generateToken({ id: admin.id, email: admin.email, role_id:admin.role_id });
        res.status(200).json({token});
    } catch (err) {
        next(err);
    }
}

// Envoi du code de réinitialisation de mot de passe
async function sendResetCode(req, res, next) {
    const { email } = req.body;
    const resetCode = Math.floor(100000 + Math.random() * 900000);

    try {
      const admin = await tables.user_admin.findByEmail(email);
      if (!admin) return res.status(404).json({ error: "Admin non trouvé" });

      await tables.user_admin.setResetCode(email, resetCode);

      const html = `<h1>Code de réinitialisation</h1><p>Votre code est : <b>${resetCode}</b></p>`;
      await sendMail(email, "Code de réinitialisation", html);

      res.status(200).json({ message: "Code envoyé par email" });
    } catch (err) {
      next(err);
    }
}

// Vérification du code de réinitialisation
async function verifyResetCode(req, res, next) {
    const { email, code } = req.body;

    try {
        const result = await tables.user_admin.verifyResetCode(email, code);
        if (!result) return res.status(400).json({ error: "Code invalide ou expiré" });

        res.status(200).json({ message: "Code vérifié avec succès" });
    } catch (err) {
        next(err);
    }    
}

// Réinitialisation du mot de passe
async function setNewPassword(req, res, next) {
    const { email, newPassword } = req.body;

    try {
        const hashedPassword = await hashPassword(newPassword);
        await tables.user_admin.updatePassword(email, hashedPassword);

        const html = "<h1>Mot de passe modifié</h1><p>Bonjour, votre mot de passe a été mis à jour.</p>";
        await sendMail(email, "Mot de passe modifié", html);

        res.status(200).json({ message: "Mot de passe réinitialisé" });
    } catch (err) {
        next(err);
    }
}

// Récupérer les permissions
async function getPermissions(req, res, next) {
    const {id} = req.params;
    try {
        const permissions = await tables.user_admin.findPermissions(id);
        res.status(200).json(permissions);
    } catch (err) {
        next(err);
    }
}

// Ajouter des permissions
async function addPermissions(req, res, next) {
    const { name, permissions } = req.body;

    try {
        const result = await tables.user_admin.addPermissions(name, permissions);
        if (result.affectedRows > 0) return res.status(200).json({ message: "Permissions ajoutées" });

        res.status(500).json({ error: "Erreur lors de l'ajout des permissions" });
    } catch (err) {
        next(err);
    }
}

// Mettre à jour les permissions
async function updatePermissions(req, res,  next) {
    const { id } = req.params;
    const { permissions } = req.body;

    try {
        await tables.user_admin.updatePermissions(id, permissions);
        res.status(200).json({ message: "Permissions mises à jour" });
    } catch (err) {
        next(err);
    }
}

//Attribuer des permissions à un rôle
async function assignPermissions(req, res, next) {
    const { role_id, permissions } = req.body;

    try {
        await tables.user_admin.assignPermissions(role_id, permissions);
        res.status(200).json({ message: "Permissions attribuées" });
    } catch (err) {
        next(err);
    }
}



module.exports = {
    addAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    login,
    sendResetCode,
    verifyResetCode,
    setNewPassword,
    getPermissions,
    addPermissions,
    updatePermissions,
    assignPermissions,
}

