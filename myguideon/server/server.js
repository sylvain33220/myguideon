/**
 * @file server.js
 * @description Point d'entrée du serveur
 * Ce fichier configure le serveur et le lance
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const express    = require('express');
const session    = require('express-session');
const config     = require('./app/config'); 
const routers    = require('./app/routers/router');
const stripeRouter = require('./app/routers/stripeRoute');
const apiRouter  = routers; 

const { app }    = config;  

// Configuration des webhooks Stripe
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
// Configuration du serveur
app.use(express.json(config.jsonConfig));
app.use(express.urlencoded(config.urlEncodedConfig));

app.use('/api/public', express.static(config.publicPath)); 


//gestion des routes stripe
app.use('/api/stripe', stripeRouter);
//gestion des routes de l'api
app.use(session(config.sessionConfig));

app.use(config.corsMiddleware);
//gestion des routes de l'api principale
app.use('/api', apiRouter);

//cle publique stripe
app.get("/api/stripe-key", (req, res) => {
  // console.log("🔑 Récupération de la clé publique Stripe dans server.js", config.STRIPE_PUBLISHABLE_KEY);
  res.json({publishableKey: config.STRIPE_PUBLISHABLE_KEY});
});

app.get("/", (req, res) => {
  res.send("🚀 MyGuideOn API is running!");
});

const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server is running on port ${config.PORT}`);
});

module.exports = { app, server };

/*********************************************** */
