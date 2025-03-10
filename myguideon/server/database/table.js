/**
 * @file table.js
 * @description Proxy pour les tables de la base de données
 * Ce fichier regroupe toutes les tables de la base de données
 * @module Proxy pour les tables de la base de données
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const DestinationModel  = require('./models/destinationModal');
const UserAdminModel    = require('./models/useradminModal'); 
const UserproModel = require('./models/userproModel');
const ActivitiesModel = require('./models/activitiesModel');
const RolePermissionsModel = require('./models/RolePermissionsModel');
const AvailabilitiesModel = require('./models/availabilitiesModel');
const reservationsModel = require('./models/reservationsModel');


const tables = {}

/******************************TABLES*********************************************** */
tables.destination =  new  DestinationModel();

tables.userAdmin   =  new  UserAdminModel();

tables.userpro = new UserproModel();

tables.activities = new  ActivitiesModel();

tables.role_permissions = new RolePermissionsModel();

tables.availabilities = new AvailabilitiesModel();

tables.reservations = new reservationsModel();


/*************************EXPORT****************************************************** */
module.exports = new Proxy(tables, {
    get(obj, prop) {
      if (prop in obj) return obj[prop];
  
      throw new ReferenceError(
        `tables.${prop} is not defined . Did you want register it in ${__filename}?`,
      );
    },
  });