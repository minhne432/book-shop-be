const express = require("express");
const cors = require("cors");
const contactsRouter = require("./routes/contacts.router");
const productsRouter = require("./routes/products.router");
const usersRouter = require("./routes/users.router");

// add error handler middleware
const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");

const app = express();

app.use(cors());
app.use(express.json());

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
