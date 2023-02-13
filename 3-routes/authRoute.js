const authController = require('../4-controllers/auth.controller')
const express = require('express')
const router = express.Router()

// REGISTER
router.post('/register', authController.register)

//LOGIN
router.post('/login', authController.login)

module.exports = router
