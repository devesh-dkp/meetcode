require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const problemsRouter = require("./controllers/problems");
const usersRouter = require("./controllers/users");

const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("dist"));
// Routers
app.use("/api", problemsRouter);
app.use("/api", usersRouter);

app.use("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
