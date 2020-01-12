const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authentication = require('../middleware/authentication')


router.post('/register', userController.addUser)
router.post('/login', userController.login)
router.get('/', userController.getUser)
router.delete('/:id', userController.deleteUser)
router.put('/:id', userController.editUser)

module.exports = router