/**
 * @file OrderModel.js
 * @description Model pour les commandes des paniers
 * Ce fichier gère les requêtes de la table cart_orders
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const AbstractModel = require('./AbstractModel');

class OrderModel extends AbstractModel {
  constructor() {
    super ({table: 'cart_orders'});
  }

  /**
   * 
   * @param {number} userId 
   * @param {number} totalAmount 
   * @returns 
   */
  async createOrder(userId,userproId, totalAmount) {
    try {
        const [result] = await this.pool.query(
            `INSERT INTO ${this.table} (user_id,userpro_id ,total_amount,status, created_at) VALUES (?, ?, ?,'pending',NOW())`,
            [userId || null ,userproId || null, totalAmount]
        )
        return result.insertId;
        } catch (error) {
        console.error('Erreur lors de la création de la commande', error);
        throw error;
        }
    }
   /**
    * 
    * @param {number} orderId 
    * @param {string} status 
    * @returns 
    */
    async updateOrderStatus(orderId, status) {
        try {
            const [result] = await this.pool.query(
                `UPDATE ${this.table} SET status = ? , updated_at =NOW() WHERE id = ?`,
                [status, orderId]
            );
        return result.affectedRows;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de la commande', error);
            throw error;
        }
    }

    async getOrderById(orderId) {
        const [rows] = await this.pool.query(
            `SELECT id, total_amount, status, created_at, updated_at FROM ${this.table} WHERE id = ?`,
            [orderId]
        );
        return rows[0] || null;
    }

    /**
     * @param {number} orderId
     * @returns {Promise<Object|null>} Order or null if not found
     */
    async getOrdersByUserId(userId) {
        const [rows] = await this.pool.query(
            `SELECT id, total_amount, status, created_at , updated_at FROM ${this.table} WHERE user_id = ?`,
            [userId]
        );
        return rows;
    }

    async deleteOrder(orderId) {
        try {
            const [result] = await this.pool.query(
                `DELETE FROM ${this.table} WHERE id = ?`,
                [orderId]
            );
            return result.affectedRows;
        } catch (error) {
            console.error('Erreur lors de la suppression de la commande', error);
            throw error;
        }
    }
    async getAllOrders() {
        const [rows] = await this.pool.query(
            `SELECT * FROM ${this.table}`
        );
        return rows;
    }

    async getAllOrdersByUserproId(userproId) {
        const [rows] = await this.pool.query(
            `SELECT * FROM ${this.table} WHERE userpro_id = ?`,
            [userproId]
        );
        return rows;
    }

    async getAllOrdersByUserClientId(userId) {
        const [rows] = await this.pool.query(
            `SELECT * FROM ${this.table} WHERE user_id = ?`,
            [userId]
        );
        return rows;
    }

    // Add the following method to the OrderModel class:
    }
    module.exports = OrderModel;
