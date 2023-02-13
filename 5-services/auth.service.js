const {Tokens} = require('../1-models/tokensModel')
const _ = require('lodash')
const {UserPermission} = require('../1-models/userPermissionsModel')
const bcryptLib = require('../8-lib/bcrypt.lib')

const saveTokensDB = async (access_token, refresh_token, uid) => {
	let tokens = new Tokens({
		access_token,
		refresh_token,
		uid,
	})

	tokens = await tokens.save()
}

const saveUserInReddis = async (user) => {
	let userReddis = {permissions: user.permissions, uid: user._id}

	userReddis

	userReddis = new UserPermission(userReddis)

	await userReddis.save()
	return 'success'
}

const generateHash = async (password) => {
	const hash = await bcryptLib.hash(password)
	return hash
}

const comparePassword = async (plainPass, hashedPass) => {
	const res = await bcryptLib.compare(plainPass, hashedPass)

	return res
}

module.exports = {saveTokensDB, saveUserInReddis, generateHash, comparePassword}
