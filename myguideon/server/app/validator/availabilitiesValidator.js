/**
 * @file availabilitiesValidator.js
 * @description Validation des disponibilités
 * @module Validator des disponibilités
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const Joi = require('joi');

/****************Validation pour l'ajout d'une disponibilité *****************/
const addAvailabilitySchema = Joi.object({
    activity_id: Joi.number().integer().required(),
    date: Joi.date().required(),
    start_time: Joi.string().required(),
    end_time: Joi.string().required(),
    max_participants: Joi.number().integer().required()
})

/****************** Validation pour la mise à jour d'une disponibilité ******************/
const updateAvailabilitySchema = Joi.object({
    activity_id: Joi.number().integer().optional(),
    date: Joi.date().optional(),
    start_time: Joi.string().optional(),
    end_time: Joi.string().optional(),
    max_participants: Joi.number().integer().optional()
}).min(1);  // 🔄 Au moins un champ doit être fourni

const deleteAvailabilitySchema = Joi.object({
    id: Joi.number().integer().required()
})

/**********************Fonctions de validations********************************* */
module.exports = {
    addAvailabilityValidation: (data) => addAvailabilitySchema.validate(data, { stripUnknown: true }),
    updateAvailabilityValidation: (data) => updateAvailabilitySchema.validate(data, { stripUnknown: true }),
    deleteAvailabilityValidation: (data) => deleteAvailabilitySchema.validate(data, { stripUnknown: true })

}