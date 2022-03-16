const express = require("express");
const cors = require("cors");
const app = express();
const config = require("./config.json");

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log(`Backend running at port ${port}`);
});
