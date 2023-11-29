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

module.exports = {
  createCartItem,
  getCartByUserId,
  deleteCartItemByItemId,
};
