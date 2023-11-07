const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/users");
const teamRouter = require("./routes/teams");
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();
app.use(express.json());

// connecting mongodb
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((e) => {
    console.error(e.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
app.use("/api/users", userRouter);
app.use("/api/team", teamRouter);

app.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`);
});
