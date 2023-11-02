const express = require("express");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./db/connect");
// routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// routes
app.get("/", (req, res) => {
  res.send("PostNow");
});
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
