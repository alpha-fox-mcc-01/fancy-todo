
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_TOKEN);
const jwt = require('jsonwebtoken')
const User = require('../models/user')
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

class userController{

    static googlesignin(req, res){
        let payload

        client.verifyIdToken({
            idToken: req.body.google_token,
            audience: process.env.CLIENT_ID 
        })
        .then( ticket =>{
            payload = ticket.getPayload()
            // console.log(payload)
            return User.findOne({email: payload.email})
        })
        .then(userData => {
            if(!userData) {
                return User.create({
                    email: payload.email,
                    googleSignIn: true
                })
            }
            else {
                return userData
            }
        })
        .then(user => {
            
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            const name = payload.given_name;
            res.status(200).json({token, name, user})
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json(err)
        })
    }

    static add(req, res){
        let acces_token = req.body.pk;
        let authenticated = jwt.verify(acces_token, process.env.SECRET);

        // console.log(req.body, '=========')
        // console.log(authenticated, '+++++++')

        const obj = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            duedate: req.body.duedate
        } 

        User.update(
            { _id: authenticated._id }, 
            { $push: { todo: obj } },
        )
        .then(data =>{
            res.status(200).json({data})
        })
        .catch(err =>{
            res.status(500).json(err)
            
        })

    }

    static get(req, res){
        // console.log(req.params)
        let acces_token = req.params.id;
        let authenticated = jwt.verify(acces_token, process.env.SECRET);

        
        User.findOne(
            { _id: authenticated }
        )
        .then(data =>{
            res.status(200).json({data})
            
        })
        .catch(err =>{
            res.status(500).json(err)
            
        })
   
    }

    static update(req, res){
        
    }

    static delete(req, res){
        let acces_token = req.params.userid;
        let authenticated = jwt.verify(acces_token, process.env.SECRET);
       
        User.findOne({
            _id: authenticated
        })
        .then(data =>{
            // res.status(200).json({data})
            console.log(data.todo)
            let array1 = data.todo
            let pr = ObjectId(req.params.targetid)

            const found = array1.find(x => x._id == pr)
            console.log(found);
            
            
        })
        .catch(err =>{
            res.status(500).json(err)
            
        })
    }
}

module.exports = userController