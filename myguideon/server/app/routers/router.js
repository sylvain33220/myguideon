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


// Use the routers****************************************************
router.use('/destination',destinationRouter);

router.use('/profil',usersAdminRouter);

router.use('/activities',activitiesRouter);

router.use('/userpro',userproRouter);

router.use('/availabilities',availabilitiesRouter);

router.use('/stats',statsRouter);

router.use('/reservations',reservationsRouter);
// Export the router****************************************************
module.exports = router;