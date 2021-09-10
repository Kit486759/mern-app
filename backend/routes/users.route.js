const express = require('express');
const router = express.Router()

const usersControllers = require('../controllers/users-controllers')

router.post('/signup', usersControllers.signup)
router.post('/login', usersControllers.login)
router.get('/', usersControllers.getUsers)

module.exports = router