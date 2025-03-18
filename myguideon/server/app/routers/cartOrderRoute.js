const express = require('express');
const router = express.Router();

// Import the routers****************************************************
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { createCartOrder, 
    getAllCartOrders, 
    getCartOrderById, 
    getCartOrdersByUserId,
    getAllCartOrdersByUserId,
    getAllCartOrdersByUserproId,
    updateCartOrderStatus, 
    deleteCartOrder
} = require('../controllers/cartOrderController');

/***********************ROUTES PUBLIQUES*********************************** */
// 🔒 Route sécurisé: Créer une commande
router.post('/',authMiddleware('create_cart_order'),roleMiddleware([1,2,3]), createCartOrder);

// 🔒 Route sécurisé: Récupérer toutes les commandes
router.get('/',authMiddleware('view_cart_order'), adminMiddleware,roleMiddleware([1]), getAllCartOrders);

// 🔒 Route sécurisé: Récupérer une commande par ID
router.get('/:id',authMiddleware('view_cart_order'),roleMiddleware([1,2]), getCartOrderById);

// 🔒 Route sécurisé: Récupérer toutes les commandes d'un utilisateur
router.get('/user/:id/all',authMiddleware('view_all_orders_by_user'),roleMiddleware([1,3]), getAllCartOrdersByUserId);

// 🔒 Route sécurisé: Récupérer les commandes d'un utilisateur
router.get('/user/:id',authMiddleware('view_cart_order'),roleMiddleware([1,3]), getCartOrdersByUserId);

// 🔒 Route sécurisé: Récupérer les commandes d'un userpro
router.get('/userpro/:id',authMiddleware('view_cart_order'),roleMiddleware([1,2]), getAllCartOrdersByUserproId);

// 🔒 Route sécurisé: Mettre à jour le statut d'une commande
router.put('/:id',authMiddleware('update_cart_order'),roleMiddleware([1,2]), updateCartOrderStatus);

// 🔒 Route sécurisé: Supprimer une commande
router.delete('/:id',authMiddleware('delete_cart_order'),roleMiddleware([1,3]), deleteCartOrder);

// Export the router****************************************************
module.exports = router;
