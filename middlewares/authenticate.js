const User = require('../models/User')

const jwt = require('jsonwebtoken')

// cek access_token in the header, if there's none, respond with 403, not authorized
// if authenticated, put userid in the req.authenticatedUser
module.exports = function (req, res, next) {
	const { access_token } = req.headers
	if (access_token) {
		try {
			const authenticated = jwt.verify(access_token, process.env.JWT_PRIVATEKEY)
			if (authenticated) {
				User
					.findOne({ _id: authenticated.id })
					.then(result => {
						if (result) {
							// id masih terdaftar di database
							req.authenticatedUser = authenticated.id
							next()
						} else {
							// id sudah terhapus di database, namun token masih valid
							next({
								code: 403,
								msg: 'userID tidak ditemukan'
							})
						}
					})
					.catch(err => {
						next({
							code: 500,
							msg: 'error getting user, check mongoDB'
						})
					})
			} else {
				next({
					code: 403,
					msg: "Invalid access_token / must signin first"
				})
			}
		} catch (error) {
			next({

				code: 403,
				msg: "bad access_token",
				details: error
			})
		}
	} else {
		next({
			code: 403,
			msg: 'This page can only be accessed by loggedon user'
		})
	}
}