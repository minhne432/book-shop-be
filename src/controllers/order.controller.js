const makeOrdersService = require("../services/order.service");
const ApiError = require("../api-error");

async function createCartItem(req, res, next) {
  try {
    const ordersSvervice = makeOrdersService();
    const cart = await ordersSvervice.addToCart(req.body);
    return res.send(cart);
  } catch (err) {
    return next(new ApiError(500, "An error orrcured while create cart item!"));
  }
}

async function getCartByUserId(req, res, next) {
  try {
    const ordersSvervice = makeOrdersService();
    const cart = await ordersSvervice.getCartItemsByUserId(req.params.user_id);
    return res.send(cart);
  } catch (err) {
    return next(new ApiError(500, "An error orrcured while get cart"));
  }
}

async function deleteCartItemByItemId(req, res, next) {
  try {
    const ordersSvervice = makeOrdersService();
    const deleteItem = await ordersSvervice.deleteCartItemByItemId(
      req.params.item_id
    );
    return res.send(deleteItem);
  } catch (err) {
    return next(new ApiError(500, "An error orrcured while delete cart item"));
  }
}

async function createOrder(req, res, next) {
  try {
    const ordersService = makeOrdersService();
    const result = await ordersService.createOrder(req.body);
    if (result.error) {
      return next(new ApiError(500, result.error));
    }
    return res.status(201).json({ message: "Order created successfully!" });
  } catch (err) {
    return next(new ApiError(500, "An error occurred while creating order"));
  }
}

async function getOrdersByUserId(req, res, next) {
  try {
    const ordersSvervice = makeOrdersService();
    const order = await ordersSvervice.getOrdersByUserId(req.params.user_id);
    return res.send(order);
  } catch (err) {
    return next(new ApiError(500, "An error orrcured while get cart"));
  }
}

async function getOrderDetailsByOrderId(req, res, next) {
  try {
    const ordersSvervice = makeOrdersService();
    const orderDetails = await ordersSvervice.getOrderDetailsByOrderId(
      req.params.id
    );
    return res.send(orderDetails);
  } catch (err) {
    return next(new ApiError(500, "An error orrcured while get cart"));
  }
}

async function getAllOrders(req, res, next) {
  try {
    const ordersSvervice = makeOrdersService();
    const allOrders = await ordersSvervice.getAllOrders();
    return res.send(allOrders);
  } catch (err) {
    return next(new ApiError(500, "An error orrcured while get cart"));
  }
}
async function updateOrdertStatus(req, res, next) {
  try {
    const ordersSvervice = makeOrdersService();
    const update = await ordersSvervice.updateOrdertStatus(
      req.params.order_id,
      req.body.status
    );
    return res.send(update);
  } catch (err) {
    return next(new ApiError(500, "An error orrcured while get cart"));
  }
}
module.exports = {
  createCartItem,
  getCartByUserId,
  deleteCartItemByItemId,
  createOrder,
  getOrdersByUserId,
  getOrderDetailsByOrderId,
  getAllOrders,
  updateOrdertStatus,
};
