/**
 * @file RolePermissionsModel.js
 * @description Gestion des permissions pour les rôles
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
     * Récupère les permissions pour un rôle donné
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

    async updatePermission (roleId, permissionId) {
        await this.pool.query(
            `INSERT INTO ${this.table} (role_id, permission_id) VALUES (?, ?)`, 
            [roleId, permissionId]
        );
    }
    //ajouter un role a un utilisateur pro
    async addRoleToUserPro(userProId, roleId) {
        try {
            const [result] = await this.pool.query(
                "INSERT INTO userpro_role_id (userpro_id, role_id) VALUES (?, ?)", 
                [userProId, roleId]
            )
            return result.insertId;
        } catch (err) {
            console.error("Erreur lors de l attribution du role",err);
            throw err;
        }
    }

    //supprimer un role a un utilisateur pro
    async deleteRoleToUserPro(userProId, roleId) {
        try {
            const [result] = await this.pool.query(
                "DELETE FROM userpro_role_id WHERE userpro_id = ? AND role_id = ?", 
                [userProId, roleId]
            )
            return result.insertId;
        } catch (err) {
            console.error("Erreur lors de la suppression du role",err);
            throw err;
        }
    }

    //ajouter une permission a un rôle
    async addPermissionToRole(roleId, permissionId) {
        try {
            const [result] = await this.pool.query(
                "INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)", 
                [roleId, permissionId]
            )
            return result.insertId;
        } catch (err) {
            console.error("Erreur lors de l attribution de la permission",err);
            throw err;
        }
    }
    //supprimer un rôle ou une permission
    async removeRoleOrPermission(type,id) {
        try {
            const table = type === 'role'? 'userpro_role_id' : 'role_permissions';
            const column = type === 'role'? 'role_id' : 'permission_id';

            const [result] = await this.pool.query(
                `DELETE FROM ${table} WHERE ${column} = ?`, 
                [id]
            )
            return result.insertId;
        } catch (err) {
            console.error("Erreur lors de la suppression du role ou de la permission",err);
            throw err;
        }
    }

}

module.exports = RolePermissionsModel;
