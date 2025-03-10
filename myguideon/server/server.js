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
const apiRouter  = routers; 

const { app }    = config;  

app.use(express.json(config.jsonConfig));
app.use(express.urlencoded(config.urlEncodedConfig));
app.use('/api/public', express.static(config.publicPath)); 

app.use(session(config.sessionConfig));

app.use(config.corsMiddleware);
app.use('/api', apiRouter);


const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server is running on port ${config.PORT}`);
});

module.exports = { app, server };

/*********************************************** */
