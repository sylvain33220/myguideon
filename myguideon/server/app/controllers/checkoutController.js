/**
 * @file checkoutController.js
 * @description Contrôleur pour les paiements Stripe 
 * Ce fichier gère les fonctions de paiement Stripe
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
// /server/controllers/checkoutController.js
const { createPaymentSession } = require('../helpers/stripeHelper');
const OrderModel = require('../../database/models/OrderModel');

const orderModel = new OrderModel();

/**
 * Crée une session de paiement Stripe
 * @param {*} req 
 * @param {*} res 
 */
const createCheckoutSession = async (req, res) => {
  const { items, userId , userproId} = req.body;

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  try {
    const session = await createPaymentSession(items);
    const orderId = await orderModel.createOrder(userId,userproId, totalAmount);
    res.status(200).json({ sessionId: session.id, orderId });
  } catch (error) {
    console.error('Erreur lors de la création de la session de paiement', error);
    res.status(500).json({
      error: `Erreur lors de la création de session de paiement: ${error.message}`,
    });
  }
};
/**
 * Met à jour le statut de la commande
 * @param {*} req 
 * @param {*} res 
 */
const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const result = await orderModel.updateOrderStatus(orderId, status);
        res.status(200).json({ orderId, status });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de la commande', error);
        res.status(500).json({
        error: `Erreur lors de la mise à jour du statut de la commande: ${error.message}`,
        });
    }
    }


module.exports = { createCheckoutSession, updateOrderStatus };
