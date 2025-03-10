/**
 * @file availabilitiesController.js
 * @description Controller pour les disponibilités des activités 
 * Ce fichier gère les disponibilités des activités
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const tables = require('../../database/table');
const path = require('node:path');
const {addAvailabilityValidation,
    updateAvailabilityValidation,
    deleteAvailabilityValidation
} = require('../validator/availabilitiesValidator');


/*********************** Récupérer toutes les disponibilités ***********************/
async function getAllAvailabilities(req, res) {
    try {
        const availabilities = await tables.availabilities.getAllAvailabilities();
        res.status(200).json(availabilities);
    } catch (error) {
        console.error("❌ ERREUR getAllAvailabilities:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
/*********************** Récupérer les disponibilités par ID d'activité ***********************/
async function getAvailabilitiesByActivityId(req, res) {
    try {
        const activityId = req.params.id;
        const availabilities = await tables.availabilities.getAvailabilitiesByActivityId(activityId);
        res.status(200).json(availabilities);
    } catch (error) {
        console.error("❌ ERREUR getAvailabilitiesByActivityId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
/*********************** Ajouter des disponibilités ***********************/
async function addAvailabilities(req, res) {
    try {
        const {error} = addAvailabilityValidation(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const hasOverLap = await tables.availabilities.checkOverlap(req.body);
        if (hasOverLap) return res.status(400).json({ error: "Les disponibilités se chevauchent" });
        const newAvailability = await tables.availabilities.addAvailabilities(req.body);
        res.status(201).json(newAvailability);
    } catch (error) {
        console.error("❌ ERREUR addAvailabilities:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
/*********************** Mettre à jour la disponibilité ***********************/
async function updateAvailability(req, res) {
    try {
        const { error } = updateAvailabilityValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        // 🔍 Récupérer l'activity_id si non fourni
        let activity_id = req.body.activity_id;
        if (!activity_id) {
            const availability = await tables.availabilities.getAvailabilityById(req.params.id);
            if (availability) {
                activity_id = availability.activity_id;
            } else {
                return res.status(404).json({ error: 'Disponibilité non trouvée' });
            }
        }

        const hasOverlap = Boolean(await tables.availabilities.checkOverlap({
            activity_id,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            exclude_id: req.params.id
        }));
        if (hasOverlap === true) {
            return res.status(400).json({ error: "Les disponibilités se chevauchent" });
        }
        const isUpdated = await tables.availabilities.updateAvailability(req.params.id, req.body);
        if (isUpdated) {
            return res.status(200).json({ message: 'Disponibilité mise à jour avec succès' });
        }
            return res.status(404).json({ error: 'Disponibilité non trouvée' });
    } catch (error) {
        console.error("❌ ERREUR updateAvailability:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Supprimer la disponibilité ***********************/
async function deleteAvailability(req, res) {
    try {
        const {error} = deleteAvailabilityValidation(req.params);
        if (error) return res.status(400).json({ error: error.details[0].message });
        const id = req.params.id;
        const success = await tables.availabilities.deleteAvailability(id);
        if (success) {
            res.status(200).json({ message: "Disponibilité supprimée avec succès" });
        } else {
            res.status(404).json({ error: "Disponibilité non trouvée" });
        }
    } catch (error) {
        console.error("❌ ERREUR deleteAvailability:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

// const { addAvailabilityValidation, updateAvailabilityValidation, deleteAvailabilityValidation } = require('../validators/availabilitiesValidator');

// async function addAvailabilities(req, res) {
//     try {
//         const { error, value } = addAvailabilityValidation(req.body);  // 🔄 Destructure et récupère value si valide
//         if (error) return res.status(400).json({ error: error.details[0].message });
        
//         const newAvailability = await tables.availabilities.addAvailabilities(value);  // 🔄 Utilise value validé
//         res.status(201).json(newAvailability);
//     } catch (error) {
//         console.error("❌ Erreur lors de l'ajout de la disponibilité:", error);
//         res.status(500).json({ error: 'Erreur serveur' });
//     }
// }

/***************************EXPORT******************************* */
module.exports = {
    getAllAvailabilities,
    getAvailabilitiesByActivityId,
    addAvailabilities,
    updateAvailability,
    deleteAvailability
};