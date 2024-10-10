const crypto = require("crypto");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

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

    //generate the token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    //save the user
    await user.save();

    //create mail Transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //create mail mailOptions with frontend navigation url
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3000/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    //send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
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
