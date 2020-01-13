const User = require('../models/user')
const ObjectID = require('mongoose').Types.ObjectId
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const jwt = require('jsonwebtoken')
module.exports = {
    getUsers(req, res, next) {
        User.find()
            .then(data => {
                console.log(data)
                res.status(200).json({ data })
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    getOneUser(req, res, next) {
        User.findById(req.params.id)
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    getCurrentUser(req, res, next) {
        User.findById(req.currentUserId)
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    createUser(req, res, next) {
        User.create({
            username: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then(data => {
                res.status(201).json({ data })
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    updateUser(req, res, next) {
        User.updateOne({ _id: ObjectID(req.params.id)}, {
            username: req.body.username,
            password: req.body.password
        })
            .then(result => {
                res.status(200).json({ result })
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    deleteUser(req, res, next) {
        User.deleteOne({ _id: ObjectID(req.params.id)})
            .then(result => {
                res.status(200).json({ result })
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    googleSignIn(req, res, next) {
        let userData = null;
        client.verifyIdToken({
            idToken: req.body.google_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                userData = ticket.getPayload();
                return User.findOne({
                    email: userData.email
                })
            })
            .then(user => {
                if(user) {
                    return user
                } else {
                    return User.create({
                        username: userData.fullname,
                        email: userData.email,
                        password: process.env.DEFAULT_PASSWORD_OAUTH
                    })
                }
            })
            .then(user => {
                const access_token = jwt.sign({
                    _id: user._id
                }, process.env.JWT_SECRET)
                res.status(200).json({access_token})
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}