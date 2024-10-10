//express
const express = require('express');
//router
const router = express.Router();
//contollers
const { registerUser, forgotPassword, resetPassword } = require('../controllers/authController');

//Route to request a password reset
router.post("/registers", registerUser);

//Route to request a password reset
router.post("/forgot-password", forgotPassword);

//Route to reset the password
router.post("/reset-password/:token", resetPassword);

module.exports = router;