const router = require('express').Router()
const UserController = require('../controllers/userController')

const authenticate = require('../middlewares/authenticate')

router.post('/signin', UserController.signin)
router.post('/signup', UserController.signup)
router.patch('/', authenticate, UserController.changePassword)
router.delete('/', authenticate, UserController.deactivateAccount)

router.get('/todos', authenticate, UserController.getMyTodo)

router.get('/data', authenticate, UserController.getAppData)

router.post('/gAuth', UserController.googleAuth)

module.exports = router