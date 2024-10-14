const prisma = require('../../config/database');
const { handleError } = require('../../utils/errorHandler');
const { hashPassword, verifyPassword, generateToken } = require('../../services/AuthService');
const logger = require('../../utils/logger')
const otpService = require('../../services/otpService');

exports.register = async (req, res) => {
  const {name, email, password} = req.body;
  hashedPassword = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (e) {
    handleError(e,res);
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(403).json({ message: 'Please Register First!' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Wrong password' });
    }

    const otp = otpService.generateOtp(user.id);
    console.log(otp);
    await otpService.saveOtpToDb(user.id, otp);
    // await otpService.sendOtpEmail(user.email, otp);

    res.status(200).json({ message: 'OTP sent to your email. Please verify.', userId: user.id });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const storedOtp = await prisma.otp.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Ambil OTP terbaru
    });

    if (!storedOtp || storedOtp.expiresAt < new Date()) {
      return res.status(403).json({ message: 'OTP expired or invalid' });
    }

    if (otp !== storedOtp.otp) {
      return res.status(403).json({ message: 'Invalid OTP' });
    }

    await prisma.otp.delete({ where: { id: storedOtp.id } });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const token = generateToken(user.id, user.email);

    res.status(200).json({ message: 'OTP Verified, Login Success', token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json(user);

  } catch (error) {
    handleError(e,res);
  }
};

exports.getIndex = async (req, res) => {
  try {
    res.status(200).json({ message: 'hai there !' });
  } catch (e) {
    handleError(e,res);
  }
}
