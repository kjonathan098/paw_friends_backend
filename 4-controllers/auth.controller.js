const _ = require('lodash')
const { errorHandler } = require('../7-config/authErrorConfig')
const userServices = require('../5-services/user.services')
const authServices = require('../5-services/auth.service')
const { jwtLib } = require('../8-lib/jwt.lib')
const { loginValidation } = require('../2-joiValidations/loginValidation')
const { registerValidation } = require('../2-joiValidations/registrationValidation')
const { joiValidateService } = require('../5-services/joi.validate.serivces')

const register = async (req, res, next) => {
	// Validate body with Joi Service
	const error = joiValidateService(registerValidation, req.body)
	if (error) return next(errorHandler.joiValidationFailed(error))

	// Check if User already exists
	let user = await userServices.findByEmail(req.body.email)
	if (user) return next(errorHandler.userExist())

	// validate password matches
	if (req.body.password !== req.body.rePassword) return next(errorHandler.passwordMismatch())

	//Hash password
	const hashed = await authServices.generateHash(req.body.password)

	// change password to hashed
	req.body.password = hashed

	// save user to DB user Services
	user = await userServices.saveUser(req.body)

	return res.send({ succes: true, userId: user })
}

const login = async (req, res, next) => {
	// Validate Body with Joi
	const error = joiValidateService(loginValidation, req.body)
	if (error) return next(errorHandler.joiValidationFailed(error))

	// Check if users exist in DB and get user
	const user = await userServices.findByEmail(req.body.email)
	if (!user) return next(errorHandler.userNotFound())

	const passwordValidation = await authServices.comparePassword(req.body.password, user.password)
	if (!passwordValidation) return next(errorHandler.userNotFound())

	// Save user permissions in "reddis"

	// Create Tokens
	const tokens = jwtLib.createTokens(user)
	tokens.name = user.name
	tokens.surName = user.surName
	tokens.uid = user._id
	tokens.permissions = user.permissions
	return res.send(tokens)
}

module.exports = { register, login }
