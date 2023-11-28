const express = require("express");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const ordersController = require("../controllers/order.controller");
router
  .route("/")
  .get()
  .post(ordersController.createCartItem)
  .all(methodNotAllowed);

module.exports = router;
