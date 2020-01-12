const User = require('../models/user')
const { OAuth2Client } = require('google-auth-library');
const clientId = process.env.CLIENT_ID
const client = new OAuth2Client(clientId);
const jwt = require('jsonwebtoken');

class UserController {
   static loginGoogle(req, res, next) {
      let token = req.body.token
      let dataUser
      client.verifyIdToken({
         idToken: token,
         audience: clientId
      })
         .then(ticket => {
            console.log(`masuk controller`);
            // console.log(ticket.payload);
            dataUser = ticket.payload

            return User.findOne({ email: dataUser.email })
         })
         .then(user => {
            if (!user) {
               // console.log(dataUser);

               let newUser = {
                  name: dataUser.name,
                  googleSign: true,
                  email: dataUser.email
               }
               return User.create(newUser)
            }
            else {
               return user
            }
         })
         .then(user => {
            const idUser = user._id
            const token = jwt.sign({ id: idUser }, process.env.SECRET);
            res.status(200).json({ token })
         })
         .catch(err => {
            console.log(err);
            next()
         })
   }

   // static create(req, res, next) {
   //    User.create({
   //       name: req.body.name,
   //       email: req.body.email,
   //       password: req.body.password,
   //    })
   //       .then(data => {
   //          console.log(data);
   //          res.status(201).json({data}) 
   //       })
   //       .catch(err => {
   //          console.log(err);
   //          next()
   //       })
   // }

   static get(req, res, next) {
      let accessToken = req.params.id
      console.log(accessToken, `ini accessToken bro`);

      let authenticated = jwt.verify(accessToken, process.env.SECRET)
      console.log(`====bawah ini adalah authenticates===`);
      console.log(authenticated);

      User.findOne({
         _id: authenticated.id
      })
         .then(data => {
            console.log(data);
            res.status(200).json(data)
         })
         .catch(err => {
            next()
         })
   }

   static addTodo(req, res, next) {
      let accessToken = req.params.id
      let authenticated = jwt.verify(accessToken, process.env.SECRET)
      console.log(`masuk controller add`);
      console.log(authenticated.id);

      let obj = {
         name: req.body.name,
         description: req.body.description,
         status: req.body.status,
         due_date: req.body.due_date
      }

      User.findOneAndUpdate(
         {_id : authenticated.id},
         {$push : {todo : obj}
      })
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err=> {
            next()
         })
   }
}


module.exports = UserController