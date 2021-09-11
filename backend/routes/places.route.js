const express = require('express');
const { check } = require('express-validator')

const placesControllers = require('../controllers/places-controllers')

const router = express.Router()

router.get('/user/:uid', placesControllers.getPlacesByUserId)

// :pid accept any params
router.get('/:pid', placesControllers.getPlaceById)

router.patch('/:pid',
    [
        check('title')
            .not()
            .isEmpty(),
        check('description')
            .isLength({ min: 5 })
    ],
    placesControllers.updatePlace)

router.delete('/:pid', placesControllers.deletePlace)


router.post('/',
    // Validation check('title') middleware to check post req title is empty 
    [
        check('title')
            .not()
            .isEmpty(),
        // check if length under 5
        check('description')
            .isLength({ min: 5 }),
        check('address')
            .not()
            .isEmpty()
    ]
    , placesControllers.createPlace)

module.exports = router