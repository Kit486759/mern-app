const express = require('express');

const placesControllers = require('../controllers/places-controllers')

const router = express.Router()

router.get('/user/:uid', placesControllers.getPlaceByUserId)

// :pid accept any params
router.get('/:pid', placesControllers.getPlaceById)

router.post('/', placesControllers.createPlace)

module.exports = router