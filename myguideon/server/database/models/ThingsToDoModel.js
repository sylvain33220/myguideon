/**
 * @file  ThingsToDoModel.js
 * @description  Gestion de la table things_to_do dans la base de données.
 * @module  ThingsToDoModel - Model
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2021-05-10
 */

const AbstractModel = require('./AbstractModel');

class ThingsToDoModel extends AbstractModel {
    constructor() {
        super ({table: "things_to_do"});
    }
/**
 * 
 * @param {*} data 
 * @returns 
 */
    async addThingsToDo(data) {
        const [result] = await this.pool.query(
            `INSERT INTO ${this.table} (name, adress, destination_id, description,
                 longitude, latitude, icon, destination_name, category, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,     
            [data.name, data.adress, data.destination_id, data.description, data.longitude, 
                data.latitude, data.icon, data.destination_name, data.category,
                 data.status]
        );
        return result.insertId;
    }

    /**
     * 
     * @param {number} id 
     * @param {*} data 
     * @returns 
     */
    async updateThingsToDo(id,data) {
        const [result] = await this.pool.query(
            ` UPDATE ${this.table} SET 
            name = ?, adress = ?, destination_id = ?, description = ?, longitude = ?, latitude = ?, icon = ?, 
            destination_name = ?, category = ?, status = ?, updated_at = NOW() 
            WHERE id = ?
            `,
            [data.name, data.adress, data.destination_id, data.description, data.longitude, data.latitude, data.icon, data.destination_name, data.category, data.status, id]
        );
        return result.affectedRows;
    } 

    /**
     * 
     * @param {number} id 
     * @returns 
     */
    async deleteThingsToDo(id) {
        const [result] = await this.pool.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return result.affectedRows;
    }

    /**
     * 
     * @param {number} id 
     * @returns 
     */
    async getThingsToDoById(id) {
        const [result] = await this.pool.query(
            `SELECT td.*, i.url AS gallery_url 
            FROM things_to_do AS td
            LEFT JOIN images AS i ON i.owner_id = td.id AND i.owner_type = 'things_to_do'
            WHERE td.id = ?`,
            [id]
        );
        return result 
    }

    /**
     * 
     * @returns 
     */
    async getAllThingsToDo() {
        const [result] = await this.pool.query(
            `SELECT * FROM ${this.table}`
        );
        return result;
    }

}

module.exports = ThingsToDoModel;