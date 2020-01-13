const router = require('express').Router()
const User = require('../controllers/users')

router.post('/register', User.register)
router.post('/login', User.login)
router.post('/google-sign', User.googleSign)

// router.patch('/', User.changePassword)
// router.delete('/', User.deleteUser)

// Change Password and Delete User would be done after whole system of App with minimum requirements works

module.exports = router