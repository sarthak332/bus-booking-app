const express = require('express');

const router = express.Router();
const BookingController = require('../../controller/booking-controller');
const { isAuth } = require('../../middleware/auth');

router.post('/create',isAuth, BookingController.create);
router.get('/getAll', BookingController.getAll);
router.get('/cancel/:id',isAuth, BookingController.cancel);
module.exports = router;