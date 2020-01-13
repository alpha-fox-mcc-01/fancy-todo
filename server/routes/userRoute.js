const express = require('express')
const router = express.Router()

const controller = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.get('/', controller.getUsers)

router.get('/current', authentication, controller.getCurrentUser)

router.post('/', controller.createUser)

router.get('/:id', controller.getOneUser)

router.post('/google-sign-in', controller.googleSignIn)

router.put('/:id', authentication, controller.updateUser)

router.delete('/:id', authentication, controller.deleteUser)

module.exports = router;