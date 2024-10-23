const prisma = require('../config/database');
const otpService = require('../services/otpService');

const { hashPassword, verifyPassword, generateToken } = require('./AuthService');

exports.registerUser = async (name, email, password) => {
    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

// Service untuk login user
exports.loginUser = async (email, password) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Please Register First!');
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Wrong password');
        }

        const otp = otpService.generateOtp(user.id);
        console.log(otp);
        await otpService.saveOtpToDb(user.id, otp);
        return { userId: user.id, otp };
    } catch (e) {
        throw new Error(e.message);
    }
};

// Service untuk verifikasi OTP
exports.verifyOtp = async (userId, otp) => {
    try {
        const storedOtp = await prisma.otp.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' }, // Ambil OTP terbaru
        });

        if (!storedOtp || storedOtp.expiresAt < new Date()) {
            throw new Error('OTP expired or invalid');
        }

        if (otp !== storedOtp.otp) {
            throw new Error('Invalid OTP');
        }

        await prisma.otp.delete({ where: { id: storedOtp.id } });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        const token = generateToken(user.id, user.email);
        return token;
    } catch (e) {
        throw new Error(e.message);
    }
};

// Service untuk mengambil profile user
exports.getUserProfile = async (userId) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

exports.updateUser = async (user_id, updateData) => {
    try{
        const updateUser = await prisma.user.update({
            where: {id: parseInt(user_id)},
            data: {
                name: updateData.name,
                city: updateData.city,
                phone: updateData.phone,
                birth: updateData.birth ? new Date(updateData.birth) : undefined,
            },
        });
        return updateUser;
    }catch (e) {
        throw new Error(e.message);
    }
};