/**
 * @file    feedbacksController.js
 * @description Gestion des feedbacks  
 * Ce fichier définit les fonctions de gestion des feedbacks
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const tables = require('../../database/table');
const path = require('node:path');
const { addFeedbackValidation, updateFeedbackValidation,deleteFeedbackValidation } = require('../validator/feedbacksValidator');

/*********************** Récupérer tous les feedbacks ***********************/
async function getAllFeedbacks(req, res) {
    try {
        const feedbacks = await tables.feedbacks.findAllFeedbacks();
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("❌ ERREUR getAllFeedbacks:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Récupérer un feedback par ID ***********************/
async function getFeedbackById(req, res) {
    try {
        const feedbackId = req.params.id;
        if (!feedbackId) return res.status(400).json({ error: "ID feedback manquant" });

        const feedback = await tables.feedbacks.findFeedbackById(feedbackId);
        if (!feedback) return res.status(404).json({ error: "Feedback non trouvé" });

        res.status(200).json(feedback);
    } catch (error) {
        console.error("❌ ERREUR getFeedbackById:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Ajouter un feedback ***********************/
async function addFeedback(req, res) {
    try {
        const { error, value } = addFeedbackValidation({
            ...req.body,
            user_id: req.user.id
        });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }
        const newFeedback = await tables.feedbacks.createFeedbacks(value);
        res.status(201).json({ id: newFeedback });
    } catch (error) {
        console.error("❌ ERREUR addFeedback:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Modifier un feedback ***********************/
async function updateFeedback(req, res) {
        const feedbackId = Number.parseInt(req.params.id, 10);
        if (!feedbackId || Number.isNaN(feedbackId)) {
          return res.status(400).json({ error: "ID feedback invalide" });
        }
        const { error, value } = updateFeedbackValidation({
            ...req.body,
            user_id: req.user.id
        });
        if (error) return res.status(400).json({ error: error.details[0].message });
        
    try {
        const updatedFeedback = await tables.feedbacks.updateFeedbacks(feedbackId, value);
        if (!updatedFeedback) return res.status(404).json({ error: "Feedback non trouvé" });

        res.status(200).json({ message: "Feedback modifié" });
    } catch (error) {
        console.error("❌ ERREUR updateFeedback:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Supprimer un feedback ***********************/
async function deleteFeedback(req, res) {
   try {
        const feedbackId = req.params.id;
        if (!feedbackId) return res.status(400).json({ error: "ID feedback manquant" });

        const { error, value } = deleteFeedbackValidation({ id: feedbackId });
        if (error) return res.status(400).json({ error: error.details[0].message });

        const deletedFeedback = await tables.feedbacks.deleteFeedbacks(feedbackId);
        if (!deletedFeedback) return res.status(404).json({ error: "Feedback non trouvé" });

        res.status(200).json({ message: "Feedback supprimé" });
    } catch (error) {
        console.error("❌ ERREUR deleteFeedback:", error);
        res.status(500).json({ error: 'Erreur serveur' });
   }
}

/*********************** Récupérer un feedback par ID d'activité ***********************/
async function getFeedbackByActivityId(req, res) {
    try {
        const activityId = req.params.id;
        if (!activityId) return res.status(400).json({ error: "ID activité manquant" });

        const feedbacks = await tables.feedbacks.findFeedbackByActivityId(activityId);
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("❌ ERREUR getFeedbackByActivityId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Récupérer un feedback par ID utilisateur ***********************/
async function getFeedbackByUserId(req, res) {
    try {
        const userId = req.params.id;
        if (!userId) return res.status(400).json({ error: "ID utilisateur manquant" });

        const feedbacks = await tables.feedbacks.findFeedbackByUserId(userId);
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("❌ ERREUR getFeedbackByUserId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Récupérer un feedback par Rating ***********************/
async function getFeedbackByRating(req, res) {
    try {
        const rating = req.params.rating;
        if (!rating) return res.status(400).json({ error: "Rating manquant" });

        const feedbacks = await tables.feedbacks.findFeedbackByRating(rating);
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("❌ ERREUR getFeedbackByRating:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Récupérer un feedback par ID d things_to_do***********************/
async function getFeedbackByThingsToDoId(req, res) {
    try {
        const thingsToDoId = req.params.id;
        if (!thingsToDoId) return res.status(400).json({ error: "ID things_to_do manquant" });

        const feedbacks = await tables.feedbacks.findFeedbackByThingsToDoId(thingsToDoId);
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("❌ ERREUR getFeedbackByThingsToDoId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Export des fonctions du controller ***********************/


module.exports = {
    getAllFeedbacks,
    getFeedbackById,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackByActivityId,
    getFeedbackByUserId,
    getFeedbackByRating,
    getFeedbackByThingsToDoId

}