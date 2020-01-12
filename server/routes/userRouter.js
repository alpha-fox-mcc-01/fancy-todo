const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const authenticated = require('../middlewares/authenticated')

// router.use(authenticated);


router.post('/googlesignin', userController.googlesignin)
router.post('/add', userController.add)
router.put('/update', userController.update)
router.delete('/delete/:userid/:targetid', userController.delete)
router.get('/get/:id', userController.get)

module.exports = router;