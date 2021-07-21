import mongoose from "mongoose";

const CONNECTION_URL =
  // "mongodb+srv://hoppr:Jupitermix35@cluster0.xtoid.gcp.mongodb.net/uppoint?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
  "mongodb://127.0.0.1:27017/uppoint-app";

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
