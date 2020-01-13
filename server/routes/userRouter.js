const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const authenticated = require('../middlewares/authenticated')

// router.use(authenticated);


router.post('/googlesignin', userController.googlesignin)
router.post('/add', authenticated, userController.add)
router.put('/update/:targetid', authenticated, userController.update)
router.delete('/delete/:userid/:targetid', authenticated, userController.delete)
router.get('/get/:id', authenticated, userController.get)

module.exports = router;