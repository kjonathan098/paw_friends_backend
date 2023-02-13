const {User} = require('../1-models/userModel')
const {UserPermission} = require('../1-models/userPermissionsModel')
const _ = require('lodash')

const findUserById = async (uid) => {
	const user = await User.findById({_id: uid})
	return user
}

const findByEmail = async (email) => {
	const user = await User.findOne({email: email})
	if (user) return user
	return null
}

const saveUser = async (user) => {
	let newUser = _.pick(user, ['name', 'surName', 'email', 'password', 'phone', 'permissions'])
	newUser = new User(newUser)
	newUser = await newUser.save()
	return newUser._id
}

const saveUserInReddis = async (user) => {
	let userReddis = {permissions: user.permissions, uid: user._id}

	userReddis = new UserPermission(userReddis)

	await userReddis.save()
	return 'success'
}

const getAll = async () => {
	const users = await User.find()

	return users
}

const updateUser = async (uid, body) => {
	const updFields = await User.findByIdAndUpdate({_id: uid}, body, {new: true})
	return updFields
}

module.exports = {findUserById, findByEmail, saveUser, saveUserInReddis, getAll, updateUser}
