const router = require('express').Router()
const todos = require('./todos')
const users = require('./users')


router.get('/', (req, res)=>{
    res.status(200).json('Welcome to Fancy Todo API. For further information, please read the documentation in https://github.com/nafies1/fancy-todo')
})

router.use('/todos', todos)
router.use('/user', users)

module.exports = router