const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    let token = req.headers.access_token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(400).send(err.message)
        } else {
            req.currentUserId = decoded._id
            next()
        }
    })
} 