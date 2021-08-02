require("dotenv").config;

const mongoose = require("mongoose");

mongoose.connect(process.env.MDB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
