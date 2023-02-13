const Joi = require('joi')

const loginValidation = (object) => {
	const schema = Joi.object({
		email: Joi.string().min(3).required().email(),
		password: Joi.any().required(),
	})

	const validation = schema.validate(object)
	return validation
}

exports.loginValidation = loginValidation
