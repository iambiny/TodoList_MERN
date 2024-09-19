import express, { Request } from "express";
import authenticate, { UserPayLoadType } from "../authenticateToken.js";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// Route for auth
authRouter.get('/', authenticate, (req: Request & { user?: UserPayLoadType }, res) => {
    res.send({ message: 'Authorized', userId: req.user?.userId });
})

// Route for login
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            // If has user then check password
            bcrypt.compare(password, user?.password!, (err, result) => {
                if (err) {
                    return res.send(err);
                }
                if (result) {   // Nếu Login success thì tạo token cho user và lưu vào cookie
                    const token = jwt.sign({ userId: user!._id, email, name: user.name }, 'jwt-secret-key', { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.send({ message: 'Đăng nhập thành công', userId: user!._id });
                }
                return res.send({ message: 'Mật khẩu không đúng' });
            })
        } else {
            res.send({ message: 'User chưa đăng ký' });
        }
    } catch (err) {
        res.send(err);
    }
})

// Route for register
authRouter.post('/register', async (req, res) => {
    const data = req.body;
    const { name, email, password } = data;
    try {
        const isHasEmail = await UserModel.findOne({ email });
        if (isHasEmail) {
            return res.send({ message: 'Email đã đăng ký' });
        }
        bcrypt.hash(password, 10, async (err, hash) => {      // Hash password to store in DB
            if (err) {
                console.log(err);
                return res.send(err);
            }
            await UserModel.create({ name, email, password: hash })
            res.send({ message: 'Đăng ký thành công' });
        })
    } catch (error) {
        res.send(error);
    }
})

// Route for logout
authRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send({ message: 'Đăng xuất thành công' });
})

export default authRouter