const Todo = require('../models/todomodel')
module.exports = function(req, res, next) {
    console.log('masuk authorization')
Todo.findOne({_id: req.params.id})
    .then( todo => {
    if (todo) {
        if (todo.UserId === req.currentUser) {
        console.log('masuk if todo')
        next()
        } else {
        next(403)
        }
    } else {
    next(404)    
    }
    })
    .catch( err => {
    next(500)
    })
}