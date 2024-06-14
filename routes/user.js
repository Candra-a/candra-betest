const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const authentication = require('../middlewares/authentication')

router.use('/login', userController.login)
router.post('/', userController.createUser)

router.use(authentication)
router.get('/', userController.showAllUser)
router.get('/:user_id', userController.showUserById)

router.get('/account-number/:account_number', userController.showOneUserByAccountNumber)
router.get('/registation-number/:registration_number', userController.showOneUserByRegistrationNumber)

router.get('/account-login-in-past-three-days', userController.showAccountLoginInPastThreeDays)

router.put('/:user_id', userController.updateDataUser)
router.patch('/:user_id', userController.updateDataUser)
router.delete('/:user_id', userController.deleteUser)

module.exports = router