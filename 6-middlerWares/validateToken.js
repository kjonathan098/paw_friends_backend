const {errorHandler} = require('../7-config/authErrorConfig')
const {jwtLib} = require('../8-lib/jwt.lib')

// REMEMBER TO CHANGE SECRET TO .ENV FILE and DO IT IN LIB INSTEAD

const validateToken = async (req, res, next) => {
	if (['/api/users/login', '/api/auth/register'].includes(req.url)) return next()

	const token = req.header('Authorization')
	if (!token) return next(errorHandler.needToLogin())

	// verify token
	try {
		const decoded = jwtLib.verify(token)
		if (decoded.refresh) return next(errorHandler.needToLogin())
		req.user = {uid: decoded.payloadData._id}
		next()
	} catch (ex) {
		return res.send(ex.message)
	}
}

exports.validateToken = validateToken
