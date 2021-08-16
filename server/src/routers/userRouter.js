const express = require("express");
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find({});
  return res.send(users);
});

// [POST] LOGIN USER
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

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

router.get("/getAlerts", auth, async (req, res) => {
  const userId = req.user;
  const user = await User.findOne({ _id: userId });
  const alerts = await user.alerts;
  res.json(alerts);
});

// [GET] Retrieve user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// [POST] LOGOUT USER TOKEN FROM BROWSER
router.get("/users/logout", auth, async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// [GET] Retrieve single user from DB
router.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send();
  }

  res.send(user);
});

// [PATCH] Update single user in the DB
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = [
    "firstName",
    "lastName",
    "email",
    "gender",
    "dateOfBirth",
    "phone",
    "location",
  ];

  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// [DELETE] Delete single user from DB
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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

router.post("/send", auth, async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.user });
    const alert = {
      currentUserId: currentUser._id,
      firstname: currentUser.firstName,
      lastname: currentUser.lastName,
      address: currentUser.address,
    };

    const user = await User.findOne({ _id: req.body[0]._id });

    user.alerts = user.alerts.concat({ alert });
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/currentUser", auth, async (req, res) => {
  const currentUserId = req.user;

  try {
    const currentUser = await User.findOne({ _id: currentUserId.toString() });
    res.json(currentUser);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/currentUserId", auth, (req, res) => {
  try {
    const currentUserId = req.user;

    res.send(currentUserId);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
