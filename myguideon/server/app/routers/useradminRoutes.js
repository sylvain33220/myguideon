/**
 * @file  useradminRoutes.js
 * @description  User Admin Model pour la gestion des utilisateurs admin
 * @module  User  Admin Model - Gestion des utilisateurs admin
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2025-03-25
 * 
 */
const express = require('express');
const router = express.Router();

/***********************IMPORT*********************************** */
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');
const uploadFile = require('../middleware/uploadFile');

const {
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
} = require('../controllers/useradminController');

/**********************🔓 ROUTES PUBLIQUES 🔓*********************************** */
// 🔓 Connexion
router.post('/login', login);
// 🔓 Envoi code de réinitialisation
router.post('/reset' ,sendResetCode);
// 🔓 Vérification code de réinitialisation
router.post('/verify', verifyResetCode);
// 🔓 Réinitialisation mot de passe
router.post('/new-password', setNewPassword);

/**********************🔒 ROUTES ADMIN (`role_id = 1`) 🔒*********************************** */
// 🔒 Ajouter un administrateur
router.post('/add',authMiddleware("add_admin"), roleMiddleware([1]),
uploadFile().single("profile_image") ,addAdmin);
// 🔒 Voir tous les administrateurs
router.get('/',authMiddleware("view_admin"), roleMiddleware([1]), getAllAdmins);
// 🔒 Voir un administrateur par son ID
router.get('/:id',authMiddleware("view_admin"), roleMiddleware([1,4]), getAdminById);
// 🔒 Mettre à jour un administrateur par son ID
router.put('/:id',authMiddleware("update_admin"), roleMiddleware([1]),
uploadFile().single("profile_image"), updateAdmin);
// 🔒 Supprimer un administrateur par son ID
router.delete('/:id',authMiddleware("delete_admin"), roleMiddleware([1, 4]), deleteAdmin);

/***********************🔒 ROUTES POUR LA GESTION DES PERMISSIONS 🔒***********************************/
// 🔒 Voir toutes les permissions d'un admin
router.get('/permissions/:id',authMiddleware("view_permissions"), roleMiddleware([1]), getPermissions);
// 🔒 Ajouter des permissions
router.post('/permissions',authMiddleware("add_permissions"), roleMiddleware([1]), addPermissions);
// 🔒 Modifier les permissions
router.put('/permissions/:id',authMiddleware("update_permissions"), roleMiddleware([1]), updatePermissions);
// 🔒 Associer des permissions à un rôle
router.post('/assign-permissions',authMiddleware("assign_permissions"), roleMiddleware([1]), assignPermissions);

/***********************EXPORT*********************************** */
module.exports = router;




















// const express               = require('express');
// const router                = express.Router();
// const userAdminController   = require('../controllers/useradminController');
// const auth                  = require('../middleware/auth');

// router.get('/',                    userAdminController.getPermissions);            // get all permissions to check
// router.post('/add',                userAdminController.addRoles);                 // add roles
// router.delete('/delete/:id',       userAdminController.deleteRoles);             // update permissions of roles
// router.put('/update/:id',          userAdminController.updateRolesPermission);  // update roles
// router.get('/user_profil/:id',     userAdminController.getUserAdminById)
// router.get('/show/admin_user',     userAdminController.getAllUserAdmins); 
// router.post('/login',              userAdminController.login);
// router.post('/send-reset-code',    userAdminController.resetPassword);
// router.post('/verify-code',        userAdminController.verifyCode);
// router.post('/reset-password',     userAdminController. setNewPassord);
// router.post('/add/user/admin',     userAdminController.addUserAdmin);
// router.put('/update/user/:id',     userAdminController.updateUserInformation);
// router.delete('/user/delete/:id',  userAdminController.deleteUserInformation);

// module.exports = router;
