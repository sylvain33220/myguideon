const express = require('express');
const router = express.Router();

/***********************IMPORT*********************************** */
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');


const {
    getAllFeedbacks,
    getFeedbackById,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackByActivityId,
    getFeedbackByUserId,
    getFeedbackByRating,
    getFeedbackByThingsToDoId
} = require('../controllers/feedbacksController');

/************** 🔓 Routes publiques **************/
// 🔓 Récupérer tous les feedbacks
router.get('/', getAllFeedbacks);

// 🔓 Récupérer un feedback par son ID
router.get('/:id', getFeedbackById);

// 🔓 Récupérer un feedback par ID d'activité
router.get('/activity/:id', getFeedbackByActivityId);

// 🔓 Récupérer un feedback par ID utilisateur
router.get('/user/:id', getFeedbackByUserId);

// 🔓 Récupérer un feedback par rating
router.get('/rating/:rating', getFeedbackByRating);

// 🔓 Récupérer un feedback par ID d things_to_do
router.get('/things-to-do/:id', getFeedbackByThingsToDoId);

/************** 🔒 Routes protégées pour `feedback` **************/
// 🔒 Ajouter un feedback (user connecté obligatoire)
router.post('/', authMiddleware(),roleMiddleware([1,3]), addFeedback);

// 🔒 Mettre à jour un feedback par son ID (user connecté obligatoire et admin)
router.put('/:id', authMiddleware(), roleMiddleware([1,3]), updateFeedback);

// 🔒 Supprimer un feedback par son ID (user connecté obligatoire et admin)
router.delete('/:id', authMiddleware(), roleMiddleware([1,3]), deleteFeedback);

/***********************EXPORT*********************************** */

module.exports = router;