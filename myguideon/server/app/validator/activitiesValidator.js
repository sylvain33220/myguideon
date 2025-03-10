/**
 * @file activitiesValidator.js
 * @description Validation des activités
 * @module Validator des activités
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const Joi = require('joi');

/**
 * Schema de validation des activités
 * @returns 
 */
const activitiesShema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().min(0).required(),
    currency: Joi.string().valid('USD', 'EUR').optional(), 
    location: Joi.string().min(3).required(),
    latitude: Joi.number().optional(), 
    longitude: Joi.number().optional(), 
    language: Joi.string().min(2).default('English'),  
    duration: Joi.number().optional(),
    max_participants: Joi.number().min(1).optional(),
    availability: Joi.array().items(Joi.string().isoDate()).optional(),  
    age_limit: Joi.number().min(0).optional(),  
    category: Joi.string().min(3).optional(),
    status: Joi.string().valid('Published', 'Draft').default('Published'),  
    created_by: Joi.number().required(),
    imageAlt: Joi.string().allow(null, ''),
    imageDescription: Joi.string().allow(null, '')
})

module.exports = {
    validateActivity : (data) => activitiesShema.validate(data)
}