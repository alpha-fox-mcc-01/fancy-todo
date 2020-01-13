const Todo = require('../models/todo')
module.exports = function(req, res, next) {
    Todo.findById(req.params.id)
        .then((todo) => {
            if (req.currentUserId === todo.userId) {
                next()
            } else {
                res.status(401).json({error: 'You are not authorized to view this content'})
            }
        })
        .catch((err) => {
            next(err)
        })
}