const joiValidateService = (validatorFunction, body) => {
	const {error} = validatorFunction(body)
	if (error) return error.details[0].message
	return null
}

exports.joiValidateService = joiValidateService
