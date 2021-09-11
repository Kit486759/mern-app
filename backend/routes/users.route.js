const express = require('express');
const { check } = require('express-validator')

const router = express.Router()

const usersControllers = require('../controllers/users-controllers')

router.post('/signup',
// Validation check middleware to check post req
    [
        check('name')
            .not()
            .isEmpty(),
        // check if length under 5
        check('email')
            .isLength({ min: 5 })
            .isEmail(),
        check('password')
            .not()
            .isEmpty()
            .isLength({ min: 5 })
    ], usersControllers.signup)
    
router.post('/login', usersControllers.login)
router.get('/', usersControllers.getUsers)

module.exports = router