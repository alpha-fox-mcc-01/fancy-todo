const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');

const User = require('../models/User')

class UserController {
	static googleAuth(req, res, next) {
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
		async function verifyGoogleToken() {
			const ticket = await client.verifyIdToken({
				idToken: req.headers.google_token,
				audience: process.env.GOOGLE_CLIENT_ID
			})
			const payload = ticket.getPayload()

			if (payload) {
				User
					.findOne({ email: payload.email })
					.then(result => {
						if (result) {
							const jwt_token = jwt.sign({ id: result._id }, process.env.JWT_PRIVATEKEY)
							res.status(201).json(jwt_token)
						} else {
							console.log('create new user with email', payload.email);
							User
								.create({
									email: payload.email,
									password: payload.at_hash,
									fullname: payload.name,
									todos: []
								})
								.then(createdUser => {
									const jwt_token = jwt.sign({ id: createdUser._id }, process.env.JWT_PRIVATEKEY)
									res.status(201).json(jwt_token)
								})
								.catch(err => {
									next({
										code: 500,
										msg: 'User creation failed, check google API'
									})
								})
						}
					})
					.catch(err => {
						next({
							code: 500,
							msg: 'Err, cannot fetch User',
							details: err
						})
					})
			} else {
				next({
					code: 500,
					msg: 'Bad Google Token'
				})
			}
		}

		verifyGoogleToken().catch(err => {
			console.log(err)
			next({
				code: 400,
				err
			})
		})
	}

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

	static signin(req, res, next) {
		User
			.findOne({ email: req.body.email })
			.then(user => {
				if (user) {
					const valid = bcrypt.compareSync(req.body.password, user.password)
					if (valid) {
						const jwt_token = jwt.sign({ id: user._id }, process.env.JWT_PRIVATEKEY)
						console.log(jwt_token);
						res.status(200).json(jwt_token)
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

	static getMyTodo(req, res, next) {
		User.findById(req.authenticatedUser, [ 'tags' ])
			.populate('todos')
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => {
				next({
					code: 500,
					msg: err
				})
			})
	}

	static getAppData(req, res, next) {
		console.log(req.authenticatedUser, 'ini di getAppData');

		User.findById(req.authenticatedUser)
			.populate('todos')
			.then(result => {
				res.status(200).json(result)
			})
			.catch(err => {
				next({
					code: 500,
					msg: err
				})
			})
	}
}

module.exports = UserController