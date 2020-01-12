const express = require('express')
const router = express.Router()
// const authentication = require('../middlewares/authentication')
const UserController = require('../controllers/userController')

router.post('/googlesignin', UserController.googleSignIn)
router.post('/signin', UserController.signIn)
router.post('/signup', UserController.signUp)


module.exports = router