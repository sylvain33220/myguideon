
/**
 * @file RolePermissionsRouter.js
 * @description Router pour les permissions des rôles utilisateurs
 * Ce fichier regroupe toutes les routes pour les permissions des rôles utilisateurs
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const express = require('express');
const router = express.Router();
//* Importation des modules
const RolePermissionsModel = require('../../database/models/RolePermissionsModel');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');

//instanciation du model
const rolePermissionsModel = new RolePermissionsModel();

//Routes securisées
//attribuer un role a un userpro
router.post('/add-role', authMiddleware(), roleMiddleware([1]),async (req, res) => {
    const { userProId, roleId } = req.body;
    try {
        const result = await rolePermissionsModel.addRoleToUserPro(userProId, roleId);
        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})

//ajouter une permission a un role
router.post('/add-permission', authMiddleware(),roleMiddleware([1]), async (req, res) => {
    const { roleId, permissionId } = req.body;
    try {
        const result = await rolePermissionsModel.addPermissionToRole(roleId, permissionId);
        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})
//supprimer un role ou une permission
router.delete('/remove', authMiddleware(),roleMiddleware([1]), async (req, res) => {
    const { type, id } = req.body;
    try {
        const result = await rolePermissionsModel.removeRoleOrPermission(type, id);
        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})

// Export the router****************************************************
module.exports = router;