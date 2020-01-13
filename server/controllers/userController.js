
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_TOKEN);
const jwt = require('jsonwebtoken')
const User = require('../models/user')
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

class userController {

    static googlesignin(req, res) {
        let payload

        client.verifyIdToken({
            idToken: req.body.google_token,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                payload = ticket.getPayload()
                // console.log(payload)
                return User.findOne({ email: payload.email })
            })
            .then(userData => {
                if (!userData) {
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
                res.status(200).json({ token, name })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static add(req, res) {
        let acces_token = req.body.pk;
        let authenticated = req.currentUserid

        // console.log(req.body, '=========')
        // console.log(authenticated, '+++++++')

        const obj = {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            duedate: req.body.duedate
        }

        User.update(
            { _id: authenticated },
            { $push: { todo: obj } },
        )
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(500).json(err)

            })

    }

    static get(req, res) {
        // console.log(req.params)
        let acces_token = req.params.id;
        let authenticated = jwt.verify(acces_token, process.env.SECRET);


        User.findOne(
            { _id: authenticated }
        )
            .then(data => {
                res.status(200).json({ data })

            })
            .catch(err => {
                res.status(500).json(err)

            })

    }

    static update(req, res) {
        let acces_token = req.body.pk;
        let authenticated = req.currentUserid

        console.log(req.body, '=========')
        
         let name = req.body.name
         let description = req.body.description
         let status = req.body.status
         let duedate = req.body.duedate
        

        User.updateOne({ 'todo._id': req.params.targetid },
            {
                '$set': {
                    'todo.$.name': name,
                    'todo.$.description': description,
                    'todo.$.status': status,
                    'todo.$.duedate': duedate
                }
            })
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                res.status(500).json(err)

            })

    }

    static delete(req, res) {

        let authenticated = req.currentUserid
        console.log(req.currentUserid)
        let pr = ObjectId(req.params.targetid)
        User.findByIdAndUpdate(
            authenticated,
            { $pull: { 'todo': { _id: pr } } })
            .then(data => {
                res.status(200).json({ data })

            })
            .catch(err => {
                res.status(500).json(err)

            })
    }
}

module.exports = userController