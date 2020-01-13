const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')
module.exports = function (req, res, next) {
    let access_token = req.headers.access_token
    console.log('masuk authentication!!!!!!!!!!!!!')
    console.log(access_token)
    try {
        
        let decoded = jwt.verify(access_token, process.env.SECRET)
        req.currentUserId = decoded.id
        console.log(decoded)
        User.findOne( {
            _id : req.currentUserId
        })
            .then(result => {
                if (result) {
                    console.log(req.currentUserId)
                    console.log(result)
                    next()
                } else {
                    next(403)
                }
            })
            .catch(err => {
                next(403)
            })

    } catch(err) {
        // console.log('masuk sini')
        next(500)
    }
}