const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Mongoose = require('mongoose');

dotenv.config();


const loginUser = async (email, password, res) => {
  try {

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    var user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      var token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      res.status(200).json({ token: token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
}

const registerUser = async (name, email, password, res) => {
  try {

    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}
const getUserWithId = async (id) => {
  const user = await User.findById(id);
  return user;
}

const getAllUsers = async (user) => {
  if (user.user_id) {
    const updatedUser = await User.findById(user.user_id);
    if (updatedUser.isAdmin) {
      const allUsers = await User.find({ status: 1 });
      return allUsers;
    } else {
      return [];
    }
  } else {
    return [];
  }
}

const saveUser = async (body) => {
  const newUser = new User({ ...body });
  const insertedUser = await newUser.save();
  return insertedUser;
}

const updateUser = async (id, body) => {
  await User.updateOne({ _id: Mongoose.Types.ObjectId(id) }, { $set: body }, { upsert: true });
  const updatedUser = await User.findById(Mongoose.Types.ObjectId(id));
  return updatedUser;
}

const deleteUserWithId = async (id) => {
  const user = await User.findOne({ _id: id });
  if (user && user._id) {
    const user = await User.updateOne({ _id: id }, { status: 2 });
    return user;
  }
}

const setAdmin = async (id) => {
  await User.updateOne({ id }, { isAdmin: true });
  const updatedUser = await User.findById(id);
  return updatedUser;
}

module.exports = {
  registerUser,
  getUserWithId,
  getAllUsers,
  saveUser,
  updateUser,
  deleteUserWithId,
  loginUser,
  setAdmin
}