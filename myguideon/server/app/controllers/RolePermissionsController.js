/**
 * @file RolePermissionsController.js
 * @description Gestion des permissions pour les rôles utilisateurs 
 * Ce fichier définit les fonctions de gestion des permissions pour les rôles utilisateurs
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const RolePermissionsModel = require('../../database/models/RolePermissionsModel');
const {
    addRoleValidation,
    addPermissionValidation,
    removeValidation,
    addNewPermissionValidation,
    addRoleToAdminValidation
} = require('../validator/rolePremissionsValidator');

const rolePermissionsModel = new RolePermissionsModel();

/**
 * 🎯 Attribuer un rôle à un utilisateur Pro
 */
const assignRoleToUserPro = async (req, res) => {
    try {
        const { error } = addRoleValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const result = await rolePermissionsModel.assignRoleToUserPro(req.body.userProId, req.body.roleId);
        res.json({ success: true, affectedRows: result });
    } catch (err) {
        console.error("❌ Erreur assignRoleToUserPro:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * 🎯 Attribuer un rôle à un utilisateur admin
 */
const assignRoleToUserAdmin = async (req, res) => {
    try {
        const { error } = addRoleToAdminValidation(req.body);
        if (error) {
            console.error("❌ Erreur validation assignRoleToUserAdmin:", error.details[0].message);
            return res.status(400).json({ error: error.details[0].message });
        }
        const result = await rolePermissionsModel.assignRoleToUserAdmin(req.body.userAdminId, req.body.roleId);
        res.json({ success: true, affectedRows: result });
    } catch (err) {
        console.error("❌ Erreur assignRoleToUserAdmin:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * 🎯 Ajouter une permission à un rôle
 */
const addPermissionToRole = async (req, res) => {
    try {
        const { error } = addPermissionValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const result = await rolePermissionsModel.addPermissionToRole(req.body.roleId, req.body.permissionId);
        res.json({ success: true, result });
    } catch (err) {
        console.error("❌ Erreur addPermissionToRole:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};
/**
 * 🎯 Ajouter une nouvelle permission
 */
const addNewPermission = async (req, res) => {
    try {
        const { error } = addNewPermissionValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const result = await rolePermissionsModel.addNewPermission(req.body.name, req.body.description);
        res.json({ success: true, permissionId: result });
    } catch (err) {
        console.error("❌ Erreur addNewPermission:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

/**
 * 🎯 Supprimer une permission d’un rôle
 */
const removePermissionFromRole = async (req, res) => {
    try {
        const { error } = removeValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const result = await rolePermissionsModel.removePermissionFromRole(req.body.roleId, req.body.permissionId);
        res.json({ success: true, affectedRows: result });
    } catch (err) {
        console.error("❌ Erreur removePermissionFromRole:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    assignRoleToUserPro,
    addPermissionToRole,
    removePermissionFromRole,
    addNewPermission,
    assignRoleToUserAdmin
};
