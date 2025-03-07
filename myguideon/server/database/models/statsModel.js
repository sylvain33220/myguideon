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

module.exports = {
    fetchActivitiesStats,
    fetchRevenueStats,
    fetchRatingsStats
};
