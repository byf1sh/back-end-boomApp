const speakeasy = require('speakeasy');
const mg = require('../config/mailgun');
const prisma = require('../config/database');

const generateOtp = () => {
    const secret = speakeasy.generateSecret({ length: 20 }); // Secret acak dengan panjang 20 karakter
  
    const otp = speakeasy.totp({
      secret: secret.base32, // Menggunakan secret yang baru dihasilkan
      encoding: 'base32',
      step: 300, // OTP berlaku selama 5 menit (300 detik)
      digits: 4, // Panjang OTP adalah 4 digit
    });
  
    return otp;
  };

const sendOtpEmail = async (email, otp) => {
  const data = {
    from: 'Your App <no-reply@yourdomain.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  return mg.messages().send(data);
};

const saveOtpToDb = async (userId, otp) => {
  return await prisma.otp.create({
    data: {
      userId: userId,
      otp: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Valid 5 menit
    },
  });
};

module.exports = {
  generateOtp,
  sendOtpEmail,
  saveOtpToDb,
};
