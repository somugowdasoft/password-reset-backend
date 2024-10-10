//express
const express = require('express');
//router
const router = express.Router();
//contollers
const { forgotPassword, resetPassword } = require('../controllers/authController');


//Route to request a password reset
router.post("/forgot-password", forgotPassword);

//Route to reset the password
router.post("/reset-password/:token", resetPassword);

module.exports = router;