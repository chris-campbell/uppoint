import express from "express";
import "./src/db/mongoose.js";
import userRouter from "./src/routers/user.js";

const app = express();

app.use(express.json());
app.use(userRouter);

// PORT DECLARATION
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Connection success: ", `Server is now running on port ${PORT}`);
});
