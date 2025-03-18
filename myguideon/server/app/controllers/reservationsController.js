
/**
 * @file reservationsController.js
 * @description Contrôleur pour les réservations des activités 
 * Ce fichier contient les méthodes de contrôle pour les réservations des activités
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */const tables = require('../../database/table');
const { addReservationValidation, updateReservationValidation,deleteReservationValidation } = require('../validator/reservationsValidator');

const getReservationById = async (req, res) => {
    try {
        const reservation = await tables.reservations.getReservationById(req.params.id);
        res.status(200).json(reservation);
    } catch (error) {
        console.error("❌ ERREUR getReservationById:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

const getAllReservations = async (req, res) => {
    try {
        const reservations = await tables.reservations.getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        console.error("❌ ERREUR getAllReservations:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

const getReservationsByActivityId = async (req, res) => {
    try {
        const reservations = await tables.reservations.getReservationsByActivityId(req.params.activity_id);
        res.status(200).json(reservations);
    } catch (error) {
        console.error("❌ ERREUR getReservationsByActivityId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

const getReservationsByUserId = async (req, res) => {
    try {
        const reservations = await tables.reservations.getReservationsByUserId(req.params.user_id);
        res.status(200).json(reservations);
    } catch (error) {
        console.error("❌ ERREUR getReservationsByUserId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

const addReservation = async (req, res) => {
    const { error , value } = addReservationValidation(req.body);
    if (error) {
        console.log("❌ Erreur de validation:", error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const newReservation = await tables.reservations.createReservation(value);
        res.status(201).json({id :newReservation});
    } catch (error) {
        console.error("❌ ERREUR addReservation:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

const updateReservation = async (req, res) => {
    const { error, value  } = updateReservationValidation(req.body);
    if (error){         
        console.log("❌ Erreur de validation:", error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const isUpdated = await tables.reservations.updateReservation(req.params.id, value);
        if (isUpdated) {
            res.status(200).json({ message: 'Réservation mise à jour avec succès' });
        } else {
            res.status(404).json({ error: 'Réservation non trouvée' });
        }
    } catch (error) {
        console.error("❌ ERREUR updateReservation:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

const deleteReservation = async (req, res) => {
    const { error, value } = deleteReservationValidation({id:req.params.id});
    if (error){
        console.log("❌ Erreur de validation:", error.details[0].message);
        return res.status(400).json({ error: error.details[0].message });
    } 
    try {
        const rowsAffected = await tables.reservations.deleteReservation(value.id);
        if (!rowsAffected) {
            res.status(404).json({ error: 'Réservation non trouvée' });
        } 
        else {
            res.status(200).json({ message: 'Réservation supprimée avec succès' });
        }
    } catch (error) {
        console.error("❌ ERREUR deleteReservation:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

module.exports = {
    addReservation,
    getReservationById,
    getAllReservations,
    getReservationsByUserId,
    getReservationsByActivityId,
    updateReservation,
    deleteReservation  };