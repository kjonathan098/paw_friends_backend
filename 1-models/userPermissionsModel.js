const mongoose = require('mongoose')

const userPermissionsSchema = mongoose.Schema({
	uid: {
		type: String,
		minlength: 3,
	},
	permissions: {type: Object, required: true},
})
const UserPermission = mongoose.model('reddis', userPermissionsSchema)
exports.UserPermission = UserPermission
