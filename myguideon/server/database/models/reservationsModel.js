const AbstractModel = require("./AbstractModel");

class ReservationsModel extends AbstractModel {
    constructor() {
        super({ table: "reservations" });
    }
 /**
     * Crée une nouvelle réservation dans la base de données.
     * @async
     * @param {Object} reservation - Les données de la réservation.
     * @param {number} reservation.activity_id - ID de l'activité.
     * @param {string} reservation.date - Date de la réservation (format YYYY-MM-DD).
     * @param {number} reservation.total_amount - Montant total de la réservation.
     * @param {string} [reservation.status='pending'] - Statut de la réservation (par défaut: 'pending').
     * @returns {Promise<number>} L'ID de la nouvelle réservation.
     * @throws {Error} Si une erreur SQL se produit.
     */
    async createReservation(reservation){
        try {
            const {activity_id,date,total_amount,status ='pending'} = reservation;
            const [result] = await this.pool.query(
                `INSERT INTO ${this.table} (activity_id,date,total_amount,status,created_at,updated_at)
                VALUES (?,?,?,?,NOW(),NOW())`,
                [activity_id,date,total_amount,status]
            );

            return result.insertId;
        }
        catch(error){
            console.error("❌ Impossible de créer la réservation :",error);
            throw error;
        }
    }
    /**
     * @async
     * @param {number} id 
     * @returns {Promise<Object|null>} La réservation correspondant à l'ID fourni.
     * @throws {Error} Si une erreur SQL se produit.
     */
     async getReservationById(id){
        try {
            const [rows] = await this.pool.query(
                `SELECT id,activity_id,date,total_amount,status,created_at,updated_at
                FROM ${this.table} WHERE id = ?`,
                [id]
            );
            return rows[0];
        } catch (error) { 
            console.error("❌ Impossible de récupérer la réservation :",error);
            throw error;
        }
    }
    /**
     * @async
     * @returns {Promise<Array>} Toutes les réservations.
     * @throws {Error} Si une erreur SQL se produit.
     */
    async getAllReservations(){
        try {
            const [rows] = await this.pool.query(
                `SELECT id,activity_id,date,total_amount,status,created_at,updated_at
                FROM ${this.table} ORDER BY created_at DESC`
            );
            return rows;
        } catch (error) {
            console.error("❌ Impossible de récupérer les réservations :",error);
            throw error;
        }
    }    
    /**
     * @async
     * @param {number} activity_id 
     * @returns {Promise<Object[]>} Toutes les réservations pour une activité donnée.
     * @throws {Error} Si une erreur SQL se produit.
     */
    async getReservationsByActivityId(activity_id){
        const [rows] = await this.pool.query(
            `SELECT id,activity_id,date,total_amount,status,created_at,updated_at
            FROM ${this.table} WHERE activity_id = ?`,
            [activity_id]
        );
        return rows;
    }
    /**
     * @async
     * @param {number} id 
     * @param {Object} reservation 
     * @param {number} reservation.activity_id
     * @param {string} reservation.date
     * @param {number} reservation.total_amount
     * @param {string} reservation.status
     * @returns {Promise<boolean>} true si la réservation a été mise à jour, sinon false.
     * @throws {Error} Si une erreur SQL se produit.
     */
     
    async updateReservation(id,reservation){
        try {
            const {activity_id,date,total_amount,status} = reservation;
            const [result] = await this.pool.query(
                `UPDATE ${this.table} SET activity_id = ?,date = ?,total_amount = ?,status = ?,updated_at = NOW()
                WHERE id = ?`,
                [reservation.activity_id,reservation.date,reservation.total_amount,status,id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("❌ Impossible de mettre à jour la réservation :",error);
            throw error;
        }
        
    }
    /**
     * @async
     * @param {number} id 
     * @returns {Promise<boolean>} true si la réservation a été supprimée, sinon false.
     * @throws {Error} Si une erreur SQL se produit.
     * */
    async deleteReservation(id){
        try {
            const [result] = await this.pool.query(
                `DELETE FROM ${this.table} WHERE id = ?`,
                [id]
            );
            return result.affectedRows > 0;
        } catch(error){
            console.error("❌ Impossible de supprimer la réservation :",error);
            throw error;
        }
    }
}
module.exports = ReservationsModel;