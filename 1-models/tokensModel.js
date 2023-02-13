const mongoose = require('mongoose')
const tokenSchema = mongoose.Schema({
	access_token: { type: String, required: true },
	refresh_token: { type: String, required: true },
	uid: { type: String, required: true },
})

const Tokens = mongoose.model('Token', tokenSchema)

exports.Tokens = Tokens
