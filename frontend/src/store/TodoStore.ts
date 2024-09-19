import { makeAutoObservable } from "mobx";
import { TodoType } from "../typeTodo";
import axios from "axios";

export default class TodoStore {
    todos: TodoType[] = [];
    todo: TodoType = {
        _id: '',
        name: '',
        isDone: false,
        userID: ''
    }
    totalTodos: number = 0;
    loading: 'Loading' | 'Done' | 'Failed' = 'Loading';
    user = {
        _id: '',
        email: '',
        password: ''
    };
    currentPage: number = 1;
    todosPerPage: number = 5;

    constructor() {
        makeAutoObservable(this);
    }
    setTodo(name: string, isDone = false) {
        this.todo!.name = name;
        this.todo!.isDone = isDone;
    }
    resetUser() {
        this.user.email = '';
        this.user.password = ''
    }

    // check authentication to login
    async getAuthentication() {
        try {
            const res = await axios.get('http://localhost:3000/auth', { withCredentials: true })
            if (res.data.message === 'Authorized') {
                return true;
            }
            this.loading = 'Done';
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    // post user login
    async checkUserLogin(data: { email: string, password: string }) {
        try {
            // withCredentials: true --> Allow your browser include cookies and authentication headers in your XHR request.
            const res = await axios.post('http://localhost:3000/auth/login', data, { withCredentials: true });
            alert(res.data.message);
            if (res.data.message === 'Đăng nhập thành công') {
                return true;
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    // logout
    async logout() {
        try {
            const res = await axios.get('http://localhost:3000/auth/logout', { withCredentials: true })
            alert(res.data.message);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    // register a user
    async registerUser(newUser: { name: string, email: string, password: string }) {
        try {
            const res = await axios.post('http://localhost:3000/auth/register', newUser)       // post user to db
            return res.data.message;
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    // get todolist
    async getTodoList() {
        try {
            // const res = await axios.get(`http://localhost:3000/todos`, { withCredentials: true });
            const res = await axios.post(`http://localhost:3000/todos`, 
                {currentPage: this.currentPage, todosPerPage: this.todosPerPage}, 
                { withCredentials: true });
            console.log(this.currentPage + "  " + this.todosPerPage);

            if (res.data.message === 'Success') {
                this.todos = res.data.todos;
                this.user._id = res.data.userId;
                this.totalTodos = res.data.totalTodos;
                this.loading = 'Done';
                return true;
            }
        } catch (error) {
            alert(error);
            this.loading = 'Failed';
        }
    }

    // create a new todo
    async createTodo() {
        try {
            const res = await axios.post(`http://localhost:3000/todos/create`, this.todo, { withCredentials: true });
            if (res.data.message !== 'Success') {
                alert("Please login");
                console.log(res.data.message);
                return false;
            }
            alert('Create Todo successful')
            return true;
        } catch (error) {
            alert('Failed to create new Todo');
            console.log(error);
        }

    }

    // get detail a todo
    async getDetailTodo(todoId: string) {
        try {
            // Get detail of Todo
            const res = await axios.get(`http://localhost:3000/todos/detail/${todoId}`, { withCredentials: true });
            if (res.data.message === 'Success') {
                this.todo = res.data.todoById;
                this.loading = 'Done';
                return true;
            }
        } catch (error) {
            alert('Failed to Load a Todo');
            console.log(error);
            this.loading = 'Failed';
        }
    }

    // update a todo
    async updateTodo(todoId: string) {
        try {
            const res = await axios.put(`http://localhost:3000/todos/${todoId}`, this.todo);
            if (res.data.message === 'Updated successfully') {
                return true;
            }
        } catch (error) {
            alert('Error when update Todo');
            console.log(error);
        }
    }

    // delete a todo
    async deleteTodo(todoId: string) {
        try {
            const res = await axios.delete(`http://localhost:3000/todos/${todoId}`)
            if (res.data.message === 'Deleted successfully') {
                return true;
            }
        } catch (error) {
            alert('Failed when delete Todo');
            console.log(error);
        }
    }
}

export const todoStore = new TodoStore();