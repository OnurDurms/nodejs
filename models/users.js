const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };