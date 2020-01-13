const Todo = require('../models/todo')

module.exports = {
  add(req, res) {
    Todo.add(req.body, req.activeUserId)
      .then(success => {
        res
          .status(201)
          .json({ msg: 'created', success })
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ msg: err.message })
      })
  },

  find(req, res) {
    Todo.find()
      .then(found => {
        if (found.length >= 1) {
          res
            .status(200)
            .json(found)
        }
        else {
          res
            .status(404)
            .json({ msg: 'No data' })
        }
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ msg: err.message })
      })
  },

  findOne(req, res) {
    Todo.findOne(req.params)
      .then(found => {
        if (found) {
          res
            .status(200)
            .json(found)
        }
        else {
          res
            .status(404)
            .json({ msg: 'Item not found' })
        }
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ msg: err.message })
      })
  },

  deleteOne(req, res) {
    Todo.findOne(req.params)
      .then(found => {
        if (found) {
          return Todo.deleteOne(req.params.id)
        }
      })
      .then(() => {
        res
          .status(200)
          .json({ msg: 'item deleted' })
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ msg: 'Item not found' })
      })
  },

  updateOne(req, res) {
    Todo.findOne(req.params)
      .then(found => {
        if (found) {
          return Todo.updateOne(req.params.id, req.body)
        }
      })
      .then(() => res.send({ msg: 'item updated' }))
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ msg: 'Item not found' })
      })
  }
}