const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/googleSignIn', userController.loginGoogle)
// router.post('/createUser', userController.create)
router.get('/get/:id', userController.get)
router.post('/addTodo/:id', userController.addTodo)

module.exports = router