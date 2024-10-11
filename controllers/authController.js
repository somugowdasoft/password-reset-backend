const bcrypt = require('bcryptjs');
const User = require("../models/User");
const sendMails = require("../utils/sendEmail");
const dotenv = require('dotenv');
dotenv.config();

// Import jsonwebtoken for generating secure tokens
const jwt = require('jsonwebtoken');

//create the user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//forgot password controller
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    //find user
    const user = await User.findOne({ email });
    //check the user
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a random token for password reset, Token expires in 1 hour
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1hr" })
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    //save the user
    await user.save();

    // Create a password reset link using the generated token
    const restlink = `https://charming-palmier-ef396f.netlify.app/reset-password/${token}`

    let  html = `
    <p>Hello,</p>
    <p>Reset Your Password at the link below:</p>
    <a href="${restlink}">${restlink}</a>
    <p>Best regards,</p>
    <p>Your Team</p>
`
    //send mail
    await sendMails(user.email, "Password Reset", html);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

//reset password
exports.resetPassword = async (req, res) => {
  //get token and password
  const { token } = req.params;
  const { password } = req.body;

  try {
    //find user
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    //check the user
    if (!user) {
      return res.status(500).json({ message: 'Token is invalid or has expired' });
    }

    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    //save the current password
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
