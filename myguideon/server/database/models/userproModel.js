/**
 * @file userproModel.js
 * @description Gestion des utilisateurs professionnels
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03
 */
const AbstractModel = require("./AbstractModel");
const { hashPassword, verifyPassword } = require('../../app/helpers/argonHelper');                                                              
const { generateToken } = require('../../app/helpers/jwtHelper');

class UserProModel extends AbstractModel {
  constructor() {
    super({table: "userpro"});
    }

/**
 * get all users
 * @returns {Promise<Object[]>} All users
 */
async getAllUsersPro() {
    const [rows] = await this.pool.query(
        `SELECT  id,name,company_name,address,email,phone,description,profile_image FROM ${this.table}`
    )
    return rows;
}
/**
 * get a user by id
 * @param {number} id
 * @property {number} id
 * @property {string} name
 * @property {string} company_name
 * @property {string} email
 * @property {string} phone 
 * @property {string} profile_image
 * @property {string} password
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} role_id
 * @property {number} is_verified
 * @property {string} description
 * @property {string} address
 * 
 * @returns {Promise<Object|null>} User or null if not found
 */
async getUserProById(id) {

    const [rows] = await this.pool.query(
        `SELECT id,name,company_name,email,phone,profile_image, password FROM ${this.table} WHERE id = ?`, [id]
    )
    return rows[0];
}
/**
 * add a new user
 * @param {Object} data
 * @property {string} name
 * @property {string} company_name
 * @property {string} email
 * @property {string} phone
 * @property {string} password
 * @property {string} profile_image
 * @property {number} role_id
 * @property {number} is_verified
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} description
 * @property {string} address
 * @returns {Promise<Object>} User
 * @throws {Error} If the email is already in use
 * @throws {Error} If the password is invalid
 */
async AddUserPro(data) {
    try {
      const hashedPassword = await hashPassword(data.password);
      const defaultRoleId = data.role_id || 2;
  
      const [result] = await this.pool.query(
        `INSERT INTO ${this.table} (
          name, company_name, email, phone, password, profile_image,
          role_id, is_verified, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, NOW(), NOW())`,
        [
          data.name,
          data.company_name,
          data.email,
          data.phone,
          hashedPassword,
          data.profile_image,
          defaultRoleId,
        ]
      );
  
      const token = generateToken({
        id: result.insertId,
        email: data.email,
        role_id: defaultRoleId,
      });
  
      return { id: result.insertId, token };
  
    } catch (error) {
      console.error("❌ ERREUR SQL AddUserPro:", error);
      throw new Error("Erreur lors de l'ajout du userpro");
    }
  }
  

/**
 * update a user
 * @param {number} id 
 * @param {Object} data
 * @property {string} name
 * @property {string} company_name
 * @property {string} email
 * @property {string} phone
 * @property {string} password
 * @property {string} profile_image
 * @property {number} role_id
 * @property {number} is_verified
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} description
 * @property {string} address
 * @returns {Promise<boolean>} True if the user was updated, false otherwise
 * @throws {Error} If the user was not found
 * 
 */
async updateUserPro(id,data) {
    const fields = [];
    const values = [];
    if (data.company_name) {
        fields.push('company_name = ?');
        values.push(data.company_name);
    }
    if (data.email) {
        fields.push('email = ?');
        values.push(data.email);
    }
    if (data.phone) {
        fields.push('phone = ?');
        values.push(data.phone);
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
    return result.affectedRows > 0 ;
}

async updatePassword(id, newPassword) {
    const [result] = await this.pool.query(
        `UPDATE ${this.table} SET password = ? WHERE id = ?`, [newPassword, id]
    );
    return result.affectedRows > 0;
}

/**
 * delete a user
 * @param {number} id
 * @property {number} id
 * @property {string} name
 * @property {string} company_name
 * @property {string} email
 * @property {string} phone
 * @property {string} profile_image
 * @property {string} password
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} role_id
 * @property {number} is_verified
 * @property {string} description
 * @property {string} address
 * @returns {Promise<boolean>} True if the user was deleted, false otherwise
 * @throws {Error} If the user was not found
 * @throws {Error} If the user could not be deleted
 */
 
async deleteUserPro(id) {
    const [result] = await this.pool.query(
        `DELETE FROM ${this.table} WHERE id = ?`, [id]
    )
    return result.affectedRows > 0;
}
/**
 * 
 * @param {string} email 
 * @param {string} password
 * @property {number} id
 * @property {string} email
 * @property {string} password
 * @property {number} role_id
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} is_verified
 * @property {string} name
 * @property {string} company_name
 * @property {string} phone
  * @property {string} description
  * @property {string} address
  * @property {string} profile_image
  * @property {string} role_name
  * @property {string} role_description
 * @returns {Promise<Object|null>} User or null if not found
 * @throws {Error} If the password is invalid
 * @throws {Error} If the user is not found
 */

async authenticateUserPro(email, password) {
    const [rows] = await this.pool.query(`SELECT id, password, role_id FROM ${this.table} WHERE email = ?`,
     [email]);
    if (rows.length === 0) return null;

    const user = rows[0];
    const isValid = await verifyPassword(user.password, password);
    if (!isValid) return null;

    const token = generateToken({ id: user.id, email, role_id: user.role_id });
    return { id: user.id,role_id:user.role_id, token };
  }

  /**
   * 
   * @param {number} id
   * @property {number} id
   * @property {string} name
   * @property {string} company_name
   * @property {string} email
   * @property {string} phone
   * @property {string} profile_image
   * @property {string} password
   * @property {string} created_at
   * @property {string} updated_at
   * @property {number} role_id
   * @property {number} is_verified
   * @property {string} description
   * @property {string} address
   * @returns {Promise<boolean>} True if the user was validated, false otherwise
   * @throws {Error} If the user was not found
   * @throws {Error} If the user could not be validated
   */
  
  async validateUserProById(id) {
    const [result] = await this.pool.query(
      `UPDATE ${this.table} SET is_verified = 1 WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }

/**
 * 
 * @returns {Promise<Object[]>}
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} company_name
 * @property {string} phone
 * @property {string} created_at
 * 
 */
  async getUnverifiedUserPros() {
    const [rows] = await this.pool.query(
      `SELECT id, name, email, company_name, phone, created_at FROM ${this.table} WHERE is_verified = 0`
    );
    return rows;
  }
/*******************EXPORT****************************************************** */
}
module.exports = UserProModel;