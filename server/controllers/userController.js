const User = require('../models/usermodel')

class userController {
    static addUser(req, res, next) {
        console.log('masuk create')
        User.create({
            username: req.body.username,
            email : req.body.email,
            password: req.body.password
        })
            .then(data => {
                res.status(201).json({message: 'User successfully registered'})
            })
            .catch(err => {
                console.log(err)
                next(err.message)
            })
    }

    static getUser(req, res, next) {
        User.find()
            .then(result => {
                res.status(200).json({ listUsers : result})
            })
            .catch(err => {
                console.log(err)
                next(500)
            })
    }

    static deleteUser(req, res, next) {
        User.deleteOne({
            _id : req.params.id
        })
            .then(result => {
                res.status(200).json({message: 'User successfully deleted'})
            })
            .catch(err => {
                console.log(err)
                next(500)
            })
    }

    static editUser(req, res, next) {
        User.updateOne({ _id : req.params.id}, {
            username: req.body.username,
            email : req.body.email,
            password: req.body.password
        })
            .then(result => {
                if(result.nModified == 1) {
                    res.status(200).json({message : 'User successfully updated'})
                } else {
                    next(500)
                }
                
            })
            .catch(err => {
                next(500)
            })
    }

    // static login(req, res, next) {

    // }
}


module.exports = userController