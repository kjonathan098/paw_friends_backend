const {Pet} = require('../1-models/petsModels')
const _ = require('lodash')
const {SavePet} = require('../1-models/userAdoptedPetsModel')
const {FavoritePet} = require('../1-models/userSavePet')

// Create an obj of pet for DB
const formPetObj = (body) => {
	let petObj = _.pick(body, ['type', 'name', 'adoptionStatus', 'picture', 'height', 'weight', 'color', 'bio', 'hypoallergenic', 'dietaryRestrictions', 'breed'])
	return petObj
}

const addPet = async (body) => {
	let pet = formPetObj(body)

	pet = new Pet(pet)
	pet = await pet.save()
	return pet
}

const getAll = async () => {
	const pets = await Pet.find()
	return pets
}

const queryHandler = async (query) => {
	const qResponse = await Pet.find(query)
	return qResponse
}

const getOne = async (id) => {
	const pet = await Pet.findById(id)
	return pet
}

const changePetStatus = async (petId, userRequest) => {
	await Pet.findByIdAndUpdate({_id: petId}, {adoptionStatus: userRequest})
	return true
}

const adoptFirstPet = async (petId, uid) => {
	const pet = new SavePet({uid: uid, adoptedPet: petId})
	await pet.save()
	return true
}

const editPet = async (body, petId) => {
	// Call function to create the obj for us
	const petObj = formPetObj(body)

	// Find a pet and edit
	const pet = await Pet.findByIdAndUpdate({_id: petId}, petObj, {new: true})
	if (!pet) return false

	return pet
}

const returnPet = async (petId, uid) => {
	const pet = await SavePet.findOneAndUpdate({uid: uid}, {$pull: {adoptedPet: petId}})

	if (!pet) return false

	return 'Pet returned to shelter'
}

const changeOwner = async (petId) => {
	const pet = await SavePet.findOneAndUpdate({pets: petId}, {$pull: {adoptedPet: petId}})

	if (!pet) return false
	return 'Pet returned to shelter'
}

const checkStatus = (status, userRequest) => {
	if (status === 2) return 'Adopted'

	if (status === 1 && userRequest === 1) return 'Fostered'

	if (status === 1 && userRequest === 0) return 'changeOwner'
}

const findUserPetsAndUpd = async (petId, uid) => {
	const findDoc = await SavePet.findOneAndUpdate({uid: uid}, {$push: {adoptedPet: petId}})

	if (!findDoc) return null
	return true
}

const saveFavoritePet = async (uid, petId) => {
	const updDoc = await SavePet.findOneAndUpdate({uid: uid}, {$push: {favoritePet: petId}}, {new: true})
	if (!updDoc) return null
	return updDoc
}

// CHANGE NAME REMEMBER
const saveFirstFavoritePet = async (uid, petId) => {
	const pet = new SavePet({uid: uid, favoritePet: petId})
	await pet.save()
	return pet
}

// DELETE PET FROM FAVORITES
const removePetFromList = async (uid, petId) => {
	const updDoc = await SavePet.findOneAndUpdate({uid: uid}, {$pull: {favoritePet: petId}}, {new: true})
	return updDoc
}

// FIND USER'S ADOPTED AND FAVORITED PETS
const findUserStoredPets = async (userId) => {
	// find adopted pets and populate
	let adoptedPets = await SavePet.findOne({uid: userId}).populate('adoptedPet').populate('uid', 'name , _id').populate('favoritePet').populate('uid', 'name , _id')

	return adoptedPets
}

const getFullUser = async (uid) => {
	const user = await SavePet.findOne({uid: uid}).populate('adoptedPet', '-_id').populate('uid', '-password')

	return user
}

module.exports = {addPet, getAll, getOne, findUserPetsAndUpd, changePetStatus, adoptFirstPet, editPet, returnPet, changeOwner, checkStatus, saveFavoritePet, saveFirstFavoritePet, removePetFromList, findUserStoredPets, getFullUser, queryHandler}
