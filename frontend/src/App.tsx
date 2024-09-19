import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { CreateTodo } from "./pages/CreateTodo"
import { EditTodo } from "./pages/EditTodo"
import { DeleteTodo } from "./pages/DeleteTodo"
import { TodoContext } from "./context/TodoContext"
import { todoStore } from "./store/TodoStore"
import { LoginPage } from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
    return (
        <TodoContext.Provider value={todoStore}>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/todos" element={<Home />} />
                <Route path="/todos/create" element={<CreateTodo />} />
                <Route path="/todos/edit/:id" element={<EditTodo />} />
                <Route path="/todos/delete/:id" element={<DeleteTodo />} />
            </Routes>
        </TodoContext.Provider>
    )
}

export default App
