const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userService = require("../services/user.service");
exports.signUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        message: "Mail exists",
      });
    }
    const user = new User({
      email: req.body.email,
      password: userService.hashPassword(req.body.password),
    });
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(500).json({
        error: err,
      });
    }
    return res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: "Mail does not exist",
      });
    }
    const isValid = await user.isValidPassword(req.body.password);
    if (!isValid) {
      return res.status(401).json({
        message: "password not equal",
      });
    }

    const token = userService.signJWT(
      {
        id: user._id,
      },
      "1h"
    );
    return res.status(200).json({
      message: "Auth successful",
      token: token,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
