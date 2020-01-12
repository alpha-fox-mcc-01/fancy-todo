const User = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
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

    static login(req, res, next) {
        console.log(req.body.email, 'email masuk nih')
        console.log(req.body.password, 'password juga')
        User.findOne({ email : req.body.email})
            .then (result => {
                if (result) {
                    let password = req.body.password
                    var checkPassword = bcrypt.compareSync(password, result.password)
                    if (checkPassword) {
                        const access_token = jwt.sign({
                            id: result._id,
                        }, process.env.SECRET)
                        console.log('login berhasil')
                        res.status(200).json({access_token : access_token})
                    } else {
                        next(401)
                    }
                } else {
                    next(401)
                }
            })
            .catch (err => {
                console.log(err)
                next(500)
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload
        client.verifyIdToken({
            idToken : req.body.google_token,
            audience: process.env.CLIENT_ID
        }) 
            .then(ticket => {
                payload = ticket.getPayload()
                return User.findOne({email: payload.email})
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    return User.create({
                        username: payload.name,
                        email: payload.email,
                        password: process.env.DEFAULT_PASSWORD,
                        picture: payload.picture
                    })
                }
            })
            .then(loggedinUser => {
                const access_token = jwt.sign({
                    id: loggedinUser._id,
                }, process.env.SECRET)
                res.status(200).json({access_token : access_token})
            })
            .catch(err => {
                console.log(err)
                next(400)
            })
    }
}


module.exports = userController