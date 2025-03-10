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
    const [result] = await this.pool.query(
        `INSERT INTO ${this.table} (user_id,userproId ,total_amount,status, created_at = NOW(), VALUES (?, ?,?,'pending')`,
        [userId || null ,userproId || null, totalAmount]
    )
    return result.insertId;
    } catch (error) {
     console.error('Erreur lors de la création de la commande', error);
     throw error;

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
    // Add the following method to the OrderModel class:
    }
    module.exports = OrderModel;
