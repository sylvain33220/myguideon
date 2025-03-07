const express = require('express');
const router = express.Router();

//****************IMPORT************************************* */
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');
const  { getAllAvailabilities,
    getAvailabilitiesByActivityId,
    addAvailabilities,
    updateAvailability,
    deleteAvailability
} = require('../controllers/availabilitiesController');

/***********************ROUTES PUBLIQUES*********************************** */

router.get('/', getAllAvailabilities);

router.get('/:id', getAvailabilitiesByActivityId);

/***********************ROUTES SECURISEES*********************************** */
router.post('/', authMiddleware('add_availability'),roleMiddleware([1,2,3,4]),addAvailabilities);

router.put('/:id', authMiddleware('update_availability'),roleMiddleware([1,2,3,4]) ,updateAvailability);

router.delete('/:id', authMiddleware('delete_availability'),roleMiddleware([1,2,3,4]) ,deleteAvailability);

// Export the router****************************************************
module.exports = router;