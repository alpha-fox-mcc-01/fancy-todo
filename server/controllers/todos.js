const Todo = require('../models/todo')

class TodoController{
    static create(req, res, next){
        const {name, description, status, budget_needed, due_date} = req.body

        Todo.create({
            name,
            description,
            status,
            budget_needed: budget_needed || 0,
            created_date: new Date(),
            due_date: due_date || null
        })
            .then(todo=>{
                res.status(201).json({todo, msg: 'Create Todo Success'})
            })
            .catch(err=>{
                next(err)
            })
    }

    static showAll(req, res, next){
        Todo.find({})
            .then(todos=>{
                console.log(todos)
                if (!todos.length) todos = 'No todos available' 
                res.status(200).json(todos)
            })
            .catch(err=>{
                next(err)
            })
    }

    static update(req, res, next){
        const {id, name, description, status, budget_needed, due_date} = req.body
        Todo.findByIdAndUpdate(id, { 
            name,
            description,
            status,
            budget_needed: budget_needed || 0,
            due_date: due_date || null
        })
            .then(todo=>{
                console.log(todo)
                res.status(200).json({todo, msg: "Success update"})
            })
            .catch(err=>{
                next(err)
            })
    }

    static updateStatus(req, res, next){
        const {id, status} = req.body
        let completed_date
        if (status === 'Done') completed_date = new Date()
        else completed_date = null
        Todo.findByIdAndUpdate(id, { 
            status,
            completed_date 
        })
            .then(todo=>{
                console.log(todo)
                res.status(200).json({todo, msg: 'Update status success'})
            })
            .catch(err=>{
                next(err)
            })
    }
    
    static delete(req, res, next){
        const {id} = req.body
        Todo.findByIdAndDelete(id)
            .then(todo=>{
                console.log(todo)
                res.status(200).json({todo, msg : 'Delete success'})
            })
            .catch(err=>{
                next(err)
            })
    }
}

module.exports = TodoController