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
          "cart_items.product_id",
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
  //
  async function createOrder(payload) {
    try {
      const { user_id, items, fullname, phone_number, address } = payload;

      // Tính tổng giá trị của đơn hàng
      const totalMoney = items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      await knex.transaction(async (trx) => {
        const order = {
          user_id,
          fullname, // Thêm thông tin fullname vào đơn hàng
          phone_number, // Thêm thông tin phone_number vào đơn hàng
          address, // Thêm thông tin address vào đơn hàng
          order_date: knex.raw("CURRENT_TIMESTAMP"),
          status: "pending",
          total_money: totalMoney,
        };

        const [orderId] = await trx("orders").insert(order).returning("id");

        const orderDetails = items.map((item) => {
          const { product_id, price, quantity } = item;
          const totalMoneyPerItem = price * quantity;

          return {
            order_id: orderId,
            product_id,
            price,
            number_of_products: quantity,
            total_money: totalMoneyPerItem,
          };
        });

        await trx("order_details").insert(orderDetails);
      });

      return { message: "Order created successfully!" };
    } catch (error) {
      return { error: error.message };
    }
  }

  const getOrdersByUserId = async (user_id) => {
    try {
      const orders = await knex("orders")
        .select("id", "fullname", "phone_number", "order_date", "status")
        .where({ user_id });

      return orders;
    } catch (error) {
      throw new Error(
        `Error fetching orders for user ${user_id}: ${error.message}`
      );
    }
  };

  // Hàm lấy tất cả orderDetails dựa trên mã đơn hàng (order_id)
  async function getOrderDetailsByOrderId(orderId) {
    try {
      const orderDetails = await knex("order_details")
        .select(
          "order_details.number_of_products",
          "products.name",
          "products.price"
        )
        .where({ order_id: orderId })
        .join("products", "order_details.product_id", "products.id");

      return orderDetails;
    } catch (error) {
      throw new Error(`Error fetching order details: ${error.message}`);
    }
  }
  async function getAllOrders() {
    try {
      console.log("line 162 order.service");
      const orders = await knex.select("*").from("orders");
      console.log(orders);
      return orders;
    } catch (error) {
      throw new Error(`Error fetching all orders: ${error.message}`);
    }
  }
  async function updateOrdertStatus(order_id, newStatus) {
    try {
      await knex("orders").where({ id: order_id }).update({
        status: newStatus,
      });

      return { message: "Order status updated successfully!" };
    } catch (error) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
  }

  return {
    addToCart,
    getCartItemsByUserId,
    deleteCartItemByItemId,
    createOrder,
    getOrdersByUserId,
    getOrderDetailsByOrderId,
    getAllOrders,
    updateOrdertStatus,
  };
}
module.exports = makeOrdersService;
