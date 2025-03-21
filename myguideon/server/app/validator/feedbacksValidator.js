/**
 * @file feedbacksValidator.js
 * @description Validation des données des feedback
 * @module Validator des feedbacks
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */


const Joi = require('joi');

/****************Validation pour l'ajout d'un feedback *****************/

const addFeedbackSchema = Joi.object({
    activity_id: Joi.number().integer().allow(null),
    user_id: Joi.number().integer().required(),
    things_to_do_id: Joi.number().integer().allow(null),
    rating: Joi.number().min(0).max(10).required(),
    comment: Joi.string().min(2).max(255).required()
})

/****************** Validation pour la mise à jour d'un feedback ******************/
const updateFeedbackSchema = Joi.object({
    activity_id: Joi.number().integer().allow(null, ""),
    user_id: Joi.number().integer().required(),
    things_to_do_id: Joi.number().integer().allow(null, ""),
    rating: Joi.number().min(0).max(10).required(),
    comment: Joi.string().min(2).max(255).required()
})

/****************** Validation pour la suppression d'un feedback ******************/
const deleteFeedbackSchema = Joi.object({
    id: Joi.number().integer().required()
})


/**********************Fonctions de validations********************************* */
module.exports = {
    addFeedbackValidation: (data) => addFeedbackSchema.validate(data, { stripUnknown: true }),
    updateFeedbackValidation: (data) => updateFeedbackSchema.validate(data, { stripUnknown: true }),
    deleteFeedbackValidation: (data) => deleteFeedbackSchema.validate(data, { stripUnknown: true }) 
}