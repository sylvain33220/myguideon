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
   * @param {Object} data
   * @param {number} data.user_id
   * @param {number} data.userpro_id
   * @param {number} data.total_amount
   * @param {number} data.quantity
   * @property {number} userId
   * @property {number} userproId
   * @property {number} total_amount
   * @property {string} status
   * @property {string} created_at
   * @property {string} updated_at
   * @property {number} quantity
   * @property {number} orderId
   * @returns 
   */
  async createOrder(data) {
    try {
        const [result] = await this.pool.query(
            `INSERT INTO ${this.table} (user_id,userpro_id ,total_amount,status, created_at, quantity)
             VALUES (?, ?, ?,'pending',NOW(), ? )`,
            [data.user_id, data.userpro_id, data.total_amount, data.quantity || 1]

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
    * @property {number} userId
    * @property {number} userproId
    * @property {number} total_amount
    * @property {string} status
    * @property {string} created_at
    * @property {string} updated_at
    * @property {number} quantity
    * @property {number} orderId
    * @returns 
    */
    async updateOrderStatus(orderId, status) {
        try {
            if (!orderId || Number.isNaN(Number.parseInt(orderId)))  {
                throw new Error("❌ ID ou statut manquant !");
            }

            const [result] = await this.pool.query(
                `UPDATE ${this.table} SET status = ? , updated_at = NOW() WHERE id = ?`,
                [status, Number.parseInt(orderId)]
            );
        return result.affectedRows;
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de la commande', error);
            throw error;
        }
    }

    /**
     * 
     * @param {number} orderId
     * @property {number} userId
     * @property {number} userproId
     * @property {number} total_amount
     * @property {string} status
     * @property {string} created_at
     * @property {string} updated_at
     * @property {number} quantity
     * @property {number} orderId
     * @returns 
     */
    async getOrderById(orderId) {
        const [rows] = await this.pool.query(
            `SELECT id, total_amount, status, created_at, updated_at FROM ${this.table} WHERE id = ?`,
            [orderId]
        );
        return rows[0] || null;
    }

    /**
     * @param {number} orderId
     * @property {number} userId
     * @property {number} userproId
     * @property {number} total_amount
     * @property {string} status
     * @property {string} created_at
     * @property {string} updated_at
     * @property {number} quantity
     * @property {number} orderId
     * @returns {Promise<Object|null>} Order or null if not found
     * @throws {Error} If an SQL error occurs
     */
    async getOrdersByUserId(userId) {
        const [rows] = await this.pool.query(
            `SELECT id, total_amount, status, created_at , updated_at FROM ${this.table} WHERE user_id = ?`,
            [userId]
        );
        return rows;
    }

    /**
     * 
     * @param {number} orderId
     * @property {number} userId
     * @property {number} userproId
     * @property {number} total_amount
     * @property {string} status
     * @property {string} created_at
     * @property {string} updated_at
     * @property {number} quantity
     * @property {number} orderId 
     * @returns 
     */
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
    /**
     * @property {number} userId
     * @property {number} userproId
     * @property {number} total_amount
     * @property {string} status
     * @property {string} created_at
     * @property {string} updated_at
     * @property {number} quantity
     * @property {number} orderId
     * @returns 
     */
    async getAllOrders() {
        const [rows] = await this.pool.query(
            `SELECT * FROM ${this.table}`
        );
        return rows;
    }

    /**
     * 
     * @param {number} userproId
     * @property {number} userId
     * @property {number} userproId
     * @property {number} total_amount
     * @property {string} status
     * @property {string} created_at
     * @property {string} updated_at
     * @property {number} quantity
     * @property {number} orderId
     * @returns 
     */
    async getAllOrdersByUserproId(userproId) {
        const [rows] = await this.pool.query(
            `SELECT * FROM ${this.table} WHERE userpro_id = ?`,
            [userproId]
        );
        return rows;
    }

    /**
     * 
     * @param {number} userId
     * @property {number} userId
     * @property {number} userproId
     * @property {number} total_amount
     * @property {string} status
     * @property {string} created_at
     * @property {string} updated_at
     * @property {number} quantity
     * @property {number} orderId
     * @returns 
     */
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
