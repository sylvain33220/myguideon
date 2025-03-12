/**
 * @file reservationsRoute.js
 * @description Router pour les réservations des activités
 * Ce fichier gère les routes de l'API pour les réservations des activités
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @created 2025-03-10
 */

const express = require('express');
const router = express.Router();

/********************************************IMPORT************************************ */
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');

const { addReservation,
    getReservationById,
    getAllReservations,
    getReservationsByActivityId,
    updateReservation,deleteReservation } = require('../controllers/reservationsController');

/********************************************ROUTES publiques************************************ */

router.get('/:id',authMiddleware('view_reservation'), getReservationById);

router.get('/activity/:activity_id', getReservationsByActivityId);

/********************************************ROUTES sécurisées************************************ */
router.get('/',authMiddleware('view_all_reservations'),roleMiddleware([1,2,3,4]), getAllReservations);

router.post('/',authMiddleware('add_reservation'),roleMiddleware([1,2,3,4]), addReservation);

router.put('/:id',authMiddleware('update_reservation'),roleMiddleware([1,2,3,4]), updateReservation);

router.delete('/:id',authMiddleware('delete_reservation'),roleMiddleware([1,2,3,4]), deleteReservation);

/**Export du router********************************** */

module.exports = router;
