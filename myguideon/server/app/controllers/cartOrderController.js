/**
 * @file  cartOrderController.js
 * @description   Functions for managing cart orders
 * @module  Cart Order Controller
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2025-03-10
 * 
 */
const { get } = require('node:http');
const tables = require('../../database/table');
const {verifyToken} = require('../helpers/jwtHelper');
const path = require('node:path');

/*********************** Créer une commande ***********************/
async function createCartOrder(req, res) {
    try {
        const userId = req.user.id; // Utiliser le middleware pour récupérer l'utilisateur
        const { userproId, totalAmount,quantity } = req.body;

        if (!totalAmount) {
            return res.status(400).json({ error: "Le montant total est requis" });
        }

        const newOrder = await tables.cart_orders.createOrder({ user_id: userId, userpro_id: userproId, total_amount: totalAmount, quantity: quantity || 1 });
        res.status(201).json({ message: "Commande créée avec succès", orderId: newOrder });
    } catch (error) {
        console.error("❌ ERREUR createCartOrder:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}
/*********************** Récupérer toutes les commandes ***********************/
async function getAllCartOrders(req, res) {
    try {
        const orders = await tables.cart_orders.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ ERREUR getAllCartOrders:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }

}

/*********************** Récupérer toutes les commandes d'un userpro ***********************/
async function getAllCartOrdersByUserproId(req, res) {
    try {
        const userproId = req.params.id;
        if (!userproId) return res.status(400).json({ error: "L'identifiant de l'utilisateur professionnel est requis"});
        const orders = await tables.cart_orders.getAllOrdersByUserproId(userproId);
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ ERREUR getAllCartOrdersByUserproId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}


/*********************** Récupérer une commande par ID ***********************/
async function getCartOrderById(req, res) {
    try {
        const orderId = req.params.id;
        const order = await tables.cart_orders.getOrderById(orderId);
        if (!order) return res.status(404).json({ error: "Commande non trouvée" });
        res.status(200).json(order);
    } catch (error) {
        console.error("❌ ERREUR getCartOrderById:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
/*********************** Récupérer les commandes d'un utilisateur ***********************/
async function getCartOrdersByUserId(req, res) {
    try {
        const userId = decodedToken.id;
        const orders = await tables.cart_orders.getOrdersByUserId(userId);
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ ERREUR getCartOrdersByUserId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

async function getAllCartOrdersByUserId(req, res) {
    try {
        const userproId = req.params.id;
        const orders = await tables.cart_orders.getAllOrdersByUserClientId(userproId);
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ ERREUR getAllCartOrdersByUserproId:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Mettre à jour le statut d'une commande ***********************/
async function updateCartOrderStatus(req, res) {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        if (!orderId || Number.isNaN(Number.parseInt(orderId))) {
            console.error("❌ ERREUR : ID de commande invalide !");
            return res.status(400).json({ error: "ID de commande invalide" });
        }

        if (!status) return res.status(400).json({ error: "Statut de commande invalide" });

        const updatedRows = await tables.cart_orders.updateOrderStatus(orderId, status);
        if (updatedRows === 0) return res.status(404).json({ error: "Commande non trouvée" });

        res.status(200).json({ message: "Statut de la commande mis à jour" });

    } catch (error) {
        console.error("❌ ERREUR updateCartOrderStatus:", error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

/*********************** Supprimer une commande ***********************/
async function deleteCartOrder(req, res) {
    try {
        const orderId = req.params.id;
        const userId = req.user.id;
        const userRole = req.user.role_id;

        // Récupérer la commande
        const order = await tables.cart_orders.getOrderById(orderId);
        if (!order) return res.status(404).json({ error: "Commande non trouvée" });

        // Vérifier si l'utilisateur est admin (role_id = 1) OU propriétaire de la commande
        if (userRole !== 1 && order.user_id !== userId) {
            return res.status(403).json({ error: "Accès refusé" });
        }

        // Suppression de la commande
        const deletedRows = await tables.cart_orders.deleteOrder(orderId);

        if (deletedRows === 0) return res.status(404).json({ error: "Commande non trouvée" });

        res.status(200).json({ message: "Commande supprimée avec succès" });
    } catch (error) {
        console.error("❌ ERREUR deleteCartOrder:", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

/*********************** Export functions ***********************/
module.exports = { 
    createCartOrder, 
    getAllCartOrders, 
    getCartOrderById, 
    getCartOrdersByUserId,
    getAllCartOrdersByUserId,
    getAllCartOrdersByUserproId,
    updateCartOrderStatus, 
    deleteCartOrder };