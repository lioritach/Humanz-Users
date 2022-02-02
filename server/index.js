const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./models/User");

const userRoute = require("./routes/userRoute");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected"))
  .catch((err) => console.error(err));

app.listen("5000", () => {
  console.log("Backend is running");
});
