const express = require('express');
const router = express.Router();
const { registerUser, loginUser, googleAuth, forgotPassword, resetPassword } = require('../controllers/userAuthController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword/:token', resetPassword);

module.exports = router;
