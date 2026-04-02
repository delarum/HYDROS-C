const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const innovationRoutes = require("./routes/innovationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/innovations", innovationRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => console.log(error));