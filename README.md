# This is a small project built by MERN stack

# Tạo 1 project MERN-Stack
## Tạo thư mục 'backend'
    - npm init:                             Tạo file package.json
        + Thêm 'type: module'
    - npx tsc -init:                       Tạo file tsconfig.json
        + Chỉnh 'outDir: ./dist', 'module', 'moduleResolution' là NodeNext
    - npm i <package>:  express, mongoose, morgan, cors
                        nodemon, concurrently (--save-dev)
                        cookie-parser (dùng để phân tích cú pháp cookie) (lưu ý dùng credentials cả bên back và front end)
                        jsonwebtoken (dùng để authentication khi login)
                        bcrypt (dùng để hash password và lưu vào DB)

## Tạo project 'frontend' với Vite
    - npm create vite@latest
    - Thêm các package: react-router-dom, axios (for sending HTTP request)
                        mobx (for state management)
                        

                    
* Note: Ko dùng async/await với '.then'
    + Lấy userId từ token (ko truyền userId qua params) -> X
    + Sửa lại hàm auth() để nó sẽ ktra hết các trang (chứ k chỉ mỗi Login và Home) -> X
    + Mã hóa password khi lưu và DB (dùng bcrypt) -> X

    /-------------------------------------------------/

    + Đổi lại đăng nhập = email, password   -> X
    + Wrap lại các login/register/logout -> routerAuth và dùng: app.use('/auth', routerAuth)    -> X
    + Chuyển các call api vào trong store   -> X
    + Dùng hết async/await  -> X
    + Phân trang todoList -> X
    + Lấy dữ liệu phân trang từ backend -> X