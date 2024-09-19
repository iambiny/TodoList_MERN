import express, { Request, Response } from "express";
import morgan from "morgan";
import { PORT, mongoDBURL } from "./config.js";
import cors from "cors";
import todosRouter from "./routers/todosRoute.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRoute.js";

const app = express();

app.use(morgan('dev'));

// Middleware for parsing json from request body
app.use(express.json());

// Middleware for parsing cookie
app.use(cookieParser());

// Middleware for handling CORS Policy
app.use(cors({      // Allow custom origins
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))

app.use('/todos', todosRouter);     // mount 'todosRouter' for path '/todos' to app

app.use('/auth', authRouter);    // mount 'authRouter' for path '/auth' to app

// connect to db and load server if success
try {
    await mongoose.connect(mongoDBURL);
    console.log('App connected to database');
    app.listen(PORT, () => {    // open server at port '3000'
        console.log(`App is listening to port: http://localhost:${PORT}`);
    })
} catch (error) {
    console.log(error);
}