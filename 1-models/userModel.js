const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
	},
	surName: {
		type: String,
		required: true,
		minlength: 3,
	},
	email: {
		type: String,
		required: true,
		minlength: 3,
	},
	password: {
		type: String,
		required: true,
		minlength: 3,
	},
	phone: {
		type: Number,
		required: true,
		minlength: 5,
		maxlength: 9,
	},
	permissions: {
		type: Number,
		required: true,
		default: 0,
	},

	bio: {
		type: String,
		maxlength: 250,
		default: null,
	},
})

const User = mongoose.model('User', userSchema)
exports.User = User
