/**
 * @file statsModel.js
 * @description Proxy pour les statistiques de l'application 
 * Ce fichier regroupe toutes les statistiques de l'application
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const {pool} = require('../client');

// 📊 Nombre de réservations par activité
/**
 * 
 * @returns {Promise<Array>}
 * @property {string} name - Nom de l'activité
 * @property {number} total_reservations - Nombre total de réservations
 */
const fetchActivitiesStats = async () => {
    const [rows] = await pool.query(`
        SELECT a.name, COUNT(r.id) AS total_reservations
        FROM activities a
        LEFT JOIN reservations r ON a.id = r.activity_id
        GROUP BY a.id
    `);
    return rows;
};

// 💰 Revenu par activité
/**
 * 
 * @returns {Promise<Array>}
 * @property {string} name - Nom de l'activité
 * @property {number} total_revenue - Revenu total
 * 
 */
const fetchRevenueStats = async () => {
    const [rows] = await pool.query(`
        SELECT a.name, SUM(r.total_amount) AS total_revenue
        FROM activities a
        LEFT JOIN reservations r ON a.id = r.activity_id
        GROUP BY a.id
    `);
    return rows;
};

// ⭐ Moyenne des notes et nombre d’avis par activité
/**
 * 
 * @returns {Promise<Array>} 
 * @property {string} name - Nom de l'activité
 * @property {number} average_rating - Note moyenne
 * @property {number} total_reviews - Nombre d'avis
 * 
 */
const fetchRatingsStats = async () => {
    const [rows] = await pool.query(`
        SELECT a.name, AVG(f.rating) AS average_rating, COUNT(f.id) AS total_reviews
        FROM activities a
        LEFT JOIN feedbacks f ON a.id = f.activity_id
        GROUP BY a.id
    `);
    return rows;
};

// Note moyenne et total de feedbacks par activité
const fetchFeedbackStatsByActivity = async () => {
    const [rows] = await pool.query(
        `SELECT 
        fb.activity_id,
        a.name AS activity_name,
        COUNT(fb.id) AS total_feedbacks,
        ROUND(AVG(fb.rating), 1) AS average_rating
      FROM feedbacks fb
      JOIN activities a ON fb.activity_id = a.id
      WHERE fb.activity_id IS NOT NULL
      GROUP BY fb.activity_id
      ORDER BY average_rating DESC`
    );
    return rows;
}

// Note moyenne et total de feedbacks par things_to_do
const fetchFeedbackStatsByThingsToDo = async () => {
    const [rows] = await pool.query(
        `SELECT 
        fb.things_to_do_id,
        td.name AS things_to_do_name,
        COUNT(fb.id) AS total_feedbacks,
        ROUND(AVG(fb.rating), 1) AS average_rating
      FROM feedbacks fb
      JOIN things_to_do td ON fb.things_to_do_id = td.id
      WHERE fb.things_to_do_id IS NOT NULL
      GROUP BY fb.things_to_do_id
      ORDER BY average_rating DESC`
    );
    return rows;
}

module.exports = {
    fetchActivitiesStats,
    fetchRevenueStats,
    fetchRatingsStats,
    fetchFeedbackStatsByActivity,
    fetchFeedbackStatsByThingsToDo
};
