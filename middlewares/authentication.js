const User = require('../models/user_model')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.access_token
        if(!token){
            res.status(401).json({
                message: "Token invalid! Please login first"
            })
        } else {
            const decoded = verifyToken(token)
            req.loggedInUser = decoded
            const user = await User.findOne({username: decoded.username})
            
            if(user){
                next()
            }else {
                res.status(401).json({msg: 'Token Invalid! Please login first'})                
            }
        }
    } catch(error) {
        next (error)
    }
}