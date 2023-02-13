const bcrypt = require('bcrypt')
const BCYPT_SALT_ROUND = parseInt(process.env.BCYPT_SALT_ROUND)

const hash = async (password) => {
	return bcrypt.hashSync(password, BCYPT_SALT_ROUND)
}

const compare = async (plainPass, hashedPass) => {
	const passwordValidation = await bcrypt.compare(plainPass, hashedPass)
	return passwordValidation
}

module.exports = {
	hash,
	compare,
}
