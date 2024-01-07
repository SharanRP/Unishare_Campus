const User = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = (user) => {
  return jwt.sign(user, process.env.SECRET, { expiresIn: '3d' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    console.log(user);
    const token = generateJWT({
      _id: user._id,
      email: user.email,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    console.log(user);
    const token = generateJWT({
      _id: user._id,
      email: user.email,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  signup,
};
