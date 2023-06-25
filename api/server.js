const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const projectRouter = require("./routes/projectRoutes");
const adminRouter = require("./routes/adminRoutes");
const eventRouter = require("./routes/eventRoutes");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb Connected!!"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/admins", adminRouter);
app.use("/api/events", eventRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
