const User = require('../models/user_model');

async function createUser(userData) {
    try {
        return await User.create(userData)
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function findUserById(user_id) {
    try {
        return await User.findOne({user_id});
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error;
    }
}

async function deleteUserById(user_id) {
    try {
      return await User.deleteOne({user_id});
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
}

async function findOneUser(data) {
    try {
        return await User.findOne(data);
    } catch (error) {
        console.error('Error finding one user:', error);
        throw error;
    }
}

async function findOneAndUpdateUser(user_id, data) {
    try {
        return await User.findOneAndUpdate(user_id, data, {returnOriginal: false});
    } catch (error) {
        console.error('Error finding and update user:', error);
        throw error;
    }
}

async function findAllUser() {
    try {
        return await User.aggregate([
            {
                $project: {
                    _id: 0,
                    user_id: 1,
                    account_number: 1,
                    email_address: 1,
                    full_name: 1,
                    registration_number: 1
                }
            }
        ]);
    } catch (error) {
        console.error('Error finding all user:', error);
        throw error;
    }
}

async function findAccountLoginMore3Days(date) {
    try {
        return await User.aggregate([
            {
                $match: {
                    last_login_date: {$lt: date}
                }
            },
            {
                $project: {
                    _id: 0,
                    account_id: 1,
                    username: 1,
                    password: 1,
                    last_login_date: 1,
                    user_id: 1
                }
            }
        ]);
    } catch (error) {
        console.error('Error finding all user:', error);
        throw error;
    }
}


module.exports = {
  createUser,
  findUserById,
  deleteUserById,
  findOneUser,
  findOneAndUpdateUser,
  findAllUser,
  findAccountLoginMore3Days
};
