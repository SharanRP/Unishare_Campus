const User2 = require('../model/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateJWT = (user) => {
  return jwt.sign(user, process.env.SECRET, { expiresIn: '30d' });
};

const storeCredentialsInLocalStorage = (token) => {
  localStorage.setItem('userToken', token);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User2.login(email, password);
    console.log(user);
    const token = generateJWT({
      _id: user._id,
      email: user.email,
    });

    storeCredentialsInLocalStorage(token);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User2.signup(email, password);
    console.log(user);
    const token = generateJWT({
      _id: user._id,
      email: user.email,
    });

    storeCredentialsInLocalStorage(token);

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
