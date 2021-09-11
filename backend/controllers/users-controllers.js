const HttpError = require('../models/http-error')
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Kit',
        email: 'kit@gmail.com',
        password: 'test'
    },
    {
        id: 'u2',
        name: 'So',
        email: 'so@gmail.com',
        password: 'test'
    }
]

const getUsers = (req, res, next) => {
    return res.status(200).json({ user: DUMMY_USERS })
}

const signup = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new HttpError('Input valid, Please check and try again.')
    }

    const { name, email, password } = req.body

    const hasUser = DUMMY_USERS.find(p => p.email === email)
    if (hasUser) {
        throw new HttpError('Could not create user, email already exist.')
    }
    const createdUser = {
        id: uuidv4(),
        name, //name :name
        email,
        password
    }

    DUMMY_USERS.push(createdUser)
    return res.status(201).json({ user: createdUser })
}

const login = (req, res, next) => {
    const { email, password } = req.body

    const identifiedUser = DUMMY_USERS.find(user => user.email === email)
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong', 401)
    }
    return res.json({ message: "Logged in" })
}


exports.getUsers = getUsers
exports.signup = signup
exports.login = login