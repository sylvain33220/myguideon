const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const uploadFile = require('../middleware/uploadFile');

/********************************************IMPORT************************************ */
const {
    getAllActivities,
    getActivityById,
    addActivity,
    updateActivity,
    deleteActivity,
    filterActivities
} = require('../controllers/activitiesController');

/********************************************ROUTES************************************ */

// 🔓 Route publique pour obtenir toutes les activités
router.get('/', getAllActivities);

// 🔓 Route publique pour obtenir une activité par ID
router.get('/:id', getActivityById);

// 🔓 Route publique pour filtrer les activités
router.get('/search', filterActivities);

// 🛑 Route sécurisée pour ajouter une activité (requiert 'create_activity')
router.post('/',
    authMiddleware('create_activity'),  // ✅ Appel direct avec wrapper propre
    uploadFile().fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'gallery', maxCount: 10 }
    ]),
    addActivity
);

// 🛑 Route sécurisée pour mettre à jour une activité (requiert 'update_activity')
router.put('/:id',
    authMiddleware('update_activity'),  // ✅ Appel direct avec wrapper propre
    uploadFile().fields([
        { name: 'imageCover', maxCount: 1 },
        { name: 'gallery', maxCount: 10 }
    ]),
    updateActivity
);

// 🛑 Route sécurisée pour supprimer une activité (requiert 'delete_activity')
router.delete('/:id',
    authMiddleware('delete_activity'),  // ✅ Appel direct avec wrapper propre
    deleteActivity
);

/********************************************EXPORT MODULE************************************ */
module.exports = router;

