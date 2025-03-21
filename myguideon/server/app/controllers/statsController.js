/**
 * @file statsController.js
 * @description Controller pour les statistiques de l'application 
 * Ce fichier gère les statistiques de l'application
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const statsModel = require('../../database/models/statsModel');

const getActivitiesStats = async (req, res) => {
    try {
        const stats = await statsModel.fetchActivitiesStats();
        res.status(200).json(stats);
    } catch (error) {
        console.error("❌ ERREUR getActivitiesStats:",error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
const getRevenueStats = async (req, res) => {
    try {
        const stats = await statsModel.fetchRevenueStats();
        res.status(200).json(stats);
    } catch (error) {
        console.error("❌ ERREUR getRevenueStats:",error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
const getRatingStats = async (req, res) => {
    try {
        const stats = await statsModel.fetchRatingsStats();
        res.status(200).json(stats);
    } catch (error) {
        console.error("❌ ERREUR getRatingStats:",error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

const getFeedbackStatsByActivity = async (req, res) => {
    try {
        const stats = await statsModel.fetchFeedbackStatsByActivity();
        res.status(200).json(stats);
    } catch (error) {
        console.error("❌ ERREUR getFeedbackStatsByActivity:",error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

const getFeedbackStatsByThingsToDo = async (req, res) => {
    try {
        const stats = await statsModel.fetchFeedbackStatsByThingsToDo();
        res.status(200).json(stats);
    } catch (error) {
        console.error("❌ ERREUR getFeedbackStatsByThingsToDo:",error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

//**********************************EXPORT****************************************************** */


module.exports = {  getActivitiesStats, getRevenueStats, getRatingStats, 
                    getFeedbackStatsByActivity, getFeedbackStatsByThingsToDo };