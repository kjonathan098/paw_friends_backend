const jwt = require('jsonwebtoken')
const sceretJwt = process.env.JWT_SECRET

const _ = require('lodash')

const jwtLib = {
	createTokens: (user) => {
		const expDate = Math.floor((Date.now() / 1000) * 60 * 60 * 24 * 365)

		const refreshExp = Math.floor((Date.now() / 1000) * 60 * 60 * 24 * 365)

		const payloadData = _.pick(user, ['_id', 'name', 'permissions'])

		const acces_token = jwt.sign({payloadData, exp: expDate}, sceretJwt)

		const refresh_token = jwt.sign({payloadData, refresh: true, exp: refreshExp}, sceretJwt)

		return {acces_token, refresh_token}
	},

	verify: (token) => {
		const decoded = jwt.verify(token, sceretJwt)
		return decoded
	},
}

module.exports = {jwtLib}
