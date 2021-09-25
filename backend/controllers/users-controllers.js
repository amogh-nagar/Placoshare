const crypto = require("crypto");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amoghnagar1111@gmail.com",
    pass: "123Sheru@",
  },
});

// const sgmail = require("@sendgrid/mail");
// sgmail.setApiKey(
//   "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"
// );

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
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
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  let hashedpassword;
  try {
    hashedpassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = new HttpError("Could not create user", 500);
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
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "ssuuppeerrsseeccrreettdonotshareit",
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    const error = new HttpError("Could not Sign up.", 500);
    return next(error);
  }

  transporter
    .sendMail({
      to: email,
      from: "amoghnagar1111@gmail.com",
      subject: "Signup Succedded!",
      html: "<h1>You successfully signed up</h1>",
    })
    .then(() => {
      res.status(201).json({
        userId: createdUser.id,
        email: createdUser.email,
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Loggin in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }
  let ismatched;
  try {
    ismatched = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new Error(
      "Could not log you in, Some error might be occurred",
      500
    );
    return next(error);
  }
  if (!ismatched) {
    const err = new Error("Invalid credentials", 422);
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "ssuuppeerrsseeccrreettdonotshareit",
      {
        expiresIn: "1h",
      }
    );
  } catch (err) {
    const error = new HttpError("Could not log you in.", 500);
    return next(error);
  }
  res.status(201).json({
    message: "Logged in!",
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

const reset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      const error = new HttpError("Some error occurred", 500);
      return next(error);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          const error = new HttpError(
            "User with this email not found, please try again later.",
            500
          );
          throw error;
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 60 * 60 * 1000;
        return user.save();
      })
      .then((response) => {
        transporter
          .sendMail({
            to: req.body.email,
            from: "amoghnagar1111@gmail.com",
            subject: "Password reset",
            html: `
  <p>You requested password reset</p>
  <p>CLick this <a href="https://place-o-share.web.app/reset/${token}">link</a> to set a new password</p>
  `,
          })
          .then(() => {
            res.status(200).json({
              message: "Email sent succesfully",
            });
            console.log("Sent");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        const error = new HttpError(
          "Resetting password failed, please try again later.",
          500
        );
        return next(error);
      });
  });
};

const newpassword = (req, res, next) => {
  const token = req.body.token;
  let setuser;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        const error = new HttpError("Please try again later.", 500);
        return next(error);
      }
      setuser = user;
      return bcrypt.hash(req.body.password, 12);
    })
    .then((hashedpassword) => {
      setuser.password = hashedpassword;
      setuser.resetToken = undefined;
      setuser.resetTokenExpiration = undefined;
      return setuser.save();
    })
    .then((response) => {
      res.status(200).json({
        message: "Password reset successfully",
      });
    })
    .catch((err) => {
      const error = new HttpError(
        "Resetting password failed, please try again later.",
        500
      );
      return next(error);
    });
};

exports.newpassword = newpassword;
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.reset = reset;
