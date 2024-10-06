const prisma = require('../config/database');
const { hashPassword, verifyPassword, generateToken } = require('../services/authService');
const logger = require('../utils/logger')

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
    res.status(201).json({ message: 'user created successfully yaa', user });
  } catch (e) {
    res.json({ message: 'something went wrong' });
  }
}

exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await prisma.user.findUnique({ where: {email} });
    if (!user) {
      return res.status(403).json( {message: 'Please Register First!'} );
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json( {message: 'wrong password'} );
    }

    const token = generateToken(user.id, user.email);
    res.status(200).json({message: 'Login Successfull',token});
  } catch(e) {
    res.status(500).json({message: `something went wrong ${e}`, });
  }
};

// Profile (Protected Route)
exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getIndex = async (req, res) => {
  try {
    res.status(200).json({ message: 'hai there !' })
  } catch (e) {
    res.status(500).json({e : 'ndak tau'})
  }
}
