const Todo = require('../models/todo')
// const Todo = require('../controllers/todoController')

module.exports = (req, res, next) => {
  Todo.findOne(req.params)
    .then(item => {
      const isOwner = item.UserId == req.body.activeUserId
      isOwner ? next() : res.status(401).json({ msg: 'Sorry, you\'re not authorized' })
    })
    .catch(err => res.status(500).json({ msg: err.message }))
}