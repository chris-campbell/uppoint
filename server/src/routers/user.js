import express from "express";
import User from "../models/user.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/api", (req, res) => {
  res.status(404).json({ message: "Hello from server!" });
});

// router.post("/users/login", async (req, res) => {
//   try {
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const token = await user.generateAuthToken();

//     res.send({ user, token });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// // [POST] Create single user in DB
// router.post("/users", async (req, res) => {
//   const user = User(req.body);
//   try {
//     await user.save();

//     const token = await user.generateAuthToken();

//     res.status(201).send({ user, token });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// // [GET] Retrieve user profile
// router.get("/users/me", auth, async (req, res) => {
//   res.send(req.user);
// });

// // [POST] Log user out
// router.post("/users/logout", auth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token !== req.token;
//     });

//     await req.user.save();
//     res.send("User Logged out!");
//   } catch (error) {
//     res.status(500);
//   }
// });

// // [POST] Logout all
// router.post("/users/logoutAll", auth, async (req, res) => {
//   try {
//     req.user.tokens = [];
//     await req.user.save();
//     res.send("All users logged out");
//   } catch (error) {
//     res.status(500).send("Something went wrong");
//   }
// });

// // [GET] Retrieve single user from DB
// router.get("/users/:id", async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return res.status(404).send();
//   }

//   res.send(user);
// });

// // [PATCH] Update single user in the DB
// router.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowUpdates = [
//     "firstName",
//     "lastName",
//     "email",
//     "gender",
//     "dateOfBirth",
//     "phone",
//     "location",
//   ];

//   const isValidOperation = updates.every((update) =>
//     allowUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid update" });
//   }

//   try {
//     const user = await User.findById(req.params.id);

//     updates.forEach((update) => {
//       user[update] = req.body[update];
//     });

//     await user.save();

//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// // [DELETE] Delete single user from DB
// router.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send();
//     }

//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

export default router;
