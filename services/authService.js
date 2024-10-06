const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Verifikasi password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Buat token JWT
const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
};
