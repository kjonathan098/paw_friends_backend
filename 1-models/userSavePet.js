const mongoose = require('mongoose')

const userSavePetsSchema = mongoose.Schema({
	uid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	favoritePet: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pets', required: true}],
})
const FavoritePet = mongoose.model('user.Favorite.Pet', userSavePetsSchema)
exports.FavoritePet = FavoritePet
