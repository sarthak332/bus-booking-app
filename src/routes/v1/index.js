const express = require('express');

const router = express.Router();
const {create, getAll} = require('../../controller/booking-controller');

router.post('/create', create);
router.get('/getAll', getAll);

module.exports = router;