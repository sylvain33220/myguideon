/**
 * @file RolePermissionsModel.js
 * @description Gestion des permissions pour les rôles
 * Ce fichier définit le modèle pour la gestion des permissions pour les rôles
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const AbstractModel = require('./AbstractModel');

class RolePermissionsModel extends AbstractModel {
    constructor() {
        super({ table: 'role_permissions' });
    }
    /**
     * 🔍 Récupère les permissions pour un rôle donné
     * @param {number} roleId - L'ID du rôle
     * @returns {Promise<Object[]>} - Liste des permissions
     */
    async getPermissionsByRoleId(roleId) {
        const [rows] = await this.pool.query(
            `SELECT p.name FROM role_permissions rp 
             INNER JOIN permissions p ON rp.permission_id = p.id
             WHERE rp.role_id = ?`, 
            [roleId]
        );
        return rows;
    }

    /**
     * ➕ Ajouter une permission à un rôle
     * @param {number} roleId - ID du rôle
     * @param {number} permissionId - ID de la permission
     * @returns {Promise<number>} - ID de la permission créée
     * @async
     * @throws {Error} - L'erreur retournée par MySQL
     */
    async addPermissionToRole(roleId, permissionId) {
        try {
            const [result] = await this.pool.query(
                "INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)", 
                [roleId, permissionId]
            );
            return result.insertId;
        } catch (err) {
            console.error("❌ Erreur lors de l'ajout de la permission au rôle :", err);
            throw err;
        }
    }
    /**
     * ➕ Ajouter une nouvelle permission
    *  @param {string} name - Nom de la permission
    * @param {string} description - Description de la permission
    * @returns {Promise<number>} - ID de la permission créée
    * @async
    * @throws {Error} - L'erreur retournée par MySQL
    */
   async addNewPermission(name, description) {
       try {
           const [result] = await this.pool.query(
               "INSERT INTO permissions (name, description) VALUES (?, ?)", 
               [name, description]
           );
           return result.insertId;
       } catch (err) {
           console.error("❌ Erreur lors de l'ajout d'une nouvelle permission :", err);
           throw err;
       }
   }

    /**
     * ❌ Supprimer une permission d'un rôle
     * @param {number} roleId - ID du rôle
     * @param {number} permissionId - ID de la permission
     * @returns {Promise<number>} - Nombre de lignes affectées
     * @throws {Error} - L'erreur retournée par MySQL
     * @async
     */
    async removePermissionFromRole(roleId, permissionId) {
        try {
            const [result] = await this.pool.query(
                "DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?", 
                [roleId, permissionId]
            );
            return result.affectedRows;
        } catch (err) {
            console.error("❌ Erreur lors de la suppression de la permission :", err);
            throw err;
        }
    }

    /**
     * 🏷️ Assigner un rôle à un utilisateur Pro
     * @param {number} userProId - L'ID de l'utilisateur Pro
     * @param {number} roleId - L'ID du rôle
     * @returns {Promise<number>} - Nombre de lignes affectées
     * @async
     * @throws {Error} - L'erreur retournée par MySQL
     */
    async assignRoleToUserPro(userProId, roleId) {
        try {
            const [result] = await this.pool.query(
                "UPDATE userpro SET role_id = ? WHERE id = ?", 
                [roleId, userProId]
            );
            return result.affectedRows;
        } catch (err) {
            console.error("❌ Erreur lors de l'assignation du rôle à userPro :", err);
            throw err;
        }
    }

    /**
 * 🏷️ Assigner un rôle à un utilisateur admin
 * @param {number} userAdminId - L'ID de l'admin
 * @param {number} roleId - L'ID du rôle
 * @returns {Promise<number>} - Nombre de lignes affectées
 * @async
 * @throws {Error} - L'erreur retournée par MySQL
 */
async assignRoleToUserAdmin(userAdminId, roleId) {
    try {
        const [result] = await this.pool.query(
            "UPDATE user_admin SET role_id = ? WHERE id = ?", 
            [roleId, userAdminId]
        );
        return result.affectedRows;
    } catch (err) {
        console.error("❌ Erreur assignRoleToUserAdmin:", err);
        throw err;
    }
}

    /**
     * ❌ Supprimer un rôle d’un utilisateur Pro
     * @param {number} userProId - L'ID de l'utilisateur Pro
     * @returns {Promise<number>} - Nombre de lignes affectées
     * @async
     * @throws {Error} - L'erreur retournée par MySQL
     */
    async removeRoleFromUserPro(userProId) {
        try {
            const [result] = await this.pool.query(
                "UPDATE userpro SET role_id = NULL WHERE id = ?", 
                [userProId]
            );
            return result.affectedRows;
        } catch (err) {
            console.error("❌ Erreur lors de la suppression du rôle de userPro :", err);
            throw err;
        }
    }
}

module.exports = RolePermissionsModel;
