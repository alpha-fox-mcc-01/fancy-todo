const Todo = require('../models/todo');

module.exports = (req, res, next) => {
  const { id } = req.params;
  Todo.findById(id)
    .then(answer => {
      if(req.currentUserId == answer.authorId) {
        next();
      } else {
        next({
          name: 'Unauthorized',
          status: 401,
          errors: [ 'You are not authorized to take this action' ]
        })
      }
    })
};