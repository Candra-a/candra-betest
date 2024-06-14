const userRepository = require('../repositories/user_repository');
const { checkPassword, hashPassword } = require('../helpers/bcrypt')
const {createToken} = require('../helpers/jwt')

const createRedisClient = require('../config/redis');
const { promisify } = require('util');
const redisClient = createRedisClient();
const redisGetAsync = promisify(redisClient.get).bind(redisClient);

async function createUser(userData) {
    const data = {
        username: userData.username,
        account_number: userData.account_number,
        email_address: userData.email_address,
        full_name: userData.full_name,
        password: hashPassword(userData.password),
        registration_number: userData.registration_number,
        user_id: userData.user_id,
        account_id: userData.account_id
    }

     const create = await userRepository.createUser(data);

    // delete redis cache
    redisClient.del('allUsers');

    const data_result = {
        username: userData.username,
        account_number: userData.account_number,
        email_address: userData.email_address ? userData.email_address : "",
        full_name: userData.full_name ? userData.full_name : "",
        registration_number: userData.registration_number,
        user_id: userData.user_id,
        account_id: userData.account_id
    }

    return data_result
}

async function login(data) {
    const findUser = await userRepository.findOneUser({username: data.username});

    if(!findUser) {
        res.status(401).json({
            message: "Account not found!"
        })
        return
    }
    const checkingPassword = checkPassword(data.password, findUser.password)
    if(checkingPassword) {
        const data_token = {
            user_id: findUser.user_id,
            username: findUser.username,
            account_id: findUser.account_id
        }

        const updateLoginTime = await userRepository.findOneAndUpdateUser({user_id: findUser.user_id}, {last_login_date: new Date})

        return ({
            access_token: createToken(data_token), //put it on headers to access API need authentication
            username: data.username,
            account_id: data.account_id
        })
    } else {
        res.status(401).json({
            message: "Username and password not match!"
        })
    }
  }

async function showUserById(id) {
    const cacheKey = `user:${id}`

    // get data from cache redis
    const cachedData = await redisGetAsync(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData)
    } else {
        const user = await userRepository.findUserById(id);

        if (!user) {
            res.json({ message: 'Data not found' });
            return;
        }

        const user_info = {
            account_number: user.account_number,
            email_address: user.email_address,
            full_name: user.full_name,
            registration_number: user.registration_number,
            user_id: user.user_id
        }

        // Save data on cache redis
        redisClient.setEx(cacheKey, 3600, JSON.stringify(user_info)); // Cached in 1 hour

        return user_info
    }
}

async function findOneAndUpdateUser(id, data) {
    const updateData = await userRepository.findOneAndUpdateUser(id, data)

    if(!updateUser) {
        res.status(500).json({
            message: 'Update failed'
        })
        return
    }

    //========================= Handle data user cache ============================
    if(updateUser) {
        const cacheKeyAccount = `getUserAccountNumber:${updateUser.account_number}`
        const cacheKeyIdentity = `getUserRegistrationNumber:${updateUser.registration_number}`

        const cachedDataAccount = await redisGetAsync(cacheKeyAccount);
        const cachedDataIdentity = await redisGetAsync(cacheKeyIdentity);

        if(cachedDataAccount) {
            redisClient.setEx(cacheKeyAccount, 3600, JSON.stringify(updateUser)); // Cached in 1 hour
        }

        if(cachedDataIdentity) {
            redisClient.setEx(cacheKeyIdentity, 3600, JSON.stringify(updateUser)); // Cached in 1 hour
        }
    }
    //=============================================================================

    return updateData
}

async function showAllUser() {
    const cacheKey = 'allUsers';

    // get data from cache redis
    const cachedData = await redisGetAsync(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData)
    } else {
        const users = await userRepository.findAllUser();

        // Save data on cache redis
        redisClient.setEx(cacheKey, 3600, JSON.stringify(users)); // Cached in 1 hour

        return users
    }
}

async function showAccountLoginInPast3days() {
    const date = new Date(today.setDate(today.getDate() - 3))
    return await userRepository.findAccountLoginMore3Days(date);
}

async function showOneUserByAccountNumber(account_number) {
    const cacheKey = `getUserAccountNumber:${account_number}`

    // get data from cache redis
    const cachedData = await redisGetAsync(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData)
    } else {
        const dataUser = await userRepository.findOneUser({account_number: account_number});

        const user_info = {
            account_number: dataUser.account_number,
            email_address: dataUser.email_address,
            full_name: dataUser.full_name,
            registration_number: dataUser.registration_number
        }

        // Save data on cache redis
        redisClient.setEx(cacheKey, 3600, JSON.stringify(dataUser)); // Cached in 1 hour

        return user_info
    }
}

async function showOneUserByRegistrationNumber(registration_number) {
    const cacheKey = `getUserRegistrationNumber:${registration_number}`

    // get data from cache redis
    const cachedData = await redisGetAsync(cacheKey);

    if (cachedData) {
        return JSON.parse(cachedData)
    } else {
        const dataUser = await userRepository.findOneUser({registration_number: registration_number});

        // Save data on cache redis
        redisClient.setEx(cacheKey, 3600, JSON.stringify(dataUser)); // Cached in 1 hour

        return dataUser
    }
}

async function deleteUser(user_id) {
    const user = await userRepository.deleteUserById(user_id)

    //delete redis cache
    redisClient.del('allUsers');

    return
}

module.exports = {
    createUser,
    login,
    showUserById,
    findOneAndUpdateUser,
    showAllUser,
    showOneUserByAccountNumber,
    showOneUserByRegistrationNumber,
    deleteUser,
    showAccountLoginInPast3days
};