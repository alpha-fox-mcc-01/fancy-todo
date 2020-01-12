const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/findUser', UserController.findUser);
router.post('/googleLogin', UserController.googleLogin);
router.post('/registerUser', UserController.register);

module.exports = router;