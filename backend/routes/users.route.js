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
            .normalizeEmail() //normalize the email Test@test.com => test@test.com
            .isEmail(),
        check('password')
            .isLength({ min: 6 })
    ], usersControllers.signup)

router.post('/login', usersControllers.login)
router.get('/', usersControllers.getUsers)

module.exports = router