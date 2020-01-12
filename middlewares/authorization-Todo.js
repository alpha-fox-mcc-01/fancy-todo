const Todo = require('../models/Todo')
module.exports = function (req, res, next) {
	Todo.findOne({ _id: req.body.id }, 'userId')
		.then(result => {
			if (req.authenticatedUser == result.userId) {
				console.log('user authorized')
				next()
			} else {
				next({
					code: 401,
					msg: 'You cannot do that'
				})
			}
		})

}