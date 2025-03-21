const AbstractModel = require('./AbstractModel');


class FeedbacksModel extends AbstractModel {
    constructor() {
        super({table:'feedbacks'});
    }


    async createFeedbacks({ activity_id, user_id,things_to_do_id ,rating, comment }) {
        const [result] = await this.pool.query(
            `INSERT INTO ${this.table} (activity_id, user_id,things_to_do_id, rating, comment,created_at ) VALUES (?, ?, ?, ?, ?, NOW())`,
            [activity_id, user_id,things_to_do_id, rating, comment]
        );
        return result.insertId;
    }

    async updateFeedbacks(id, { activity_id, user_id,things_to_do_id, rating, comment }) {
        if (!id || Number.isNaN(id)) throw new Error("ID feedback invalide");
        const [result] =  await this.pool.query(
            `UPDATE ${this.table} SET activity_id = ?, user_id = ?,things_to_do_id = ?, rating = ?, comment = ?, updated_at = NOW() WHERE id = ?`,
            [activity_id, user_id,things_to_do_id, rating, comment, id]
        );
        return result.affectedRows;
    }

    async findAllFeedbacks() {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            ORDER BY fb.created_at DESC
            `
        );
        return rows;
    }

    async findFeedbackById(id) {
        if (!id) {
          console.warn("⚠️ ID vide dans findFeedbackById");
          return null;
        }
      
        const [rows] = await this.pool.query(
          `SELECT fb.id, fb.activity_id, a.name AS activity_name,
                  fb.things_to_do_id, td.name AS things_to_do_name,
                  fb.user_id, u.firstname AS user_name,
                  fb.rating, fb.comment, fb.created_at, fb.updated_at
           FROM ${this.table} fb
           LEFT JOIN activities a ON fb.activity_id = a.id
           LEFT JOIN things_to_do td ON fb.things_to_do_id = td.id
           LEFT JOIN user_client u ON fb.user_id = u.id
           WHERE fb.id = ?`,
          [id]
        );
      
        return rows[0];
      }

    async deleteFeedbacks(id) {
        const [result] = await this.pool.query(
            `DELETE FROM ${this.table} WHERE id = ?`,
            [id]
        );
        return result.affectedRows;
    }

    async findFeedbackByActivityId(activity_id) {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            WHERE fb.activity_id = ?
            ORDER BY fb.created_at DESC
            `
            [activity_id]
        );
        return rows;
    }

    async findFeedbackByUserId(user_id) {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            WHERE fb.user_id = ?
            ORDER BY fb.created_at DESC
            `
            [user_id]
        );
        return rows;
    }

    async findFeedbackByThingsToDoId(things_to_do_id) {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            WHERE fb.things_to_do_id = ?
            ORDER BY fb.created_at DESC
            `
            [things_to_do_id]
        );
        return rows;
    }

    async findFeedbackByRating(rating) {
        const [rows] = await this.pool.query(
            `
            SELECT fb.id, fb.activity_id, a.name AS activity_name,
                   fb.things_to_do_id, td.name AS things_to_do_name,
                   fb.user_id, u.firstname AS user_name,
                   fb.rating, fb.comment, fb.created_at, fb.updated_at
            FROM ${this.table} AS fb
            LEFT JOIN activities AS a ON fb.activity_id = a.id
            LEFT JOIN things_to_do AS td ON fb.things_to_do_id = td.id
            LEFT JOIN user_client AS u ON fb.user_id = u.id
            WHERE fb.rating = ?
            ORDER BY fb.created_at DESC
            `
            [rating]
        );
        return rows;
    }


/************************************************************************** */
}

module.exports = FeedbacksModel;