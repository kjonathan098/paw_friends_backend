const {User} = require('../1-models/userModel')
const {userErrorHandler} = require('../7-config/userErrorConfig')
const userServices = require('../5-services/user.services')
const {errorHandler} = require('../7-config/authErrorConfig')
const {UserSavedPet, AdoptPet} = require('../1-models/userAdoptedPetsModel')
const {joiValidateService} = require('../5-services/joi.validate.serivces')
const {editProfileValidation} = require('../2-joiValidations/registrationValidation')
const _ = require('lodash')
const authServices = require('../5-services/auth.service')

const formUserObj = (body) => {
	let userObj = _.pick(body, ['name', 'surName', 'email', 'password', 'phone', 'permissions', 'bio'])
	return userObj
}

const getById = async (req, res, next) => {
	const user = await userServices.findUserById(req.params.id)
	if (!user) return next(userErrorHandler.notFound())

	return res.send(user)
}

const getAll = async (req, res, next) => {
	//check if user is admin
	console.log(req.user.permissions, 'req.user.permissions')
	if (req.user.permissions === '0') return next(errorHandler.onlyAdmin())

	// get list of all users
	const users = await userServices.getAll()

	return res.send(users)
}

const getFullUser = async (req, res, next) => {
	uid = req.params.id

	// Search For user in DB
	let user = await userServices.findUserById(uid)
	if (!user) return next(userErrorHandler.notFound())

	user = await userServices.getFullUser(req.params.id)

	return res.send(user)
}

const editProfile = async (req, res, next) => {
	const editedRequest = req.body

	// //check that req id === token uid
	if (req.params.id !== req.user.uid) return next(userErrorHandler.idMismatch())

	// // validate that fields sent have values
	const error = joiValidateService(editProfileValidation, editedRequest)
	if (error) {
		return next(errorHandler.joiValidationFailed(error))
	}

	// create obj with any fields filled
	const editUser = formUserObj(editedRequest)

	// if user sent new email validate that it doesnt exist in DB
	if (editUser.email) {
		const user = await userServices.findByEmail(editUser.email)
		if (user) return next(errorHandler.userExist())
	}

	// save upd fields in DB
	const editedUser = await userServices.updateUser(req.user.uid, editUser)

	return res.send(editedUser)
}

const editPassword = async (req, res, next) => {
	// Get user's encrypted pass
	const user = await userServices.findUserById(req.user.uid)
	if (!user) return next(errorHandler.userNotFound())

	// // Lets check if password match with encrypted password
	const passwordValidation = await authServices.comparePassword(req.body.password, user.password)
	if (!passwordValidation) return next(errorHandler.userNotFound())

	// If validation passess encypt new password
	const newHashed = await authServices.generateHash(req.body.rePassword)

	// Update user new password
	await userServices.updateUser(req.user.uid, {password: newHashed})

	res.send({succes: true})
}

module.exports = {getById, getAll, getFullUser, editPassword, editProfile}
