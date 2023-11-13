const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/contacts.router");
const productsRouter = require("./routes/products.router");
const usersRouter = require("./routes/users.router");
const jwt = require("./common/_JVT");

// add error handler middleware
const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/token", async (req, res) => {
  var user = {
    name: "Admin",
    emal: "Admin@gmail.com",
  };
  const _token = await jwt.make(user);
  res.send({ token: _token });
});

app.get("/checktoken", async (req, res) => {
  try {
    var _token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW4iLCJlbWFsIjoiQWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjk5ODU0NTYwLCJleHAiOjE2OTk4NTgxNjB9.SDkNPQ96LfNN5siq7heDsJR3smAH8fpj_QqPOvaRxHk";
    const data = await jwt.check(_token);
    res.send({ data: data });
  } catch (err) {
    res.send({ err: "Token is invalid!" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contactbook application." });
});

app.use("/api/contacts", contactsRouter);

app.use("/api/products", productsRouter);

app.use("/api/users", usersRouter);

// Handle 404 response
app.use(resourceNotFound);
// Define error-handling middleware last
app.use(handleError);

module.exports = app;
