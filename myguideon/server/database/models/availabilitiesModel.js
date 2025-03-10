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
async getAllAvailabilities() {
    const [rows] = await this.pool.query(
        `SELECT id, activity_id, date, start_time, end_time, max_participants, status, created_at, updated_at
         FROM ${this.table}`
    )
    return rows;
}
/****************************Fonction de récupération des disponibilités par ID d'activité********************************** */
async getAvailabilitiesByActivityId(activity_id) {
    const [rows] = await this.pool.query(
        `SELECT id, date, start_time, end_time, max_participants, status, created_at, updated_at 
         FROM ${this.table} WHERE activity_id = ?`, 
        [activity_id]
    );
    return rows;
}
/****************************Fonction d'ajout des disponibilités********************************** */
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