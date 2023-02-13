module.exports = function errorMiddleware(err, req, res, next) {
	
	res.status(err.status).send({
		error: true,
		message: err.message,
	})
}
