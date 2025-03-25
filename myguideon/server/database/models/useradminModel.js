/**
 * @file  useradminModel.js
 * @description  User Admin Model pour la gestion des utilisateurs admin
 * @module  User Admin Model - Gestion des utilisateurs admin
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2025-03-10
 * 
 */
const AbstractModel = require("./AbstractModel");

class UserAdminModel extends AbstractModel {
    constructor() {
        super({ table: "user_admin" });
    }

    // Ajouter un admin (par défaut admin tiers = role_id: 4)
    /**
     * 
     * @param {Object} param0
     * @property {string} name - Nom de l'admin
     * @property {string} email - Email de l'admin
     * @property {string} password - Mot de passe de l'admin
     * @property {string} profile_image - Image de profil de l'admin
     * @property {number} role_id - ID du rôle de l'admin
     * @property {boolean} is_first_time - Premier login
     * @returns {Promise<number>} ID de l'admin ajouté
     *  
     */
    async addAdminUser({ name, email, password, profile_image = null, role_id = 4, is_first_time = true }) {
        const connection = await this.pool.getConnection();
        const query = `
          INSERT INTO ${this.table} (name, email, password, profile_image, role_id, is_first_time)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
    
        try {
          const [result] = await connection.execute(query, [name, email, password, profile_image, role_id, is_first_time]);
          return result.insertId;
        } finally {
          connection.release();
        }
      }

      // Récupérer tous les admins
      /**
       * 
       * @returns {Promise<Array>}
       * @property {number} id - ID de l'admin
       * @property {string} name - Nom de l'admin
       * @property {string} email - Email de l'admin
       * @property {string} password - Mot de passe de l'admin
       * @property {string} profile_image - Image de profil de l'admin
       * @property {number} role_id - ID du rôle de l'admin
       * @property {boolean} is_first_time - Premier login
       * 
       */
        async findAll() {
            const connection = await this.pool.getConnection();
            const query = ` SELECT * FROM ${this.table}`;
        
            try {
            const [rows] = await connection.execute(query);
            return rows;
            } finally {
            connection.release();
            }
        }

        // Récupérer un admin par son id
        /**
         * 
         * @param {number} id - ID de l'admin
         * @returns {Promise<Object>}
         * @property {number} id - ID de l'admin
         * @property {string} name - Nom de l'admin
         * @property {string} email - Email de l'admin
         * @property {string} password - Mot de passe de l'admin
         * @property {string} profile_image - Image de profil de l'admin
         * @property {number} role_id - ID du rôle de l'admin
         * @property {boolean} is_first_time - Premier login 
         * @returns 
         */
        async findById(id) {
            const connection = await this.pool.getConnection();
            const query = `SELECT * FROM ${this.table} WHERE id = ?`;
        
            try {
            const [rows] = await connection.execute(query, [id]);
            return rows[0]; 
            } finally {
            connection.release();
            }
        }

        // Récupérer un admin par son email
        /**
         * 
         * @param {string} email 
         * @property {number} id - ID de l'admin
         * @property {string} name - Nom de l'admin
         * @property {string} email - Email de l'admin
         * @property {string} password - Mot de passe de l'admin
         * @property {string} profile_image - Image de profil de l'admin
         * @property {number} role_id - ID du rôle de l'admin
         * @property {boolean} is_first_time - Premier login
         * @returns 
         */
        async findByEmail(email) {
            const connection = await this.pool.getConnection();
            const query = `SELECT * FROM ${this.table} WHERE email = ?`;
            try {
            const [rows] = await connection.execute(query, [email]);
            return rows[0];
            } finally {
            connection.release();
            }
        }

        // Mettre à jour les informations d'un admin
        /**
         * 
         * @param {Object} param0
         * @property {number} id - ID de l'admin
         * @property {string} name - Nom de l'admin
         * @property {string} email - Email de l'admin
         * @property {string} password - Mot de passe de l'admin
         * @property {string} profile_image - Image de profil de l'admin
         * @property {number} role_id - ID du rôle de l'admin
         * @property {boolean} is_first_time - Premier login
         * @returns
         *  
         */
        async updateUser({ id, name, email, password, profile_image, role_id, is_first_time }) {
            const connection = await this.pool.getConnection();
            const query = `
              UPDATE ${this.table}
              SET name = ?, email = ?, password = ?, profile_image = ?, role_id = ?,is_first_time = ?
              WHERE id = ?
            `;
        
            try {
              await connection.execute(query, [name, email, password, profile_image, role_id,is_first_time ,id]);
            } finally {
              connection.release();
            }
          }

            // Supprimer un admin
            /**
             * 
             * @param {number} id 
             * @property {number} id - ID de l'admin
             * @property {string} name - Nom de l'admin
             * @property {string} email - Email de l'admin
             * @property {string} password - Mot de passe de l'admin
             * @property {string} profile_image - Image de profil de l'admin
             * @property {number} role_id - ID du rôle de l'admin
             * @property {boolean} is_first_time - Premier login
             * @returns 
             */
        async deleteAdmin(id) {
            const connection = await this.pool.getConnection();
            const query = `DELETE FROM ${this.table} WHERE id = ?`;
        
            try {
                const [result] = await connection.execute(query, [id]);
                return result;
            } finally {
                connection.release();
            }
        }

        // générer un reset code
        /**
         * 
         * @param {string} email 
         * @param {string} resetCode
         * @property {number} id - ID de l'admin
         * @property {string} name - Nom de l'admin
         * @property {string} email - Email de l'admin
         * @property {string} password - Mot de passe de l'admin
         * @property {string} profile_image - Image de profil de l'admin
         * @property {number} role_id - ID du rôle de l'admin
         * @property {boolean} is_first_time - Premier login
         * @property {string} reset_code - Code de réinitialisation
         * @returns
         */
        async setResetCode(email, resetCode) {
            const connection = await this.pool.getConnection();
            const query = `UPDATE ${this.table} SET reset_code = ? WHERE email = ?`;
        
            try {
              await connection.execute(query, [resetCode, email]);
            } finally {
              connection.release();
            }
          }
        
        // vérifier un reset code
        /**
         * 
         * @param {string} email 
         * @param {string} code
         * @property {number} id - ID de l'admin
         * @property {string} name - Nom de l'admin
         * @property {string} email - Email de l'admin
         * @property {string} password - Mot de passe de l'admin
         * @property {string} profile_image - Image de profil de l'admin
         * @property {number} role_id - ID du rôle de l'admin
         * @property {boolean} is_first_time - Premier login
         * @property {string} reset_code - Code de réinitialisation
         * @returns 
         */
        async verifyResetCode(email, code) {
            const connection = await this.pool.getConnection();
            const query = `SELECT * FROM ${this.table} WHERE email = ? AND reset_code = ?`;
        
            try {
            const [rows] = await connection.execute(query, [email, code]);
            return rows[0];
            } finally {
            connection.release();
            }
        }

         // Mettre à jour le mot de passe après reset
         /**
          * 
          * @param {string} email 
          * @param {string} hashedPassword
          * @property {number} id - ID de l'admin
          * @property {string} name - Nom de l'admin
          * @property {string} email - Email de l'admin
          * @property {string} password - Mot de passe de l'admin
          * @property {string} profile_image - Image de profil de l'admin
          * @property {number} role_id - ID du rôle de l'admin
          * @property {boolean} is_first_time - Premier login
          * @property {string} reset_code - Code de réinitialisation
          * @returns 
          */
        async updatePassword(email,hashedPassword) {
            const connection = await this.pool.getConnection();
            const query = `UPDATE ${this.table} SET password = ?, reset_code = NULL, is_first_time = NULL WHERE email = ?`;
        
            try {
              await connection.execute(query, [hashedPassword, email]);
            } finally {
              connection.release();
            }
          }

            // Récupérer les permissions d'un admin
            /**
             * 
             * @param {number} id 
             * @property {number} id - ID de l'admin
             * @property {string} name - Nom de l'admin
             * @property {string} email - Email de l'admin
             * @property {string} password - Mot de passe de l'admin
             * @property {string} profile_image - Image de profil de l'admin
             * @property {number} role_id - ID du rôle de l'admin
             * @property {boolean} is_first_time - Premier login
             * @property {string} reset_code - Code de réinitialisation
             * @returns 
             */
        async findPermissions(id) {
            const connection = await this.pool.getConnection();
            const query = "SELECT p.name, p.description FROM permissions p JOIN role_permissions rp on rp.permission_id = p.id JOIN user_admin ua on ua.role_id = rp.role_id WHERE ua.id = ?";
            
            try {
              const [rows] = await connection.execute(query, [id]);
              return rows;
            }
            finally {
              connection.release();
            }
        }

        // Ajouter des permissions
        /**
         * 
         * @param {string} name 
         * @param {string} description 
         * @property {number} id - ID de l'admin
         * @property {string} name - Nom de l'admin
         * @property {string} email - Email de l'admin
         * @property {string} password - Mot de passe de l'admin
         * @property {string} profile_image - Image de profil de l'admin
         * @property {number} role_id - ID du rôle de l'admin
         * @property {boolean} is_first_time - Premier login
         * @property {string} reset_code - Code de réinitialisation
         * @returns 
         */
        async addPermissions(name, description) {
            const connection = await this.pool.getConnection();
            const query = "INSERT INTO permissions (name, description) VALUES (?, ?)";
        
            try {
              const [result] = await connection.execute(query, [name, JSON.stringify(description)]);
              return result.insertId;
            } finally {
              connection.release();
            }
          }

          //Attribuer des permissions à un rôle
          /**
           * 
           * @param {number} roleId
           * @param {number} permissionId 
           * @property {number} id - ID de l'admin
           * @property {string} name - Nom de l'admin
           * @property {string} email - Email de l'admin
           * @property {string} password - Mot de passe de l'admin
           * @property {string} profile_image - Image de profil de l'admin
           * @property {number} role_id - ID du rôle de l'admin
           * @property {boolean} is_first_time - Premier login
           * @property {string} reset_code - Code de réinitialisation
           * @returns
           */
        async assignPermissions(roleId, permissionId) {
            const connection = await this.pool.getConnection();
            const query = "INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)";
            try {
              await connection.execute(query, [roleId, permissionId]);
            } finally {
              connection.release();
            }
          }
        
            // Mettre à jour les permissions d'un rôle
            /**
             * 
             * @param {number} roleId 
             * @param {number} permissions 
             * @property {number} id - ID de l'admin
             * @property {string} name - Nom de l'admin
             * @property {string} email - Email de l'admin
             * @property {string} password - Mot de passe de l'admin
             * @property {string} profile_image - Image de profil de l'admin
             * @property {number} role_id - ID du rôle de l'admin
             * @property {boolean} is_first_time - Premier login
             * @property {string} reset_code - Code de réinitialisation
             * @returns
             */
        async updatePermissions(roleId, permissions) {
            const connection = await this.pool.getConnection();
            const query = "UPDATE role_permissions SET permission_id = ? WHERE role_id = ?";
        
            try {
              await connection.execute(query, [permissions, roleId]);
            } finally {
              connection.release();
            }
          }
        }

  
module.exports = UserAdminModel;
