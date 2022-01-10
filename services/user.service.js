const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const signJWT = (payload, expiresIn) => {
  const secretKey = process.env.JWT_SECRET;
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyJWT = (token) => {
  try {
    console.log("token: ", token);
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    return { payload: decoded, expired: false };
  } catch (err) {
    console.log(err.message);
    return { payload: null, expired: err.message.includes("jwt expired") };
  }
};

const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcryptjs.genSalt(10);
    // Generate a password hash
    const passwordHashed = await bcryptjs.hash(password, salt);
    return passwordHashed;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { hashPassword, verifyJWT, signJWT };
