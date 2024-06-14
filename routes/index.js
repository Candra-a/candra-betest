const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const userController = require('../controllers/user_controller')

router.use('/user', userRouter)

router.use('/login', userController.login)

module.exports = router