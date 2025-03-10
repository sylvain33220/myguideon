/**
 * @file stripeWebhookController.js
 * @description Controller pour les webhooks Stripe 
 * Ce fichier gère les fonctions de gestion des webhooks Stripe
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const OrderModel  = require('../../database/models/OrderModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const orderModel = new OrderModel();

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
        const event = stripe.webhooks.constructEvent(req.rawBody, sig, endPointSecret);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const orderId = session.metadata.orderId;

            await orderModel.updateOrderStatus(orderId, 'paid');
            console.log(`Commande ${orderId} payée avec succès`);
        }
        res.json({ received: true });
    } catch (error) {
        console.error('Erreur lors du traitement du webhook Stripe', error);
        res.status(400).send(`Webhook Error: ${error.message}`);
    }
}


module.exports = {handleStripeWebhook};