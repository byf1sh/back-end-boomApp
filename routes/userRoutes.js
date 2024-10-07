const express = require('express');
const userController = require('../controllers/users/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/profile', authMiddleware, userController.getProfile);

router.get('/index', authMiddleware, userController.getIndex);

module.exports = router;