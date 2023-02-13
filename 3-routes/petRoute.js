const {validateToken} = require('../6-middlerWares/validateToken')
const express = require('express')
const setPermissions = require('../6-middlerWares/setPermissions')

const petController = require('../4-controllers/pet.controller')

const router = express.Router()

//POST
router.post('/', validateToken, setPermissions, petController.addPet)

// FIND ALL
router.get('/', petController.findAll)

router.get('/query', petController.handleQuery)

// FIND ONE
router.get('/:id', petController.findOne)

// FIND ONE AND ADOPT
router.post('/:id/adopt', validateToken, petController.adoptFoster)

// RETURN A PET
router.post('/:id/return', validateToken, petController.returnPet)

// EDIT PET
router.put('/:id', validateToken, setPermissions, petController.editPet)

// SAVE A FAVORITE PET
router.post('/:id/save', validateToken, petController.savePet)

// DELETE A FAVORITE A PET
router.delete('/:id/save', validateToken, petController.deletePet)

// GET A USER'S ADOPT/SAVED PETS
router.get('/userPets/:id', petController.findUserPets)

module.exports = router
