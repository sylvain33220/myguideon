const Joi = require('joi');

/**********************validation pour la création********************** */
const addThingsToDoSchema = Joi.object({
    name: Joi.string().min(3).max(500).required(),
    adress: Joi.string().max(500).required(),
    destination_id: Joi.number().integer().required(),
    description: Joi.string().min(10).required(),
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
    icon: Joi.string().allow(null, ""),
    destination_name: Joi.string().max(500).required(),
    category: Joi.string().max(500).required(),
    status: Joi.string().valid("active", "inactive", "archived").default("inactive")
  });

  /**********************validation pour la modification********************** */
const updateThingsToDoSchema = Joi.object({
    name: Joi.string().min(3).max(500),
    adress: Joi.string().max(500),
    destination_id: Joi.number().integer(),
    description: Joi.string().min(10),
    longitude: Joi.string(),
    latitude: Joi.string(),
    icon: Joi.string().allow(null, ""),
    destination_name: Joi.string().max(500),
    category: Joi.string().max(500),
    status: Joi.string().valid("active", "inactive", "archived")
  });

    /**********************validation pour la suppression********************** */
const deleteThingsToDoSchema = Joi.object({
    id: Joi.number().integer().required()
  });

  /**********************validation pour la récupération********************** */
const getThingsToDoSchema = Joi.object({
    id: Joi.number().integer().required()
  });

  /********************Export des fonctions de validations******************** */

module.exports = {
    validateAddThingsToDo: (data) => addThingsToDoSchema.validate(data, { stripUnknown: true }),
    validateUpdateThingsToDo: (data) => updateThingsToDoSchema.validate(data, { stripUnknown: true }),
    validateDeleteThingsToDo: (data) => deleteThingsToDoSchema.validate(data, { stripUnknown: true }),
    validateGetThingsToDo: (data) => getThingsToDoSchema.validate(data, { stripUnknown: true })
}