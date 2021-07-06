import mongoose from "mongoose";

const CONNECTION_URL = "mongodb://127.0.0.1:27017/uppoint-app";

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
