
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
const { assignRoleToUserPro, addPermissionToRole,removePermissionFromRole, addNewPermission, assignRoleToUserAdmin  } = require('../controllers/RolePermissionsController');

//instanciation du model
const rolePermissionsModel = new RolePermissionsModel();

//Routes securisées
//attribuer un role a un userpro
router.post('/assign-role', authMiddleware('assign_role'), roleMiddleware([1]), assignRoleToUserPro)
//ajouter une permission a un role
router.post('/add-permission', authMiddleware('add_permission'),roleMiddleware([1]),addPermissionToRole)
//ajouter une nouvelle permission
router.post('/add-new-permission', authMiddleware('add_new_permission'),roleMiddleware([1]),addNewPermission)
//ajouter un role a un user_admin
router.post('/assign-role-admin', authMiddleware('assign_role_admin'), roleMiddleware([1]), assignRoleToUserAdmin)
//supprimer un role ou une permission
router.delete('/remove-permission', authMiddleware('remove_permission'),roleMiddleware([1]),removePermissionFromRole)

// Export the router****************************************************
module.exports = router;