/**
 * @file userAdminValidator.js
 * @description  Validation des données pour les utilisateurs admin
 * @module  Validator pour les utilisateurs admin
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2025-03-25
 * 
 */
const Joi = require('joi');

/****************Validation pour l'ajout d'un admin *****************/
const addAdminValidatorShema = Joi.object({
    name: Joi.string().max(100).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    role_id: Joi.number().valid(1, 4).optional(), // 1 = super admin, 4 = admin tiers
    is_first_time: Joi.boolean().optional()
})

/****************** Validation pour la mise à jour d'un UserClient ******************/

const updateAdminValidatorShema = Joi.object({
    name: Joi.string().max(100).optional(),
    email: Joi.string().email().max(255).optional(),
    password: Joi.string().min(8).max(255).optional(),
    role_id: Joi.number().valid(1, 4).optional(), // 1 = super admin, 4 = admin tiers
    is_first_time: Joi.boolean().optional()
})

/******************Validation pour l'authentification*************************** */
const authAdminValidatorShema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

/**********************Fonctions de validations********************************* */

module.exports = {
    addAdminValidator: (data) => addAdminValidatorShema.validate(data, { stripUnknown: true }),
    updateAdminValidator: (data) => updateAdminValidatorShema.validate(data, { stripUnknown: true }),
    authAdminValidator: (data) => authAdminValidatorShema.validate(data, { stripUnknown: true })
}