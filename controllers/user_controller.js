const userService = require('../services/user_service');

    exports.createUser = async (req, res) => {
        try{
            const newUser = await userService.createUser(req.body);

            res.status(200).json({
                data: newUser,
                message: 'User created'
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    exports.login = async (req, res) => {
        try{
            const login = await userService.login(req.body)

            res.status(200).json({
                data: login,
                message: 'Login successfully'
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    exports.showUserById = async (req, res) => {
        try{
            const data = await userService.showUserById(req.params.user_id)

            res.status(200).json({
                data: data
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    exports.updateDataUser = async (req, res) => {
        try{
            const updateUser = await userService.findOneAndUpdateUser({user_id: req.params.user_id}, req.body)

            res.status(200).json({
                data: updateUser,
                message: 'Update success'
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    exports.showAllUser = async (req, res) => {
        try{
            const dataUsers = await userService.showAllUser()

            res.status(200).json({
                data: dataUsers
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    exports.showAccountLoginInPastThreeDays = async (req, res) => {
        try{
            const dataUsers = await userService.showAccountLoginInPast3days()

            res.status(200).json({
                data: dataUsers
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    exports.showOneUserByAccountNumber = async (req, res) => {
        try{
            const dataUser = await userService.showOneUserByAccountNumber(req.params.account_number)

            res.status(200).json({
                data: dataUser
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    exports.showOneUserByRegistrationNumber = async (req, res) => {
        try{
            const dataUser = await userService.showOneUserByRegistrationNumber(req.params.registration_number)

            res.status(200).json({
                data: dataUser
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }

    exports.deleteUser = async (req, res) => {
        try{
            const deleteUser = await userService.deleteUser({user_id: req.params.user_id})

            res.status(200).json({
                message: `Data with id:${id} successfully deleted`
            })
        }catch (error) {
            res.json({
                message: error.message
            })
        }
    }