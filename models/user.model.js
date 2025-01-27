const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Field must be a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Minimum length of password is 6 characters"],
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.MANAGER, userRoles.ADMIN],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: "uploads/image.png",
  },
});

module.exports = mongoose.model("User", userSchema);
