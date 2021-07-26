import express from "express";
import User from "../models/userModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/send", auth, async (req, res) => {
  const userList = req.body.users;
  console.log(userList);
  try {
    userList.forEach(async (user) => {
      console.log(user._id);
      const userOb = await User.findOne({ _id: user._id });
      console.log("OB from MONGO", userOb);
      res.send(req.user);

      // userOb.alerts.concat()
    });
  } catch (error) {
    console.log(error);
  }

  // try {
  //   const user = await User.findOne({id: ""});
  //   res.send(user)
  // } catch (error) {
  //   console.log(error)
  // }
});

export default router;
