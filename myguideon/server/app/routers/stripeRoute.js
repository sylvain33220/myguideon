/**
 * @file stripeRoute.js
 * @description Router pour les paiements Stripe 
 * Ce fichier gère les routes de l'API pour les paiements Stripe
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const express = require('express');
const router = express.Router();

// Import the createCheckoutSession and handleStripeWebhook functions from the checkoutController.js file**************************************/

const authMiddleware = require('../middleware/auth');
const { createCheckoutSession } = require('../controllers/checkoutController');
const {handleStripeWebhook} = require('../controllers/stripeWebhookController');

/* Routes pour les paiements Stripe *************************************************************************************************************/

// Create a checkout session
router.post('/create-checkout-session',authMiddleware(), createCheckoutSession);

// Handle Stripe webhook events 
router.post('/webhook', express.raw({type: 'application/json'}), handleStripeWebhook);

module.exports = router;