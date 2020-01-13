const {OAuth2Client} = require('google-auth-library');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

class UserController{

    static register(req, res, next){
        const {name, email, password} = req.body

        User.create({
            name,
            email,
            password,
            register_date: new Date()
        })
            .then(user=>{
                const idUser = user._id
                const token = jwt.sign({ id: idUser }, process.env.SECRET);
                res.status(201).json({token, msg: 'Register Success'})
            })
            .catch(err=>{
                next(err)
            })
    }

    static login(req, res, next){
        const {email, password} = req.body
        // const {email} = req.body

        User.findOne({ email })
            .then(user=>{
                let err = {
                    message : 'Username / Password wrong'
                }
                if(user) {
                    const authenticationResult = bcrypt.compareSync(password, user.password);
                    if (authenticationResult) {
                        const idUser = user._id
                        const token = jwt.sign({ id: idUser }, process.env.SECRET);
                        res.status(200).json({token, msg: 'Login Success'})
                    } else {
                        next(err)
                    }      

                } else {
                    next(err)
                }
                
            })
            .catch(err=>{
                next(err)
            })
    }

    static googleSign(req, res, next){        
        let payload
        let status
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket=>{
                payload = ticket.getPayload();
                const {email} = payload
                return User.findOne({email: email})
            })
            .then(user=>{
                const {name} = payload
                const {email} = payload
                if (!user) {
                    status.ids = 201
                    status.msg = "user not found. Create user"
                    return User.create({
                        name,
                        email,
                        password: 'google_sign',
                        register_date: new Date()
                    })
                } else{
                    status.msg = "user found"
                    status.ids = 200
                    return user
                }
            })
            .then(user=>{
                const idUser = user._id
                const token = jwt.sign({ id: idUser }, process.env.SECRET);
                res.status(status.ids).json({token, msg: status.msg})
            })
            .catch(err=>{
                next(err)
            })
    }
 
} // End of class User

module.exports = UserController