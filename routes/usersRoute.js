const router = require('express').Router()
const UserController = require('../controllers/userController')

const authenticate = require('../middlewares/authenticate')

router.get('/', UserController.signin)
router.post('/', UserController.signup)
router.patch('/', authenticate, UserController.changePassword)
router.delete('/', authenticate, UserController.deactivateAccount)

module.exports = router