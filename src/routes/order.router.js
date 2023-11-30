const express = require("express");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const ordersController = require("../controllers/order.controller");

router
  .route("/")

  .post(ordersController.createCartItem)
  .all(methodNotAllowed);

router
  .route("/new")

  .post(ordersController.createOrder)
  .all(methodNotAllowed);

router
  .route("/getOrders/:user_id")
  .get(ordersController.getOrdersByUserId)
  .all(methodNotAllowed);
router
  .route("/getOrdersDetails/:id")
  .get(ordersController.getOrderDetailsByOrderId)
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

router
  .route("/admin/getAllOrders")
  .get(ordersController.getAllOrders)
  .put()
  .all(methodNotAllowed);

router
  .route("/admin/getAllOrders/:order_id")
  .put(ordersController.updateOrdertStatus)
  .all(methodNotAllowed);

module.exports = router;
