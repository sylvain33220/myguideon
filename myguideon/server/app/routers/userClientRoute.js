/**
 * @file userClientRoute.js
 * @description Gestion des routes pour les utilisateurs clients
 * @module UserClientRoute
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2021-05-10
 */

const express = require('express');
const router = express.Router();

/***********************IMPORT*********************************** */
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const uploadFile = require('../middleware/uploadFile');

const {
    getAllUserClient,
    getUserClientById,
    updateUserClient,
    updatePassword,
    deleteUserClient,
    loginUserClient,
    addUserClient
} = require('../controllers/userClientController');

/***********************ROUTES PUBLIQUES*********************************** */
// 🔓 Route publique : Connexion
router.post('/login', loginUserClient);

// 🔓 Route publique : Inscription avec upload d'image
router.post('/register', uploadFile().single('profile_image'), addUserClient);

/***********************ROUTES PROTEGEES POUR `user_client`*********************************** */
// 🔒 Récupérer ses propres infos
router.get('/me', authMiddleware(), getUserClientById);

// 🔒 Mettre à jour ses propres infos
router.put('/me/profile', authMiddleware(), uploadFile().single('profile_image'), updateUserClient);

// 🔒 Mettre à jour son propre mot de passe
router.put('/me/security', authMiddleware(), roleMiddleware([3]), updatePassword);

// 🔒 Supprimer son propre compte
router.delete('/me', authMiddleware(), roleMiddleware([3]), deleteUserClient);

/***********************ROUTES ADMIN (`role_id = 1`)*********************************** */
// 🔒 Récupérer tous les `user_client` (admin seulement)
router.get('/', authMiddleware('view_userclient'), roleMiddleware([1]), getAllUserClient);

// 🔒 Récupérer un `user_client` par son ID (admin seulement)
router.get('/:id', authMiddleware('view_userclient'), roleMiddleware([1]), getUserClientById);

// 🔒 Mettre à jour un `user_client` par son ID (admin seulement)
router.put('/:id', authMiddleware('update_userclient'), roleMiddleware([1,3]), uploadFile().single('profile_image'), updateUserClient);

// 🔒 Mettre à jour le mot de passe d'un `user_client` par son ID (admin seulement)
router.put('/:id/password', authMiddleware('update_password_userclient'), roleMiddleware([1,3]), updatePassword);

// 🔒 Supprimer un `user_client` par son ID (admin seulement)
router.delete('/:id', authMiddleware('delete_userclient'), roleMiddleware([1]), deleteUserClient);

// /***********************ROUTES PUBLIQUES*********************************** */
// // 🔓 Route publique : Connexion
// router.post('/login', loginUserClient);

// // 🔓 Route publique : Inscription avec upload d'image
// router.post('/register', uploadFile().single('profile_image'), addUserClient);

// /***********************ROUTES PROTEGEES POUR USER CONNECTÉ*********************************** */
// // 🔒 Récupérer ses propres infos
// router.get('/me', authMiddleware(), getUserClientById);

// // 🔒 Mettre à jour ses propres infos
// router.put('/me', authMiddleware(), uploadFile().single('profile_image'), updateUserClient);

// // 🔒 Mettre à jour son propre mot de passe
// router.put('/me/password', authMiddleware(),roleMiddleware([3]) , updatePassword);

// // 🔒 Supprimer son propre compte
// // router.delete('/me', authMiddleware(), async (req, res, next) => {
// //     try {
// //         if (req.user.role_id !== 3) {
// //             return res.status(403).json({ error: "Accès refusé, seuls les utilisateurs clients peuvent supprimer leur propre compte" });
// //         }
// //         req.params.id = req.user.id; // On force la suppression de l'utilisateur authentifié
// //         next();
// //     } catch (error) {
// //         console.error("❌ ERREUR deleteUserClient:", error);
// //         res.status(500).json({ error: 'Erreur serveur' });
// //     }
// // }, deleteUserClient);
// router.delete('/me', authMiddleware(), roleMiddleware([3]), deleteUserClient);

// /***********************ROUTES ADMIN SECURISEES*********************************** */
// // 🔒 Récupérer tous les userclient (admin seulement)
// router.get('/', authMiddleware('view_userclient'), adminMiddleware, getAllUserClient);

// // 🔒 Récupérer un userclient par son id (admin seulement)
// router.get('/:id', authMiddleware('view_userclient'), roleMiddleware([1]), getUserClientById);

// // 🔒 Mettre à jour un userclient par son id (admin seulement)
// router.put('/:id', authMiddleware('update_userclient'),roleMiddleware([1]), uploadFile().single('profile_image'), updateUserClient);

// // 🔒 Mettre à jour le mot de passe d'un userclient par son id (admin seulement)
// router.put('/:id/password', authMiddleware('update_password_userclient'),roleMiddleware([1]), updatePassword);

// // 🔒 Supprimer un userclient par son id (admin seulement)
// router.delete('/:id', authMiddleware('delete_userclient'),roleMiddleware([1]), deleteUserClient);

/***********************EXPORT*********************************** */
module.exports = router;