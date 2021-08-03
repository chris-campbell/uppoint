const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const coordinatesSchema = new mongoose.Schema({
  address: String,
  lat: String,
  lng: String,
});

const friendAlertSchema = new mongoose.Schema({
  currentUserId: String,
  firstname: String,
  lastname: String,
  address: String,
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter a valid email.");
      }
    },
  },
  hashedPassword: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value, "en-US")) {
        throw new Error("Please provide a valid phone number.");
      }
    },
  },
  location: {
    type: coordinatesSchema,
    required: true,
  },

  image: {
    type: String,
  },
  alerts: [
    {
      alert: {
        type: friendAlertSchema,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ user: user._id.toString() }, process.env.JWT_SECRET);

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("hashedPassword")) {
    user.hashedPassword = await bcrypt.hash(user.hashedPassword, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
