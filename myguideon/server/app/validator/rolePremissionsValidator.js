/**
 * @file rolePremissionsValidator.js
 * @description Validation des données pour les permissions des rôles 
 * Ce fichier permet de valider les données pour les permissions des rôles
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const Joi = require('joi');
const { addNewPermission } = require('../controllers/RolePermissionsController');

const addRoleSchema = Joi.object({
    userProId: Joi.number().integer().required(),
    roleId: Joi.number().integer().required()
})

const addPermissionSchema = Joi.object({
    roleId: Joi.number().integer().required(),
    permissionId: Joi.number().integer().required()
})

const removeSchema = Joi.object({
    type: Joi.string().valid('role','permission').required(),
    id: Joi.number().integer().required()
})
const addNewPermissionSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(255).optional()
});
const addRoleToAdminSchema = Joi.object({
    userAdminId: Joi.number().integer().required(),
    roleId: Joi.number().integer().required()
});

module.exports = {
    addRoleValidation: (data) => addRoleSchema.validate(data, { stripUnknown: true }),
    addPermissionValidation: (data) => addPermissionSchema.validate(data, { stripUnknown: true }),
    removeValidation: (data) => removeSchema.validate(data, { stripUnknown: true }),
    addNewPermissionValidation: (data) => addNewPermissionSchema.validate(data, { stripUnknown: true }),
    addRoleToAdminValidation : (data) => addRoleToAdminSchema.validate(data, { stripUnknown: true })
}