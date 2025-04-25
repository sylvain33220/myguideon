const tables = require('../../database/table');
const { addMessageValidation ,
    updateMessageValidation,
    deleteMessageValidation } = require('../validator/messagesValidator');
const path = require('node:path');


const sendMessage = async (req, res) => {
    // Valider les données du message
    const { error } = addMessageValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
        }
    try {
        const { sender_id, sender_type, receiver_id, receiver_type, content } = req.body;
  
        let media_url = null;
        if (req.file) {
          const folder = req.file.mimetype.startsWith('video/')
            ? 'video'
            : 'img';
          media_url = `/assets/${folder}/${req.file.filename}`;
        }
  
        const insertId = await tables.messages.createMessage({
          sender_id,
          sender_type,
          receiver_id,
          receiver_type,
          content,
          media_url,
        });
  
        res.status(201).json({ message: 'Message envoyé', id: insertId });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
      }
}

const getConversation = async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.params;
        const messages = await tables.messages.getConversation({ sender_id, receiver_id });
        res.status(200).json(messages);
    } catch (error) {
        console.error("❌ ERREUR getConversation:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
const getAllMessages = async (req, res) => {
    try {
        const messages = await tables.messages.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        console.error("❌ ERREUR getAllMessages:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
const markAsRead = async (req, res) => {
    try {
      const { messageId } = req.params;
      const message = await tables.messages.getMessageById(messageId);
        const affectedRows = await tables.messages.markAsRead(messageId);
        if (affectedRows) {
          res.status(200).json({ message: 'Message marqué comme lu' });
        } else {
          res.status(404).json({ error: 'Message non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du message' });
      }
  
}

const deleteMessage = async (req, res) => {
  try {
      const { messageId } = req.params;

      // ⚠️ Adapter la validation ici
      const { error } = deleteMessageValidation({ id: messageId });
      if (error) {
          console.error("❌ Erreur de validation:", error.details[0].message);
          return res.status(400).json({ error: error.details[0].message });
      }

      const affectedRows = await tables.messages.deleteMessage(messageId);
      if (affectedRows) {
          res.status(200).json({ message: 'Message supprimé avec succès' });
      } else {
          res.status(404).json({ error: 'Message non trouvé' });
      }
  } catch (err) {
      console.error("❌ Erreur DELETE controller:", err);
      res.status(500).json({ error: 'Erreur lors de la suppression du message' });
  }
};


const getMessageById = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await tables.messages.getMessageById(messageId);
        if (message) {
          res.status(200).json(message);
        } else {
          res.status(404).json({ error: 'Message non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération du message' });
      } 
}

const updateMessage = async (req, res) => {
    // Valider les données du message
    const { error } = updateMessageValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
        }
    // Vérifier si l'ID est valide
    const messageId = Number.parseInt(req.params.id, 10);
    if (!messageId || Number.isNaN(messageId)) {
        return res.status(400).json({ error: "ID message invalide" });
    }
    try {
        const { id } = req.params;
        const { content, media_url } = req.body;
  
        const affectedRows = await tables.messages.updateMessage(id, { content, media_url });
        if (affectedRows) {
          res.status(200).json({ message: 'Message mis à jour' });
        } else {
          res.status(404).json({ error: 'Message non trouvé' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du message' });
      } 
}

const getMessagesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
  
        const messages = await tables.messages.getMessagesByUserId(userId);
        if (messages.length) {
          res.status(200).json(messages);
        } else {
          res.status(404).json({ error: 'Aucun message trouvé pour cet utilisateur' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
      } 
}

const getMessagesByUserType = async (req, res) => {
    try {
        const { userId, userType } = req.params;
  
        const messages = await tables.messages.getMessagesByUserType(userId, userType);
        if (messages.length) {
          res.status(200).json(messages);
        } else {
          res.status(404).json({ error: 'Aucun message trouvé pour cet utilisateur' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
      }
}

module.exports = {
    sendMessage,
    getConversation,
    getAllMessages,
    markAsRead,
    deleteMessage,
    getMessageById,
    updateMessage,
    getMessagesByUserId,
    getMessagesByUserType
};


