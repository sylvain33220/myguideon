const express = require('express');
const { 
    sendMessage,
    getConversation,
    getAllMessages,
    markAsRead,
    deleteMessage,
    getMessageById,
    updateMessage,
    getMessagesByUserId,
    getMessagesByUserType
} = require('../controllers/messagesController');
const uploadFile = require('../middleware/uploadFile');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/********************************************ROUTES************************************ */

// 🔓 Route publique pour envoyer un message
router.post('/', authMiddleware(), uploadFile().single('media_url'), sendMessage);

// 🔒 Route protégée pour marquer un message comme lu
router.patch('/markAsRead/:messageId', authMiddleware(), markAsRead);

// 🔓 Route publique  pour récupérer une conversation entre deux utilisateurs
router.get('/conversation/:sender_id/:receiver_id', getConversation);

// 🔒 Route protégée pour récupérer tous les messages
router.get('/', authMiddleware(), getAllMessages);

// 🔒 Route protégée pour supprimer un message
router.delete('/:messageId', authMiddleware(), deleteMessage);

// 🔒 Route protégée pour récupérer un message par ID
router.get('/:messageId', authMiddleware(), getMessageById);

// 🔒 Route protégée pour mettre à jour un message
router.put('/:messageId', authMiddleware(), uploadFile().single('media_url'), updateMessage);

// 🔒 Route protégée pour récupérer les messages d'un utilisateur par ID
router.get('/user/:userId', authMiddleware(), getMessagesByUserId);

// 🔒 Route protégée pour récupérer les messages d'un utilisateur par type
router.get('/user/:userId/:userType', authMiddleware(), getMessagesByUserType);


module.exports = router;