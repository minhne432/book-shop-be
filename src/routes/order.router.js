const express = require("express");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const ordersController = require("../controllers/order.controller");
router
  .route("/")
  .get()
  .post(ordersController.createCartItem)
  .all(methodNotAllowed);

router
  .route("/:user_id")
  .get(ordersController.getCartByUserId)
  .post(ordersController.createCartItem)
  .all(methodNotAllowed);

router
  .route("/cart/:item_id")
  .delete(ordersController.deleteCartItemByItemId)
  .all(methodNotAllowed);

module.exports = router;
