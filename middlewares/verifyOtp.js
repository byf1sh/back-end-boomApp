const prisma = require('../config/database');

module.exports = async (req, res, next) => {
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

    // Lanjutkan ke next() jika OTP valid
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
