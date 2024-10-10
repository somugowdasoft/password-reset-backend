//monogoose
const mongoose = require('mongoose');
//bcrypt
const bcrypt = require('bcrypt');

//user model
const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });


module.exports = mongoose.model("users", userSchema);