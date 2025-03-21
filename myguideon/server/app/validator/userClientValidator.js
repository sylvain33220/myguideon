/**
 * @file userClientValidator.js
 * @description Validation des données des utilisateurs professionnels
 * @module Validator des utilisateurs professionnels
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */

const Joi = require('joi');

/****************Validation pour l'ajout d'un userclient *****************/

const addUserClientSchema = Joi.object({
        firstname: Joi.string().min(2).max(100).required(),
        lastname: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.string().allow(null, ""),
        address: Joi.string().allow(null, ""),
        city: Joi.string().allow(null, ""),
        country: Joi.string().allow(null, ""),
        postal_code: Joi.string().allow(null, ""),
        profile_image: Joi.string().allow(null, ""),
        role_id: Joi.number().valid(3).default(3) // 3 = user_client
})

/****************** Validation pour la mise à jour d'un UserClient ******************/
const updateUserClientSchema = Joi.object({
    firstname: Joi.string().min(2).max(100).optional(),
    lastname: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    phone: Joi.string().allow(null, ""),
    address: Joi.string().allow(null, ""),
    city: Joi.string().allow(null, ""),
    country: Joi.string().allow(null, ""),
    postal_code: Joi.string().allow(null, ""),
    profile_image: Joi.string().allow(null, "")
})

/****************** Validation pour la mise à jour du mot de passe ******************/
const updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required()
})

/******************Validation pour l'authentification*************************** */
const authUserClientSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

/**********************Fonctions de validations********************************* */
/******************************************************************************** */
module.exports = {
    addUserClientValidation: (data) => addUserClientSchema.validate(data,{stripUnknown:true} ),
    updateUserClientValidation: (data) => updateUserClientSchema.validate(data,{stripUnknown:true}),
    updatePasswordValidation: (data) => updatePasswordSchema.validate(data,{stripUnknown:true}),
    authUserClientValidation: (data) => authUserClientSchema.validate(data,{stripUnknown:true})
}