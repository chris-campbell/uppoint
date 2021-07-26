import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({ errorMessage: "Unauthorized Access" });

    const verifed = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verifed.user;

    next();
  } catch (error) {
    res.status(401).send("Please authenticate user");
  }
};

export default auth;
