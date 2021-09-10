const express = require('express');

const placesControllers = require('../controllers/places-controllers')

const router = express.Router()

router.get('/user/:uid', placesControllers.getPlacesByUserId)

// :pid accept any params
router.get('/:pid', placesControllers.getPlaceById)

router.patch('/:pid', placesControllers.updatePlace)

router.delete('/:pid', placesControllers.deletePlace)

router.post('/', placesControllers.createPlace)

module.exports = router