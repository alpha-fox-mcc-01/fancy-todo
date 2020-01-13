const jwt = require('jsonwebtoken');
const User = require('../models/user')


module.exports = (req, res, next) => {
    if (req.headers.token === undefined) {
      res
        .status(401)
        .json("Not Authorized")
    }
    else {
      const authorized = jwt.verify(req.headers.token, process.env.SECRET_KEY)
      
      User.findOne({
        _id: authorized.id
      })

        .then(user => {
          if(user === null) {
            res
              .status(404)
              .json('Data Not Found')
          }
          else {
            next()
          }
        })
        .catch(err => {
          res
            .status(500)
            .json(err)
        })
    }
  }