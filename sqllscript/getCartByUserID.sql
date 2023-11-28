-- Để lấy thông tin các sản phẩm trong giỏ hàng của người dùng có id = 5, bạn có thể sử dụng câu lệnh SQL sau:
SELECT 
    ci.item_id, 
    p.name AS product_name, 
    p.price AS product_price, 
    ci.quantity
FROM 
    cart_items ci
INNER JOIN 
    products p ON ci.product_id = p.id
INNER JOIN 
    carts c ON ci.cart_id = c.cart_id
WHERE 
    c.user_id = 5;
-- Câu lệnh này sẽ kết hợp thông tin từ bảng cart_items, products, 
--và carts để lấy thông tin về các sản phẩm trong giỏ hàng của người dùng có id = 5.
-- Nó sẽ trả về các cột như item_id (ID của mục trong giỏ hàng), product_name (tên sản phẩm),
-- product_price (giá sản phẩm), và quantity (số lượng sản phẩm trong giỏ hàng).