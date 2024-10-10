//monogoose
const mongoose = require('mongoose');
//bcrypt
const bcrypt = require('bcrypt');

//user model
const userSchema = new mongoose.Schema({
  username: {type: String, require: true, unique: true},
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model("users", userSchema);