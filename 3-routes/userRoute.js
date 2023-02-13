const {validateToken} = require('../6-middlerWares/validateToken')
const setPermissions = require('../6-middlerWares/setPermissions')

const userController = require('../4-controllers/user.controller')
const express = require('express')
const router = express.Router()

// GET USER BY ID
router.get('/:id', userController.getById)

// GET ALL  USERS
router.get('/', validateToken, setPermissions, userController.getAll)

// GET USER BY ID FULL
router.get('/:id/full', userController.getFullUser)

// UPDATE USER
router.put('/:id', validateToken, userController.editProfile)

// UPDATE USER PASSWORD
router.put('/password/:id', validateToken, userController.editPassword)

module.exports = router
