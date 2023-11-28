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

module.exports = {
  createCartItem,
};
