/**
 * @file feedbacksModel.js
 * @description  FeedbacksModel est un modèle de données pour la table feedbacks
 * @module  FeedbacksModel 
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const AbstractModel = require('./AbstractModel');


class FeedbacksModel extends AbstractModel {
    constructor() {
        super({table:'feedbacks'});
    }

    /**
     * 
     * @param {*} param0 
     * @param {number} param0.activity_id
     * @param {number} param0.user_id
     * @param {number} param0.things_to_do_id
     * @param {number} param0.rating
     * @param {string} param0.comment
     * @property {number} activity_id - ID de l'activité
     * @property {number} user_id - ID de l'utilisateur
     * @property {number} things_to_do_id - ID de la chose à faire
     * @property {number} rating - Note
     * @property {string} comment - Commentaire
     * @returns 
     */
    async createFeedbacks({ activity_id, user_id,things_to_do_id ,rating, comment }) {
        const [result] = await this.pool.query(
            `INSERT INTO ${this.table} (activity_id, user_id,things_to_do_id, rating, comment,created_at ) VALUES (?, ?, ?, ?, ?, NOW())`,
            [activity_id, user_id,things_to_do_id, rating, comment]
        );
        return result.insertId;
    }

    /**
     * 
     * @param {number} id 
     * @param {Object} param1
     * @param {number} param1.activity_id
     * @param {number} param1.user_id
     * @param {number} param1.things_to_do_id
     * @param {number} param1.rating
     * @param {string} param1.comment
     * @property {number} activity_id - ID de l'activité
     * @property {string} activity_name - Nom de l'activité
     * @property {number} things_to_do_id - ID de la chose à faire
     * @property {string} things_to_do_name - Nom de la chose à faire
     * @property {number} user_id - ID de l'utilisateur
     * @property {string} user_name - Nom de l'utilisateur
     * @property {number} rating - Note
     * @property {string} comment - Commentaire
     * @returns 
     */
    async updateFeedbacks(id, { activity_id, user_id,things_to_do_id, rating, comment }) {
        if (!id || Number.isNaN(id)) throw new Error("ID feedback invalide");
        const [result] =  await this.pool.query(
            `UPDATE ${this.table} SET activity_id = ?, user_id = ?,things_to_do_id = ?, rating = ?, comment = ?, updated_at = NOW() WHERE id = ?`,
            [activity_id, user_id,things_to_do_id, rating, comment, id]
        );
        return result.affectedRows;
    }

    /**
     * @property {number} activity_id - ID de l'activité
     * @property {string} activity_name - Nom de l'activité
     * @property {number} things_to_do_id - ID de la chose à faire
     * @property {string} things_to_do_name - Nom de la chose à faire
     * @property {number} user_id - ID de l'utilisateur
     * @property {string} user_name - Nom de l'utilisateur
     * @property {number} rating - Note
     * @property {string} comment - Commentaire
     * @property {string} created_at - Date de création
     * @property {string} updated_at - Date de mise à jour
     * @property {number} total_feedbacks - Nombre total de feedbacks
     * @property {number} average_rating - Note moyenne
     * @returns {Promise<Object[]>} All feedbacks
     * 
     * 
     */
    async findAllFeedbacks() {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            ORDER BY fb.created_at DESC
            `
        );
        return rows;
    }

    /**
     * 
     * @param {number} id 
     * @property {number} activity_id - ID de l'activité
     * @property {string} activity_name - Nom de l'activité
     * @property {number} things_to_do_id - ID de la chose à faire
     * @property {string} things_to_do_name - Nom de la chose à faire
     * @property {number} user_id - ID de l'utilisateur
     * @property {string} user_name - Nom de l'utilisateur
     * @property {number} rating - Note
     * @property {string} comment - Commentaire
     * @property {string} created_at - Date de création
     * @property {string} updated_at - Date de mise à jour
     * @property {number} total_feedbacks - Nombre total de feedbacks
     * @property {number} average_rating - Note moyenne
     * @returns 
     */
    async findFeedbackById(id) {
        if (!id) {
          console.warn("⚠️ ID vide dans findFeedbackById");
          return null;
        }
      
        const [rows] = await this.pool.query(
          `SELECT fb.id, fb.activity_id, a.name AS activity_name,
                  fb.things_to_do_id, td.name AS things_to_do_name,
                  fb.user_id, u.firstname AS user_name,
                  fb.rating, fb.comment, fb.created_at, fb.updated_at
           FROM ${this.table} fb
           LEFT JOIN activities a ON fb.activity_id = a.id
           LEFT JOIN things_to_do td ON fb.things_to_do_id = td.id
           LEFT JOIN user_client u ON fb.user_id = u.id
           WHERE fb.id = ?`,
          [id]
        );
      
        return rows[0];
      }

      /**
       * 
       * @param {number} id 
       * @property {number} activity_id - ID de l'activité
       * @property {string} activity_name - Nom de l'activité
       * @property {number} things_to_do_id - ID de la chose à faire
       * @property {string} things_to_do_name - Nom de la chose à faire
       * @property {number} user_id - ID de l'utilisateur
       * @property {string} user_name - Nom de l'utilisateur
       * @property {number} rating - Note
       * @property {string} comment - Commentaire
       * @property {string} created_at - Date de création
       * @property {string} updated_at - Date de mise à jour
       * @returns 
       */
    async deleteFeedbacks(id) {
        const [result] = await this.pool.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return result.affectedRows;
    }

    /**
     * 
     * @param {number} activity_id
     * @property {number} activity_id - ID de l'activité
     * @property {string} activity_name - Nom de l'activité
     * @property {number} total_feedbacks - Nombre total de feedbacks
     * @property {number} average_rating - Note moyenne
     * @returns 
     */
    async findFeedbackByActivityId(activity_id) {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            WHERE fb.activity_id = ?
            ORDER BY fb.created_at DESC
            `
            [activity_id]
        );
        return rows;
    }

    /**
     * 
     * @param {number} user_id 
     * @property {number} activity_id - ID de l'activité
     * @property {string} activity_name - Nom de l'activité
     * @property {number} things_to_do_id - ID de la chose à faire
     * @property {string} things_to_do_name - Nom de la chose à faire
     * @property {number} user_id - ID de l'utilisateur
     * @property {string} user_name - Nom de l'utilisateur
     * @property {number} rating - Note
     * @property {string} comment - Commentaire
     * @property {string} created_at - Date de création
     * @property {string} updated_at - Date de mise à jour
     * @returns 
     */
    async findFeedbackByUserId(user_id) {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            WHERE fb.user_id = ?
            ORDER BY fb.created_at DESC
            `
            [user_id]
        );
        return rows;
    }

    /**
     * 
     * @param {number} things_to_do_id
     * @property {number} activity_id - ID de l'activité
     * @property {string} activity_name - Nom de l'activité
     * @property {number} things_to_do_id - ID de la chose à faire
     * @property {string} things_to_do_name - Nom de la chose à faire
     * @property {number} user_id - ID de l'utilisateur
     * @property {string} user_name - Nom de l'utilisateur
     * @property {number} rating - Note
     * @property {string} comment - Commentaire
     * @property {string} created_at - Date de création
     * @property {string} updated_at - Date de mise à jour 
     * @returns 
     */
    async findFeedbackByThingsToDoId(things_to_do_id) {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            WHERE fb.things_to_do_id = ?
            ORDER BY fb.created_at DESC
            `
            [things_to_do_id]
        );
        return rows;
    }

    /**
     * 
     * @param {number} rating
     * @property {number} activity_id - ID de l'activité
     * @property {string} activity_name - Nom de l'activité
     * @property {number} things_to_do_id - ID de la chose à faire
     * @property {string} things_to_do_name - Nom de la chose à faire
     * @property {number} user_id - ID de l'utilisateur
     * @property {string} user_name - Nom de l'utilisateur
     * @property {number} rating - Note
     * @property {string} comment - Commentaire
     * @property {string} created_at - Date de création
     * @property {string} updated_at - Date de mise à jour
     * @returns 
     */
    async findFeedbackByRating(rating) {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            WHERE fb.rating = ?
            ORDER BY fb.created_at DESC
            `
            [rating]
        );
        return rows;
    }


/************************************************************************** */
}

module.exports = FeedbacksModel;