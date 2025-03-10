/**
 * @file stripeHelper.js
 * @description Helper pour les paiements Stripe
 * Ce fichier gère les fonctions Stripe de l'application
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
// Initialize Stripe
require('dotenv').config({
    path: require('node:path').resolve(__dirname, '../.env')
});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a checkout session
/**
 * 
 * @param {*} items 
 * @returns 
 */
const createPaymentSession = async (items) => {
    const lineItems = items.map(item => {
        return {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: Number.parseInt(item.quantity, 10),
        };
    });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    return session;
}
module.exports = {createPaymentSession};