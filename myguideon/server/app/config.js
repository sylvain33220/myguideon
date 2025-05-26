/**
 * @file config.js
 * @description Configuration de l'application Express
 * Ce fichier regroupe toutes les configurations de l'application
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
require('dotenv').config();
const path    = require('node:path');
const express = require('express');
const cors    = require('cors');

const app = express();

   const allowedOrigins = [
    'http://localhost:3000',
    'https://myguideon.vercel.app'
  ]; 


module.exports = {
  app,  

  PORT: process.env.PORT || 3030,

  jsonConfig: { limit: "50mb" },
  urlEncodedConfig: { limit: "50mb", extended: true },

 
  sessionConfig: {
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //true en production
      maxAge: 3600000, 
    },
  },



  corsMiddleware: cors({
    origin: function (origin, callback) {
      // Vérifie si l'origine est autorisée
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS policy violation: Origin not allowed'));
      }
    }, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),


  publicPath: path.join(__dirname, '../public'),

  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
};
