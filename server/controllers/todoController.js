const Todo = require('../models/todo')
const ObjectID = require('mongoose').Types.ObjectId
module.exports = {
    getTodos(req, res, next) {
        Todo.find({
            userId: ObjectID(req.currentUserId) 
        })
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    getOneTodo(req, res, next) {
        Todo.findById(req.params.id)
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    createTodo(req, res, next) {
        Todo.create({
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date),
            userId: ObjectID(req.body.userId)
        })
            .then(data => {
                res.status(201).json({data})
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    updateTodo(req, res, next) {
        Todo.updateOne( {_id: ObjectID(req.params.id)}, {
            name: req.body.name,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date)
        })
            .then(result => {
                res.status(200).json({result})
            })
            .catch(err => {
                console.log(err.message)
                next(err)
            })
    },
    removeTodo(req, res, next) {
        Todo.deleteOne( {_id: ObjectID(req.params.id)} ) 
            .then(result => {
                res.status(200).json({result})
            })
            .catch(err => {
                console.log(err.message)
                next()
            })
    }
} 