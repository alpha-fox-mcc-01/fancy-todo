const router = require('express').Router()
const User = require('../Controllers/userController')

router.post('/', User.googleLogin)
router.post('/register', User.addUser)




module.exports = router