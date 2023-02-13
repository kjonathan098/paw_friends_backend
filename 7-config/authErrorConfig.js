const errorHandler = {
	joiValidationFailed: (message) => {
		return {status: 400, message: message}
	},
	userExist: () => {
		return {status: 400, message: 'Email already registered'}
	},
	userNotFound: () => {
		return {status: 400, message: 'Email already registered'}
	},
	passwordMismatch: () => {
		return {status: 400, message: 'Passwords dont match'}
	},
	needToLogin: () => {
		return {status: 400, message: 'Please Login.. Token mwf'}
	},
	userNotFound: () => {
		return {status: 400, message: 'Invalid email or password'}
	},
	onlyAdmin: () => {
		return {status: 400, message: 'Only Admins allowed'}
	},
}

module.exports = {errorHandler}
