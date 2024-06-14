const bcrypt = require('bcryptjs');

function hashPassword(password) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch (error) {
        throw new Error(`Error hashing password: ${error.message}`);
    }
}

function checkPassword(password, passwordDB) {
    try {
        return bcrypt.compareSync(password, passwordDB);
    } catch (error) {
        throw new Error(`Error comparing passwords: ${error.message}`);
    }
}

module.exports = {
    hashPassword,
    checkPassword
};