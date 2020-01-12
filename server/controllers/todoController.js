const Todo = require('../models/todomodel')
const instance = require('../helper/axiosInstance')

class todoController {
    static addTodo(req, res, next) {

        Todo.create({
            name: req.body.name,
            description : req.body.description,
            status: req.body.status,
            due_date : req.body.due_date,
            userId: req.body.userId
        })
            .then(data => {
                res.status(201).json({message: 'To-do has been added!'})
            })
            .catch(err => {
                console.log(err)
                next(500)
            })
    }

    static getList(req, res, next) {
        console.log('masuk controller todo')
        let dailyQuote
        instance.get('/advice')
            .then( quote => {
                dailyQuote = quote.data
                return Todo.find().populate('User')
            })
            .then(result => {
                console.log(dailyQuote, 'INI QUOTENYAAA')
                res.status(200).json({result : result, qotd: dailyQuote.slip.advice})
            })
            .catch(err => {
                console.log(err)
                next(500)
            })
    }

    static getTodoUser(req, res, next) {
        console.log(req.params.id, 'paramsnya bener ga?')
        Todo.find({userId: req.params.id})
            .then(result => {
                console.log('masuk controller')
                res.status(200).json({result: result})
            })
            .catch(err => {
                console.log(err)
                next(500)
            })

    }

    static deleteTodo(req, res, next) {
        Todo.deleteOne({
            _id : req.params.id
        })
            .then(result => {
                res.status(200).json({message: 'To-do successfully deleted'})
            })
            .catch(err => {
                console.log(err)
                next(500)
            })
    }

    static updateStatus(req, res, next) {
        Todo.updateOne({ _id : req.params.id}, {
            status: req.body.status
        })
            .then(result => {
                if(result.nModified == 1) {
                    res.status(200).json({message : 'To-do successfully updated'})
                } else {
                    next(500)
                }
                
            })
            .catch(err => {
                next(500)
            })
    }

}


module.exports = todoController