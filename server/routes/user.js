const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/findUser', UserController.findUser);
router.post('/googleLogin', UserController.googleLogin);
router.post('/registerUser', UserController.register);
router.post('/login', UserController.login);

module.exports = router;