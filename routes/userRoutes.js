const express = require('express');
const userController = require('../controllers/users/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const verifyOtp = require('../middlewares/verifyOtp');


const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/verify-otp', verifyOtp, userController.verifyOtp);

router.get('/profile', authMiddleware, userController.getProfile);

router.post('/edit-profile', authMiddleware, userController.updateProfile);

module.exports = router;