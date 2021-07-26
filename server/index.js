import dotenv from "dotenv";
import express from "express";
import "./src/db/mongoose.js";
import userRouter from "./src/routers/userRouter.js";
import alertUsers from "./src/routers/sendAlert.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(userRouter);
app.use(alertUsers);

// PORT DECLARATION
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Connection success: ", `Server is now running on port ${PORT}`);
});
