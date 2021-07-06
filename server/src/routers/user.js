import express from "express";
import User from "../models/user.js";
const router = express.Router();

// [POST] Create single user in DB
router.post("/users", async (req, res) => {
  const user = User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// [GET] Retrieve all users from DB
router.get("/users", async (req, res) => {
  const user = await User.find({});

  if (!user) {
    return res.status(404).send();
  }

  res.send(user);
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

export default router;
