const express = require('express')
const router = express.Router()

const controller = require('../controllers/userController')

router.get('/', controller.getUsers)

router.post('/', controller.createUser)

router.get('/:id', controller.getOneUser)

router.put('/:id', controller.updateUser)

router.delete('/:id', controller.deleteUser)

module.exports = router;