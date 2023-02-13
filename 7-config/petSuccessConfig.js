const successHandler = {
	petRequestSuccess: (message) => {
		return {success: true, message: message}
	},
}

module.exports = {successHandler}
