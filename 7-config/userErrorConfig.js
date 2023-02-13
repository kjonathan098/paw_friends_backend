const userErrorHandler = {
	joiValidationFailed: (message) => {
		return {status: 400, message: message}
	},
	notFound: () => {
		return {status: 400, message: 'User not found'}
	},
	idMismatch: () => {
		return {status: 400, message: 'Please enter your correct user ID'}
	},
}

module.exports = {userErrorHandler}
