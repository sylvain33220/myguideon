/**
 * @file availabilitiesModel.js
 * @description Gestion des disponibilités des activités
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const AbstractModel = require('./AbstractModel');

class AvailabilitiesModel extends AbstractModel {
    constructor() {
        super({table: "availabilities"});
    }
/****************************Fonction de récupération de toutes les disponibilités********************************** */
/**
 * @description Récupérer toutes les disponibilités
 * @async
 * @returns {Promise<Object[]>} All availabilities
 * @property {number} id - ID de la disponibilité
 * @property {number} activity_id - ID de l'activité
 * @property {string} date - Date de la disponibilité
 * @property {string} start_time - Heure de début
 * @property {string} end_time - Heure de fin
 * @property {number} max_participants - Nombre maximum de participants
 * @property {string} status - Statut de la disponibilité
 * @property {string} created_at - Date de création
 * @property {string} updated_at - Date de mise à jour
 * @throws {Error} Une erreur si la requête SQL échoue
 * @returns {Promise<Object[]>} - Liste des disponibilités
 * @throws {Error} - L'erreur retournée par MySQL
 * @memberof AvailabilitiesModel
 * @instance
 * @method getAllAvailabilities
 */
async getAllAvailabilities() {
    const [rows] = await this.pool.query(
        `SELECT id, activity_id, date, start_time, end_time, max_participants, status, created_at, updated_at
         FROM ${this.table}`
    )
    return rows;
}
/****************************Fonction de récupération des disponibilités par ID d'activité********************************** */
/**
 * 
 * @param {number} activity_id
 * @property {number} activity_id - ID de l'activité
 * @property {string} date - Date de la disponibilité
 * @property {string} start_time - Heure de début
 * @property {string} end_time - Heure de fin
 * @property {number} max_participants - Nombre maximum de participants
 * @property {string} status - Statut de la disponibilité
 * @property {string} created_at - Date de création
 * @property {string} updated_at - Date de mise à jour
 * @returns 
 */
async getAvailabilitiesByActivityId(activity_id) {
    const [rows] = await this.pool.query(
        `SELECT id, date, start_time, end_time, max_participants, status, created_at, updated_at 
         FROM ${this.table} WHERE activity_id = ?`, 
        [activity_id]
    );
    return rows;
}
/****************************Fonction d'ajout des disponibilités********************************** */
/**
 * Ajoute une nouvelle disponibilité pour une activité.
 *
 * @param {Object} availabilities - Données de disponibilité à insérer
 * @param {number} availabilities.activity_id - ID de l'activité concernée
 * @param {string} availabilities.date - Date de la disponibilité (format YYYY-MM-DD)
 * @param {string} availabilities.start_time - Heure de début (format HH:MM:SS)
 * @param {string} availabilities.end_time - Heure de fin (format HH:MM:SS)
 * @param {number} [availabilities.max_participants=0] - Nombre max. de participants (optionnel)
 * @param {string} [availabilities.status='active'] - Statut de la disponibilité (ex: active, annulée)
 *
 * @returns {Promise<{ id: number }>} ID de la disponibilité créée
 */
 
async addAvailabilities(availabilities) {
    try {
        const [result] = await this.pool.query(
            `INSERT INTO ${this.table} (activity_id, date, start_time, 
                end_time, max_participants, status, created_at, updated_at, is_available) 
             VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), 1)`,
            [availabilities.activity_id, 
            availabilities.date,
            availabilities.start_time, 
            availabilities.end_time, 
            availabilities.max_participants ?? 0, 
            availabilities.status ?? 'active',
        ]
        );
        return { id: result.insertId };
    } catch (error) {
        console.error("❌ ERREUR SQL addAvailabilities:", error);
        throw new Error("Erreur lors de l'ajout des disponibilites");
    }
}
/****************************Fonction de mise à jour des disponibilités********************************** */
/**
 * 
 * @param {number} id 
 * @param {Object} updates 
 * @param {number} updates.activity_id - ID de l'activité concernée
 * @param {string} updates.date - Date de la disponibilité (format YYYY-MM-DD)
 * @param {string} updates.start_time - Heure de début (format HH:MM:SS)
 * @param {string} updates.end_time - Heure de fin (format HH:MM:SS)
 * @param {number} updates.max_participants - Nombre max. de participants
 * @param {string} updates.status - Statut de la disponibilité (ex: active, annulée)
 * @param {number} updates.is_available - Disponibilité active ou non
 * @returns 
 */
async updateAvailability(id, updates) {
    try {
        const [result] = await this.pool.query(
            `UPDATE ${this.table} SET date = ?, start_time = ?, end_time = ?, 
            max_participants = ?, status = ?, updated_at = NOW(), is_available= ?  WHERE id = ?`,
            [updates.date,
            updates.start_time,
            updates.end_time,
            updates.max_participants ?? 0,
            updates.status ?? "active",
            updates.is_available ?? 1,
            id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("❌ ERREUR SQL updateAvailability:", error);
        throw new Error("Erreur lors de la mise à jour des disponibilites");
    }
}
/****************************Fonction de suppression des disponibilités********************************** */
/**
 * 
 * @param {number} id
 * @property {number} id - ID de la disponibilité
 * @property {number} activity_id - ID de l'activité
 * @property {string} date - Date de la disponibilité
 * @property {string} start_time - Heure de début
 * @property {string} end_time - Heure de fin
 * @property {number} max_participants - Nombre maximum de participants
 * @property {string} status - Statut de la disponibilité
 * @property {string} created_at - Date de création
 * @property {string} updated_at - Date de mise à jour
 * @property {number} is_available - Disponibilité active ou non
 * @returns 
 */
async deleteAvailability(id) {
    try {
        const [result] = await this.pool.query(
            `DELETE FROM ${this.table} WHERE id = ?`, [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error("❌ ERREUR SQL deleteAvailability:", error);
        throw new Error("Erreur lors de la suppression des disponibilites");
    }
}
/****************************Fonction de récupération des disponibilités par ID********************************** */
/**
 * 
 * @param {number} id
 * @property {number} id - ID de la disponibilité
 * @property {number} activity_id - ID de l'activité
 * @property {string} date - Date de la disponibilité
 * @property {string} start_time - Heure de début
 * @property {string} end_time - Heure de fin
 * @property {number} max_participants - Nombre maximum de participants
 * @property {string} status - Statut de la disponibilité
 * @property {string} created_at - Date de création
 * @property {string} updated_at - Date de mise à jour
 * @property {number} is_available - Disponibilité active ou non
 * @returns 
 */
async getAvailabilityById(id) {
    try {
        const [rows] = await this.pool.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return rows[0] || null;
    } catch (error) {
        console.error("❌ ERREUR SQL getAvailabilityById:", error);
        throw new Error("Erreur lors de la récupération de la disponibilité");
    }
}

/****************************Fonction de vérification des disponibilités********************************** */
/**
 * 
 * @param {Object} param0 
 * @param {number} param0.activity_id - ID de l'activité
 * @param {string} param0.date - Date de la disponibilité
 * @param {string} param0.start_time - Heure de début
 * @param {string} param0.end_time - Heure de fin
 * @param {number} param0.exclude_id - ID de la disponibilité à exclure
 * @property {number} id - ID de la disponibilité
 * @property {number} activity_id - ID de l'activité
 * @property {string} date - Date de la disponibilité
 * @property {string} start_time - Heure de début
 * @property {string} end_time - Heure de fin
 * @property {number} max_participants - Nombre maximum de participants
 * @property {string} status - Statut de la disponibilité
 * @property {string} created_at - Date de création
 * @property {string} updated_at - Date de mise à jour
 * @property {number} is_available - Disponibilité active ou non
 * @returns 
 */
async checkOverlap({ activity_id, date, start_time, end_time, exclude_id = null }) {
    try {
        // 🔄 Requête SQL améliorée avec exclusion de l'ID actuel lors de la mise à jour
        const query = `
        SELECT COUNT(*) AS count FROM ${this.table} 
        WHERE activity_id = ? 
            AND date = ? 
            AND (
                (start_time < ? AND end_time > ?)  -- 🔄 Chevauchement avant
                OR
                (start_time < ? AND end_time > ?)  -- 🔄 Chevauchement après
                OR
                (start_time >= ? AND end_time <= ?) -- 🔄 Inclus dans un créneau existant
            )
            ${exclude_id ? 'AND id != ?' : ''}
        LIMIT 1  -- 🔄 Ajout d'une limite pour optimisation
    `;
    
    const params = [
        activity_id, 
        date,
        start_time, end_time,
        start_time, end_time,
        start_time, end_time
    ];
    
    if (exclude_id) params.push(exclude_id);
    const [result] = await this.pool.query(query, params);
    const overlapDetected = result[0].count > 0;
 
    return overlapDetected;
    } catch (error) {
        console.error("❌ ERREUR SQL checkOverlap:", error);
        throw new Error("Erreur lors de la vérification des disponibilités");
    }
}




/****************************EXPORT****************************************** */
}
module.exports = AvailabilitiesModel;