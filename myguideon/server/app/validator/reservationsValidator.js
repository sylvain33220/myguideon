/**
 * @file reservationsValidator.js
 * @description Validations pour les réservations des activités 
 * Ce fichier gère les validations pour les réservations des activités
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const Joi = require('joi');

/****************Validation pour la réservation *****************/
const addReservationSchema = Joi.object({
    activity_id: Joi.number().integer().required(),
    date: Joi.date().required(),
    status: Joi.string().valid('pending', 'confirmed', 'cancelled').required(),
    total_amount: Joi.number().integer().optional()
});

const updateReservationSchema = Joi.object({
    activity_id: Joi.number().integer().optional(),
    date: Joi.date().optional(),
    status: Joi.string().valid('pending', 'confirmed', 'cancelled').optional(),
    total_amount: Joi.number().integer().optional()
}).min(1);  // 🔄 Au moins un champ doit être fourni

const deleteReservationSchema = Joi.object({
    id: Joi.number().integer().required()
});

/**********************Fonctions de validations********************************* */
/******************************************************************************** */
module.exports = {
    addReservationValidation: (data) => addReservationSchema.validate(data, { stripUnknown: true }),
    updateReservationValidation: (data) => updateReservationSchema.validate(data, { stripUnknown: true }),
    deleteReservationValidation: (data) => deleteReservationSchema.validate(data, { stripUnknown: true })
};