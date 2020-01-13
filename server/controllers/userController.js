const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken')
const User = require('../models/user')

class UserController {
    static googleSignIn(req, res) {
        let payloadData
        
        client.verifyIdToken({
            idToken: req.body.google_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                payloadData = ticket.getPayload()
                return User.findOne({email: payloadData.email})
            })
            .then(userData => {
                if(!userData) {
                    return User.create({
                        email: payloadData.email,
                        googleSignIn: true
                    })
                }
                else {
                    return userData
                }
            })
            .then(user => {
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
                const name = payloadData.given_name;
                res.status(200).json({name, token})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static signUp(req, res) {
        User.findOne({
          email: req.body.email
        })
    
          .then(userData => {
            if (userData === null) {
    
              User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                googleSignIn: false
              })
                .then(createUser => {
    
                  const token = jwt.sign({ id: createUser._id }, process.env.SECRET_KEY)
    
                  res
                    .status(200)
                    .json({
                        name: req.body.name,
                        token
                    })
                })
    
                .catch(err => {
                  console.log(err)
                  res
                    .status(400)
                    .json(err)
                })
            }
            else {
              res
                .status(400)
                .json(`User with email ${req.body.email} already existed`)
            }
          })
    
          .catch(err => {
            res
              .status(500)
              .json(err)
          })
      }
    
      static signIn(req, res) {
        User.findOne({
          email: req.body.email
        })
          .then(userData => {
            if (userData === null) {
              res
                .status(404)
                .json("User not found, please sign up to continue")
            }
            else {
              let checkPassword = bcrypt.compareSync(req.body.password, userData.password)
              console.log(checkPassword)
              if (checkPassword === true) {
                const token = jwt.sign({ id: userData._id }, process.env.SECRET_KEY)
    
                res
                  .status(200)
                  .json({
                    name: req.body.name,
                    token
                  })
              }
              else {
                res
                  .status(401)
                  .json("Wrong username/password")
              }
            }
          })
          .catch(err => {
            res
              .status(500)
              .json(err)
          })
      }
    
}

module.exports = UserController