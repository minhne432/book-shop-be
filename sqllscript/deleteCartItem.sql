-- Để xóa một mục từ giỏ hàng của người dùng có id = 5 với item_id = 1, bạn có thể sử dụng câu lệnh sau:
DELETE FROM cart_items 
WHERE item_id = 1 
AND cart_id = (SELECT cart_id FROM carts WHERE user_id = 5);

-- Câu lệnh này sẽ xóa mục có item_id = 1 từ bảng cart_items trong giỏ hàng của người dùng có id = 5. 
--Nó sử dụng một câu con để xác định cart_id tương ứng với người dùng có id = 5, sau đó xóa mục cụ thể có item_id = 1 từ giỏ hàng đó.






