import mysql.connector
import random  # Thêm thư viện random để chọn ảnh ngẫu nhiên

# Kết nối đến cơ sở dữ liệu
conn = mysql.connector.connect(
    host="localhost", user="root", password="", database="shop"
)

cursor = conn.cursor()

# Danh sách đường dẫn ảnh cố định (6 ảnh)
image_paths = [
    "product_images/product1.1.png",
    "product_images/product1.2.png",
    "product_images/product1.3.png",
    "product_images/product1.jpg",
    "product_images/product2.1.png",
    "product_images/product2.2.jpg",
    "product_images/product2.3.jpg",
    "product_images/product2.jpg",
    "product_images/product3.1.png",
    "product_images/product3.2.png",
    "product_images/product3.3.png",
    "product_images/product3.png",
    "product_images/product4.1.jpg",
    "product_images/product4.2.jpg",
    "product_images/product4.3.jpg",
    "product_images/product4.jpg",
]

sql_statements = []
image_id = 1  # Bắt đầu từ ID 1

# Lặp qua từng sản phẩm (70 sản phẩm)
for product_id in range(1, 71):
    for _ in range(6):  # Mỗi sản phẩm có 6 ảnh ngẫu nhiên
        path = random.choice(image_paths)  # Chọn ảnh ngẫu nhiên
        sql_statements.append(f"({image_id}, '{path}', {product_id})")
        image_id += 1

# Tạo câu lệnh INSERT SQL
sql_query = (
    "INSERT INTO shop.api_image (id, image, product_id) VALUES "
    + ",\n".join(sql_statements)
    + ";"
)

# Thực thi câu lệnh SQL
cursor.execute(sql_query)
conn.commit()

print("Dữ liệu đã được chèn vào cơ sở dữ liệu!")

# Đóng kết nối
cursor.close()
conn.close()
