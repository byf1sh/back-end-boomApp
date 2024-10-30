const prisma = require('../../config/database');
const { handleError } = require('../../utils/errorHandler');
const { hashPassword, verifyPassword, generateToken } = require('../../services/AuthService');
const userService = require('../../services/UserService');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
      const user = await userService.registerUser(name, email, password);
      res.status(201).json({ message: 'User created successfully', user });
  } catch (e) {
      res.status(500).json({ message: e.message });
  }
};

// Controller untuk login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
      const { userId, otp , token} = await userService.loginUser(email, password);
      res.status(200).json({ message: 'OTP sent to your email. Please verify.', userId, token });
  } catch (e) {
      res.status(403).json({ message: e.message });
  }
};

// Controller untuk verifikasi OTP
exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  try {
      const token = await userService.verifyOtp(userId, otp);
      res.status(200).json({ message: 'OTP Verified, Login Success', token });
  } catch (e) {
      res.status(403).json({ message: e.message });
  }
};

// Controller untuk mengambil profile user
exports.getProfile = async (req, res) => {
  try {
      const user = await userService.getUserProfile(req.user.id);
      res.json(user);
  } catch (e) {
      res.status(500).json({ message: e.message });
  }
};

exports.updateProfile = async (req,res) => {
  const user_id = req.query.user_id;
  const updateData = req.body;
  try{
    const updateProfile = await userService.updateUser(user_id, updateData);
    return res.status(200).json({ message: 'User update successfully', updateProfile });
  } catch (e) {
    handleError(e,res);
  }
};
