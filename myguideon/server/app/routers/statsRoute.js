const express = require('express');
const router = express.Router();

// Import de middleware****************************************************
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');

const {getActivitiesStats,getRevenueStats,getRatingStats} = require('../controllers/statsController');


//Routes sécurisées****************************************************
router.get('/activities',authMiddleware(),roleMiddleware([1,2,3,4]),getActivitiesStats);

router.get('/revenue',authMiddleware(),roleMiddleware([1,2,3,4]),getRevenueStats);

router.get('/ratings',authMiddleware(),roleMiddleware([1,2,3,4]),getRatingStats);
// Export du router****************************************************

module.exports = router;