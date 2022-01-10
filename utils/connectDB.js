const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect DB Successfully");
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
