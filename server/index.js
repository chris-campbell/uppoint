import path from "path";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Tesssingggg" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
