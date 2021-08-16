const express = require("express");
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Get - All users
router.get("/users", async (req, res) => {
  const users = await User.find({});
  return res.send(users);
});

// POST - Login user
router.post("/users/login", async (req, res) => {

  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST - Check is user is unique by email
router.post("/users/checkEmailUnique", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.json(false);
    }

    res.json(true);
  } catch (err) {
    res.status(500).json({ errorMessage: "Server Issue" });
  }
});

// GET - Logout user from browser
router.get("/users/logout", auth, async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// GET - Check if user is loggedIn
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (error) {
    res.json(false);
  }
});

// GET - Get current user
router.get("/currentUser", auth, async (req, res) => {
  const currentUserId = req.user;

  try {
    const currentUser = await User.findOne({ _id: currentUserId.toString() });
    res.json(currentUser);
  } catch (error) {
    res.status(500).send();
  }
});


module.exports = router;
