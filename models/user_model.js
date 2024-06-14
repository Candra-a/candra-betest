const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  id: mongoose.Schema.ObjectId,
  username: {
    type: String,
    required: [true, "Username should not be empty"],
    unique: true
  },
  account_number: {
    type: String,
    required: [true, "Account number should not be empty"],
    unique: true
  },
  email_address: {
    type: String
  },
  full_name: {
    type: String
  },
  password: {
    type: String,
    default: '12345', // default password
  },
  last_login_date: {
    type: Date
  },
  registration_number: {
    type: String,
    required: [true, "Registration number should not be empty"],
    unique: true
  },
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  account_id: {
    type: Number,
    required: true,
    unique: true
  }
})
    
module.exports = mongoose.model('User', userSchema)