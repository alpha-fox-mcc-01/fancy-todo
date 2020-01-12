const User = require('../Models/userModel')
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

class UserController {

  static googleLogin(req, res){
    let token = req.body.id_token
    let dataUser = null
    client
      .verifyIdToken({
        idToken : token,
        audience : CLIENT_ID
      })
      .then(ticket => {
        dataUser = ticket.getPayload()
        return User.findOne({
          email : dataUser.email
        })
      })
      .then( user => {
        if(!user){
          let data = {
            name : dataUser.name,
            email : dataUser.email
          }
          return User.create(data)
        } else {
          return user
        }
      })
      .then(user => {
        const userId = user._id
        const token = jwt.sign({
          id : userId
        }, process.env.SECRET)
        res.status(200).json(token)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  }


  static addUser(req, res){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    User
      .findOne({
        email : req.body.email
      })
      .then( user => {
        if(user){
          console.log('email udah ada');
          return user
        } else {
          let data = {
            name : req.body.name,
            email : req.body.email,
            password : hash
          }
          return User
            .create(data)
        }
      })
      .then( user => {
        const userId = user._id
        const token = jwt.sign({
          id : userId
        }, process.env.SECRET)
        res.status(200).json(token)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }


}

module.exports = UserController