/**
 * @file UserClientModel.js
 * @description Gestion des utilisateurs clients
 * @module UserClientModel
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2021-05-10
 * 
 */

const AbstractModel = require('./AbstractModel');
const { hashPassword, verifyPassword } = require('../../app/helpers/argonHelper');
const { generateToken } = require('../../app/helpers/jwtHelper');

class UserClientModel extends AbstractModel {
    constructor() {
        super({ table: 'user_client' });
    }
    /**
     * get all users
     * @returns {Promise<Object[]>} All users
     */
    async getAllUsersClient() {
        const [rows] = await this.pool.query(
            `SELECT id, firstname,lastname, email, phone,address,city,country,postal_code, profile_image FROM ${this.table}`
        );
        return rows;
    }

    /**
     * get a user by id
     * @param {number} id 
     * @returns {Promise<Object|null>} User or null if not found
     */
    async getUserClientById(id) {

        const [rows] = await this.pool.query(
            `SELECT id, firstname,lastname, email,password, phone,address,city,country,postal_code, profile_image FROM ${this.table} WHERE id = ?`, [id]
        );
        return rows[0];
    }

    /**
     * find a user by email
     * @param {string} email
     * @returns {Promise<Object|null>} User or null if not found
     * @throws {Error} If the email is invalid
     * @throws {Error} If the password is invalid
     * @throws {Error} If the user is not found
     * @throws {Error} If the password is invalid
     */
    async findUserClientByEmail(email) {
        try {
            const [rows] = await this.pool.query(
                `SELECT * FROM ${this.table} WHERE email = ? LIMIT 1`, [email]
            );
            return rows[0] || null;
        } catch (error) {
            console.error("❌ ERREUR SQL findUserClientByEmail:", error);
            throw new Error("Erreur lors de la recherche du userclient par email");
        }
    }

    /**
     * find a user by id
     * @param {number} id
     * @returns {Promise<Object|null>} User or null if not found
     * @throws {Error} If the id is invalid
     * @throws {Error} If the user is not found
        */
    async findUserClientById(id) {
        try {
            const [rows] = await this.pool.query(
                `SELECT id, firstname,lastname, email,password, phone,address,city,country,postal_code, profile_image FROM ${this.table} WHERE id = ?`, [id]
            );
            return rows[0];
        } catch (error) {
            console.error("❌ ERREUR SQL findUserClientById:", error);
            throw new Error("Erreur lors de la recherche du userclient par id");
        }
    }
    
    /**
     * login a user
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Object>} User
     * @throws {Error} If the email is invalid
     * @throws {Error} If the password is invalid
     * @throws {Error} If the user is not found
     */

    async loginUserClient(email, password) {
        try {
            const user = await this.findUserClientByEmail(email);
            if (!user) {
                throw new Error("L'utilisateur n'existe pas");
            }
            const isPasswordValid = await verifyPassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Le mot de passe est invalide");
            }
            const token = generateToken({ id: user.id, email: user.email });
            return { ...user, token };
        } catch (error) {
            console.error("❌ ERREUR SQL loginClient:", error);
            throw new Error("Erreur lors de la connexion du userclient");
        }
    }

    /**
     * add a new user
     * @param {Object} data
     * @returns {Promise<Object>} User
     * @throws {Error} If the email is already in use
     * @throws {Error} If the password is invalid
     */
    async AddUserClient(data) {
        try {
            // const hashedPassword = await hashPassword(data.password);
            const defaultRoleId = data.role_id || 2;
            const [result] = await this.pool.query(
                `INSERT INTO ${this.table} (firstname,lastname, email, password, phone,address,city,country,postal_code, profile_image,role_id, created_at, updated_at) 
        VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [data.firstname, data.lastname, data.email, data.password, data.phone, data.address, data.city, data.country, data.postal_code, data.profile_image, defaultRoleId]
            );
            const token = generateToken({ id: result.insertId, email: data.email, role_id: defaultRoleId });
            // return { id: result.insertId, token };
            return {id: result.insertId}
        } catch (error) {
            console.error("❌ ERREUR SQL AddUserClient:", error);
            throw new Error("Erreur lors de l'ajout du userclient");
        }
    }

    /**
     * update a user
     * @param {number} id
     * @param {Object} data
     * @returns {Promise<boolean>} True if the user was updated, false otherwise
     */
    async updateUserClient(id, data) {
        try { 
        const fields = [];
        const values = [];
        if (data.firstname) {
            fields.push('firstname = ?');
            values.push(data.firstname);
        }
        if (data.lastname) {
            fields.push('lastname = ?');
            values.push(data.lastname);
        }
        if (data.email) {
            fields.push('email = ?');
            values.push(data.email);
        }
        if (data.phone) {
            fields.push('phone = ?');
            values.push(data.phone);
        }
        if (data.address) {
            fields.push('address= ?');
            values.push(data.address);
        }
        if (data.city) {
            fields.push('city = ?');
            values.push(data.city);
        }
        if (data.country) {
            fields.push('country = ?');
            values.push(data.country);
        }
        if (data.postal_code) {
            fields.push('postal_code = ?');
            values.push(data.postal_code);
        }
        if (data.profile_image) {
            fields.push('profile_image = ?');
            values.push(data.profile_image);
        }
        if (data.password) {
            const hashedPassword = await hashPassword(data.password);
            fields.push('password = ?');
            values.push(hashedPassword);
        }
        values.push(id);
        const [result] = await this.pool.query(
            `UPDATE ${this.table} SET ${fields.join(', ')} WHERE id = ?`, values
        );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("❌ ERREUR SQL updateUserClient:", error);
            throw new Error("Erreur lors de la mise à jour du userclient");
        }
    }
    /**
     * update a user password
     * @param {number} id
     * @param {string} newpassword
     * @returns {Promise<boolean>} True if the password was updated, false otherwise
     * @throws {Error} If the password is invalid
     * @throws {Error} If the user is not found
     */
    async updatePassword (id, newpassword) {
        try {
            // const hashedPassword = await hashPassword(newpassword);
            const [result] = await this.pool.query(
                `UPDATE ${this.table} SET password = ? WHERE id = ?`,
                [newpassword, id]
            );
            return result.affectedRows === 1;
        } catch (error) {
            console.error("❌ ERREUR SQL updatePassword:", error);
            throw new Error("Erreur lors de la mise à jour du mot de passe du userclient");
        }
    }

    /**
     * authenticate a user
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Object>} User
     * @throws {Error} If the email is invalid
     * @throws {Error} If the password is invalid
     * @throws {Error} If the user is not found
     **/
    async authenticateUserClient(email, password) {
        try {
            const user = await this.findUserClientByEmail(email);
            if (!user) {
                throw new Error("L'utilisateur n'existe pas");
            }
            const isPasswordValid = await verifyPassword(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Le mot de passe est invalide");
            }
            return user;
        } catch (error) {
            console.error("❌ ERREUR SQL authenticateUserClient:", error);
            throw new Error("Erreur lors de l'authentification du userclient");
        }
    }
    /**
     * delete a user
     * @param {number} id
     * @returns {Promise<boolean>} True if the user was deleted, false otherwise
     */
    // async deleteUserClient(id) {
    //     try {
    //         const user = await this.findUserClientById(id);
    //         if (!user) {
    //             throw new Error("L'utilisateur n'existe pas");
    //         }
    //         const [result] = await this.pool.query(
    //             `DELETE FROM ${this.table} WHERE id = ?`,
    //             [id]
    //         );
    //         return result.affectedRows === 1;
    //     } catch (error) {
    //         console.error("❌ ERREUR SQL deleteUserClient:", error);
    //         throw new Error("Erreur lors de la suppression du userclient");
    //     }
    // }
    async deleteUserClient(id) {
        try {
               const [result] = await this.pool.query(
                `DELETE FROM ${this.table} WHERE id = ?`,
                [id]
            );
            if (result.affectedRows === 0) {
                throw new Error("L'utilisateur n'existe pas");
            }
            return true; // ✅ Retourne `true` si supprimé
        } catch (error) {
            console.error("❌ ERREUR SQL deleteUserClient:", error);
            throw new Error("Erreur lors de la suppression du userclient");
        }
    }
    
// ******************************************************************************************************/
}
module.exports = UserClientModel;