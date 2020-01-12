const Todo = require('../models/todo')

module.exports = (req, res, next) => {
  Todo.findOne(req.params)
    .then(item => {
      console.log(item.UserId)
      console.log(req.activeUserId)
      const isOwner = item.UserId == req.activeUserId
      isOwner ? next() : res.status(401).json({ msg: 'Sorry, you\'re not authorized' })
    })
    .catch(err => res.status(500).json({ msg: err.message }))
}