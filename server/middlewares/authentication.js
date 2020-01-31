const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
  const token = req.headers.access_token
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if(err) {
      next(err);
    } else {
      User.findById(decoded._id)
        .then(user => {
          if(user) {
            req.currentUserId = decoded._id;
            next();
          } else {
            next({
              name: 'Unauthorized Error',
              status: 401,
              errors: [ 'Access_token already expired' ]
            });
          }
        })
        .catch(next);
    }
  });
};