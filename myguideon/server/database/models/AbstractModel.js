/**
 * @file AbstarctModel.js
 * @description Classe abstraite pour les modèles de données
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const { pool } = require('../client');

class AbstractModel {
  async getConnection() {
    if (!this.pool) throw new Error("Pool de connexion non défini !");
    return await this.pool.getConnection();
  }

  constructor({ table }) {
    if (this.constructor === AbstractModel) {
      throw new TypeError("Abstract class 'AbstractModel' cannot be instantiated directly");
    }

    this.table = table;
    this.pool = pool;  // ✅ Correctement placé
  }
}

module.exports = AbstractModel;
