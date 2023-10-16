const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");

// const router = require("./routes");
const db = require("./models");
const routes = require("./routes");
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.use(cors());
app.use(express.json());
app.use("/user", routes.userRouter);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
