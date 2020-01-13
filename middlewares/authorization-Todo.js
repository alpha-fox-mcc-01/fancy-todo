const Todo = require('../models/Todo')
module.exports = function (req, res, next) {
	console.log(req.body.id, 'di authorize');

	Todo.findOne({ _id: req.body.id })
		.then(result => {
			if (req.authenticatedUser == result.userId) {
				next()
			} else {
				next({
					code: 401,
					msg: 'You cannot do that'
				})
			}
		})
		.catch(err => {
			console.log(err);
			next({
				code: 401,
				msg: 'You cannot do that!'
			})
		})

}