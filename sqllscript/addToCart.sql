-- Tìm giỏ hàng của người dùng có id = 5 (nếu có) hoặc tạo một giỏ hàng mới cho họ:
INSERT INTO carts (user_id, created_at, updated_at) 
VALUES (5, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()) 
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP();

-- Thêm sản phẩm vào giỏ hàng của người dùng:
INSERT INTO cart_items (cart_id, product_id, quantity, created_at, updated_at) 
VALUES (
    (SELECT cart_id FROM carts WHERE user_id = 5), 
    5812, 
    1, 
    CURRENT_TIMESTAMP(), 
    CURRENT_TIMESTAMP()
);

INSERT INTO cart_items (cart_id, product_id, quantity, created_at, updated_at) 
VALUES (
    (SELECT cart_id FROM carts WHERE user_id = 5), 
    5813, 
    2, 
    CURRENT_TIMESTAMP(), 
    CURRENT_TIMESTAMP()
);
