// const Paginator = require("./paginator");
const knex = require("../database/knex");
function makeOrdersService() {
  function readCartItem(payload) {
    const cart_itemt = {
      product_id: payload.product_id,
      user_id: payload.user_id,
      quantity: payload.quantity,
    };
    // Remove undefined fields
    Object.keys(cart_itemt).forEach(
      (key) => cart_itemt[key] === undefined && delete cart_itemt[key]
    );
    return cart_itemt;
  }

  async function addToCart(payload) {
    const CartItem = readCartItem(payload);
    const userId = CartItem.user_id;

    // Tìm hoặc tạo giỏ hàng cho user_id tương ứng
    await knex.raw(
      `
    INSERT INTO carts (user_id, created_at, updated_at) 
    VALUES (?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()) 
    ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP()
  `,
      [userId]
    );

    // Lấy cart_id của người dùng có user_id = ...
    const cartIdQuery = knex
      .select("cart_id")
      .from("carts")
      .where("user_id", userId);

    const cartIdResult = await cartIdQuery;
    const cartId = cartIdResult[0].cart_id;

    const productId = CartItem.product_id;

    // Chèn sản phẩm vào giỏ hàng của user tương ứng
    await knex.raw(
      `
    INSERT INTO cart_items (cart_id, product_id, quantity, created_at, updated_at) 
    VALUES (?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())
  `,
      [cartId, productId, CartItem.quantity]
    );

    return { message: "Thêm thành công vào giỏ hàng" };
  }

  async function getCartItemsByUserId(userId) {
    try {
      const cartItems = await knex
        .select(
          "cart_items.item_id",
          "products.name",
          "products.price",
          "products.thumbnail", // Thêm trường thumbnail vào câu truy vấn
          "cart_items.quantity"
        )
        .from("cart_items")
        .join("products", "cart_items.product_id", "=", "products.id")
        .join("carts", "cart_items.cart_id", "=", "carts.cart_id")
        .where("carts.user_id", userId);

      return cartItems;
    } catch (error) {
      throw new Error("Error fetching cart items:", error);
    }
  }
  async function deleteCartItemByItemId(itemId) {
    try {
      await knex("cart_items").where("item_id", itemId).del();

      return { message: "Xóa thành công cart item" };
    } catch (error) {
      throw new Error("Error deleting cart item:", error);
    }
  }
  return {
    addToCart,
    getCartItemsByUserId,
    deleteCartItemByItemId,
  };
}
module.exports = makeOrdersService;
