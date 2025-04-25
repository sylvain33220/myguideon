const AbstractModel = require('./AbstractModel');

class MessagesModel extends AbstractModel {
    constructor() {
        super({ table: 'messages' });
    }
    /**
     * 
     * @param {*} param0 
     * @param {number} param0.sender_id
     * @param {string} param0.sender_type
     * @param {number} param0.receiver_id
     * @param {string} param0.receiver_type
     * @param {string} param0.content
     * @param {string} param0.media_url
     * @property {number} sender_id
     * @property {string} sender_type
     * @property {number} receiver_id
     * @property {string} receiver_type
     * @property {string} content
     * @property {string} media_url
     * @property {string} created_at
     * @property {number} messageId
     * @returns 
     */
     // Créer un message
    async createMessage({ sender_id, sender_type, receiver_id, receiver_type, content, media_url }) {
        const [result] = await this.pool.query(
          `INSERT INTO ${this.table} (sender_id, sender_type, receiver_id, receiver_type, content, media_url)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [sender_id, sender_type, receiver_id, receiver_type, content, media_url]
        );
        return result.insertId;
    }  

    /**
     * 
     * @param {number} messageId 
     * @param {string} status
     * @property {number} sender_id
     * @property {string} sender_type
     * @property {number} receiver_id
     * @property {string} receiver_type
     * @property {string} content
     * @property {string} media_url
     * @property {string} created_at
     * @property {number} messageId
     * @returns 
     */
    // Récupérer les messages entre deux utilisateurs (conversation)
    async getConversation({ sender_id, receiver_id }) {
        const [rows] = await this.pool.query(
          `SELECT * FROM ${this.table}
           WHERE (sender_id = ? AND receiver_id = ?)
              OR (sender_id = ? AND receiver_id = ?)
           ORDER BY created_at ASC`,
          [sender_id, receiver_id, receiver_id, sender_id]
        );
        return rows;
      }
    
      /**
       * 
       * @param {number} messageId 
       * @param {string} status
       * @property {number} sender_id
       * @property {string} sender_type
       * @property {number} receiver_id
       * @property {string} receiver_type
       * @property {string} content
       * @property {string} media_url
       * @property {string} created_at

       * @returns 
       */
       // Marquer un message comme lu
       async markAsRead(messageId) {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.table} WHERE id = ?`, [messageId]);     
        if (rows.length === 0) {
            return 0;  // Pas trouvé
        }
    
        const [result] = await this.pool.query(
          `UPDATE ${this.table} SET is_read = 1 WHERE id = ?`,
          [messageId]
        );
        return result.affectedRows;
    }
    
    

        /**
         * 
         * @param {number} messageId 
         * @param {string} status
         * @property {number} sender_id
         * @property {string} sender_type
         * @property {number} receiver_id
         * @property {string} receiver_type
         * @property {string} content
         * @property {string} media_url
         * @property {string} created_at

         * @returns 
         */
    // Supprimer un message
    async deleteMessage(messageId) {
        const [result] = await this.pool.query(
          `DELETE FROM ${this.table} WHERE id = ?`,
          [messageId]
        );
        return result.affectedRows;
      }

    /**
     * 
     * @param {number} messageId 
     * @param {*} param1 
     * @param {string} param1.content
     * @param {string} param1.media_url
     * @property {number} sender_id
     * @property {string} sender_type
     * @property {number} receiver_id
     * @property {string} receiver_type
     * @property {string} content
     * @property {string} media_url
     * @property {string} created_at
     * @property {string} status
     * @returns 
     */
      //modifier un message
        async updateMessage(messageId, { content, media_url }) {
            const query = media_url
            ? `UPDATE ${this.table} SET content = ?, media_url = ? WHERE id = ?`
            : `UPDATE ${this.table} SET content = ? WHERE id = ?`;
            const values = media_url
            ? [content, media_url, messageId]
            : [content, messageId];
            const [result] = await this.pool.query(query, values);
            return result.affectedRows;
        }

        /**
         * 
         * @param {number} userId 
         * @property {number} sender_id
         * @property {string} sender_type
         * @property {number} receiver_id
         * @property {string} receiver_type
         * @property {string} content
         * @property {string} media_url
         * @property {string} created_at
         * @property {string} status
         * @returns 
         */
        // Récupérer tous les messages d'un utilisateur
        async getMessagesByUserId(userId) {
            const [rows] = await this.pool.query(
                `SELECT * FROM ${this.table} WHERE sender_id = ? OR receiver_id = ?`,
                [userId, userId]
            );
            return rows;
        }

        /**
         * 
         * @param {number} userId 
            * @param {string} userType
            * @property {number} sender_id
            * @property {string} sender_type
            * @property {number} receiver_id
            * @property {string} receiver_type
            * @property {string} content
            * @property {string} media_url
            * @property {string} created_at
            * @property {string} status
         * @returns 
         */
        // Récupérer tous les messages d'un utilisateur par type (pro ou client)
        async getMessagesByUserType(userId, userType) {
            const [rows] = await this.pool.query(
                `SELECT * FROM ${this.table} WHERE (sender_id = ? AND sender_type = ?) OR (receiver_id = ? AND receiver_type = ?)
`,
                [userId, userType, userId, userType]
            );
            return rows;
        }

        async getMessageById(messageId) {
            const [rows] = await this.pool.query(
                `SELECT * FROM ${this.table} WHERE id = ?`,
                [messageId]
            );
            return rows[0];
        }



}
module.exports = MessagesModel;