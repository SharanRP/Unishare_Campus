const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.statics.signup = async function (email, password) {
  if (!email) {
    throw Error('All fields are necessary.');
  }
  if (!validator.isEmail(email)) {
    throw Error('Enter valid email.');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Enter Strong Password!');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email Already in use!');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email) {
    throw Error('All fields are necessary.');
  }
  if (!validator.isEmail(email)) {
    throw Error('Enter valid email.');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Enter Strong Password!');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Email is not registered...');
  }

  console.log(user);

  const verify = await bcrypt.compare(password, user.password);

  console.log(verify);

  if (!verify) {
    throw Error('Password is wrong...');
  }

  return user;
};

module.exports = mongoose.model('User', UserSchema);
