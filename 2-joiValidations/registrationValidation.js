const Joi = require('joi')
const { max } = require('lodash')
const registerValidation = (object) => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		surName: Joi.string().min(3).required(),
		email: Joi.string().min(3).required().email(),
		password: Joi.string().min(3).required(),
		rePassword: Joi.string().min(3).required(),
		phone: Joi.number().min(5).required(),
		permissions: Joi.object(),
	})

	const validation = schema.validate(object)
	return validation
}

const editProfileValidation = (object) => {
	const schema = Joi.object({
		name: Joi.string().min(1).max(20),
		surName: Joi.string().min(1).max(30),
		email: Joi.string().min(3).email(),
		password: Joi.string().min(3).max(30),
		rePassword: Joi.string().min(3).max(30),
		phone: Joi.number().min(4),
		permissions: Joi.object(),
		bio: Joi.string().max(250),
	})

	const validation = schema.validate(object)
	return validation
}
exports.registerValidation = registerValidation
exports.editProfileValidation = editProfileValidation
