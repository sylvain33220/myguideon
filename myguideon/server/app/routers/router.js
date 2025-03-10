/**
 * @file router.js
 * @description Router principal pour les routes de l'API
 * Ce fichier regroupe toutes les routes de l'API
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */
const express = require('express');
const router = express.Router();

// Import the routers****************************************************
const usersAdminRouter = require('./useradminRoutes.js');
const destinationRouter = require('./destinationRoute.js');
const activitiesRouter = require('./activitiesRoutes.js');
const userproRouter = require('./userproRoute.js');
const availabilitiesRouter = require('./availabilitiesRoutes.js');
const statsRouter = require('./statsRoute.js');
const reservationsRouter = require('./reservationsRoute.js');
const rolePermissionsRouter = require('./RolePermissionsRouter.js');


// Use the routers****************************************************
router.use('/destination',destinationRouter);

router.use('/profil',usersAdminRouter);

router.use('/activities',activitiesRouter);

router.use('/userpro',userproRouter);

router.use('/availabilities',availabilitiesRouter);

router.use('/stats',statsRouter);

router.use('/reservations',reservationsRouter);

router.use('/roles-permissions',rolePermissionsRouter);

// Export the router****************************************************
module.exports = router;