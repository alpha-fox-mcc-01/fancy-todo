const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

class UserController {
	static signup(req, res, next) {
		const { email, fullname, password } = req.body
		const values = {
			email,
			password,
			fullname
		}

		User
			.create(values)
			.then(result => {
				res.status(201).json(result)
			})
			.catch(err => {
				next({
					code: 400,
					err
				})
			})
	}

	static deactivateAccount(req, res, next) {
		User
			.deleteOne({ _id: req.authenticatedUser })
			.then(result => {
				if (result.deletedCount > 0) {
					res.status(200).json({
						msg: 'Success deactivating account, your account has been deleted'
					})
				} else {
					res.status(201).json({
						msg: 'no rows affected'
					})
				}
			})
			.catch(err => {
				next({
					code: 500,
					msg: err
				})
			})
	}

	static changePassword(req, res, next) {
		// make sure authenticatedUser still on the database
		User
			.findOne({ _id: req.authenticatedUser })
			.then(result => {
				if (result) {
					// compare password on the database with user entered password
					return bcrypt.compare(req.body.currentPassword, result.password)
				} else {
					// user is not on the database anymore
					next({
						code: 403,
						msg: "please log on first"
					})
				}
			})
			.then(isValid => {
				if (isValid) {
					return jwt.verify(req.headers.access_token, process.env.JWT_PRIVATEKEY)
				} else {
					next({
						code: 403,
						msg: "Please enter you current password"
					})
				}
			})
			.then(jwtVerified => {
				const hashedPassword = bcrypt.hashSync(req.body.newPassword, 5)
				return User.findOneAndUpdate({ _id: jwtVerified.id }, { password: hashedPassword })
			})
			.then(result => {
				res.status(200).json({ msg: 'password changed' })
			})
			.catch(err => {
				next({
					code: 403,
					msg: 'please enter your current password'
				})
			})
	}

	static signin(req, res, next) {
		User
			.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					const valid = bcrypt.compareSync(req.body.password, user.password)
					if (valid) {
						const jwt_token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATEKEY)
						res.status(200).json({ access_token: jwt_token })
					} else {
						next({
							code: 401,
							msg: 'wrong username or password'
						})
					}
				} else {
					next({
						code: 401,
						msg: 'wrong username or password'
					})
				}
			})
			.catch(err => {
				next({
					code: 500,
					err
				})
			})
	}
}

module.exports = UserController