const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const jwt=require('jsonwebtoken')
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }
  const hashedpassword
  try {
     hashedpassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = new HttpError('Could not create user', 500);
    return next(error);
  }
  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedpassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }
  const token;
  try{

    token=jwt.sign({userId:createdUser.id,email:createdUser.email},
      "ssuuppeerrsseeccrreettdonotshareit",{
expiresIn:'1h'
  })

}catch(err){
    const error = new HttpError(
      'Could not Sign up.',
    500
    );
    return next(error);
  
  }
  res.status(201).json({userId:createdUser.id,email:createdUser.email,token:token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Loggin in failed, please try again later.',
      500
    );
    return next(error);
  }
  let ismatched;
  try {
    ismatched = await bcrypt.compare(password, exisiting.password);
    if (!ismatched) {
      const err = new Error('Invalid credentials', 422);
      return next(err);
    }
  } catch (err) {
    const err = new Error('Could not log yopu in', 500);
    return next(err);
  }
  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }
const token;
try{
token=jwt.sign({userId:existingUser.id,email:existingUser.email},"ssuuppeerrsseeccrreettdonotshareit",{
  expiresIn:'1h'
})}catch(err){
  const error = new HttpError(
    'Could not log you in.',
    500
  );
  return next(error);

}
  res.json({
    message: 'Logged in!',
    userId:existingUser.id,email:existingUser.email,token:token
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
