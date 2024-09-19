import express from 'express';
import { TodoModel } from "../models/todoModel.js";
import authenticate from '../authenticateToken.js';
const todosRouter = express.Router();
// POST /todos: Route for get all todos from DB with currentPage and todosPerPage 
todosRouter.post('/', authenticate, async (req, res) => {
    const userId = req.user?.userId;
    const currentPage = req.body.currentPage;
    const todosPerPage = req.body.todosPerPage;
    try {
        const todos = await TodoModel.find({ userID: userId })
            .skip((currentPage - 1) * todosPerPage)
            .limit(todosPerPage);
        // Đếm tổng số lượng todos của người dùng để trả về tổng số trang
        const totalTodos = await TodoModel.countDocuments({ userID: userId });
        if (todos) {
            return res.send({ message: 'Success', todos, totalTodos, userId });
        }
        else {
            return res.send({ message: 'Failed' });
        }
    }
    catch (error) {
        res.send(error);
    }
});
// GET /todos: Route for get all todos from DB
// todosRouter.get('/', authenticate, async (req: Request & { user?: UserPayLoadType }, res) => {
//     const userId = req.user?.userId;
//     const currentPage = req.params.currentPage;     // fix
//     try {
//         const todos = await TodoModel.find({ userID: userId });
//         if (todos) {
//             return res.send({ message: 'Success', todos, userId });
//         } else {
//             return res.send({ message: 'Failed' });
//         }
//     } catch (error) {
//         res.send(error);
//     }
// })
// GET /todos/:id: Route for get todo by id
todosRouter.get('/detail/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const todoById = await TodoModel.findById(id);
        if (todoById) {
            res.send({ message: 'Success', todoById });
        }
        else {
            res.send({ message: 'Failed' });
        }
    }
    catch (error) {
        res.send(error);
    }
});
// POST /todo: Route for save a new todo
todosRouter.post('/create', authenticate, async (req, res) => {
    const userId = req.user?.userId;
    try {
        // Check all required fields
        if (!req.body.name) {
            return res.send({ message: 'Send all required fields: name' });
        }
        const newTodo = {
            name: req.body.name,
            isDone: false,
            userID: userId
        };
        await TodoModel.create(newTodo);
        res.send({ message: 'Success' });
    }
    catch (error) {
        res.send(error);
    }
});
// PUT /todos/:id: Route for update a todo
todosRouter.put('/:id', async (req, res) => {
    try {
        // Check all required fields
        if (!req.body.name) {
            return res.send({ message: 'Send all required fields: name' });
        }
        const { id } = req.params;
        const updatedTodo = {
            name: req.body.name,
            isDone: req.body.isDone
        };
        const result = await TodoModel.findByIdAndUpdate(id, updatedTodo);
        if (!result) {
            return res.send({ message: 'Update failed' });
        }
        res.send({ message: 'Updated successfully' });
    }
    catch (error) {
        res.send(error);
    }
});
// Delete /todos/:id: Route for delete a todo by id
todosRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await TodoModel.findByIdAndDelete(id);
        if (!result) {
            return res.send({ message: 'Delete todo failed' });
        }
        res.status(200).send({ message: 'Deleted successfully' });
    }
    catch (error) {
        res.send(error);
    }
});
export default todosRouter;
