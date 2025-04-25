/**
 * @file messageValidator.js
 * @description Validation des données des messages
 * @module Validator des messages
 * @version 0.0.1
 * @created 2025-04-24
 * @author Sylvain
 * @website https://www.studio-purple.com
 */

const Joi = require('joi');

/**************** Validation pour l'ajout d'un message ****************/
const addMessageSchema = Joi.object({
    sender_id: Joi.number().integer().required(),
    sender_type: Joi.string().valid('user_client', 'userpro', 'user_admin').required(),
    receiver_id: Joi.number().integer().required(),
    receiver_type: Joi.string().valid('user_client', 'userpro', 'user_admin').required(),
    content: Joi.string().max(1000).allow(null, ""),  // max 1000 caractères, peut être vide si fichier
});

/*************** Validation pour la mise à jour d'un message ***************/
const updateMessageSchema = Joi.object({
    content: Joi.string().max(1000).allow(null, ""),
});

/**************** Validation pour la suppression d'un message ****************/
const deleteMessageSchema = Joi.object({
    id: Joi.number().integer().required()
});

/**************** Fonctions de validation ****************/
module.exports = {
    addMessageValidation: (data) => addMessageSchema.validate(data, { stripUnknown: true }),
    updateMessageValidation: (data) => updateMessageSchema.validate(data, { stripUnknown: true }),
    deleteMessageValidation: (data) => deleteMessageSchema.validate(data, { stripUnknown: true }),
};
