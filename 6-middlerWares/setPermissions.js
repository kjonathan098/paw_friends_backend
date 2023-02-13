const userServices = require('../5-services/user.services')

const setPermissions = async (req, res, next) => {
	const user = await userServices.findUserById(req.user.uid)
	req.user.permissions = user.permissions
	next()
}

module.exports = setPermissions
