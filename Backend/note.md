<!-- Các bước setup backend nodejs  -->

B1: npm init ( khởi tạo nodejs) => file package.json đc tạo

B2: npm install body-parser@1.19.0 dotenv@8.2.0 ejs@3.1.5 express@4.17.1
=> cài các gói cần thiết cho server : Nếu thiếu → server không chạy được

B3: npm install --save-dev @babel/core@7.12.10 @babel/node@7.12.10 @babel/preset-env@7.12.10 nodemon@2.0.7
=> cài các gói của dev : Chỉ dùng trong quá trình phát triển, không cần khi chạy production.

B3: tạo các folder liên quan đến kiến trúc dự án

- các folder chủ chốt như config, controller, router, service
- .env / .env.example ( ghi thông số ở .env nhưng ở .env.example k ghi rõ nhé)
- .gitignore ( k đẩy lên các file sau : /node_modules/vendor, /.idea. .idea/, .env )

B4: cấu hình .babelrc, viewEngine, serve.js

B5: thiết lập database

- tải sequelize : npm install --save sequelize@6.6.2 và npm install --save-dev sequelize-cli@6.2.0
- thêm .sequelizerc rồi thiết lập cấu hình tạo các file
- cd src rồi npx sequelize-cli init ( khởi tạo các file liên quan trong .sequelizerc)
