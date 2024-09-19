import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoType } from "../typeTodo";
import { observer } from "mobx-react";
import { TodoContext } from "../context/TodoContext";
import { Pagination } from "../Pagination";

export const Home = observer(() => {
    const todoStore = useContext(TodoContext);
    const navigate = useNavigate();

    const currentPage = todoStore.currentPage;
    const todosPerPage = todoStore.todosPerPage;
    const startIndex = (currentPage - 1) * todosPerPage;
    // const lastIndex = currentPage * todosPerPage;
    // const currentTodos = todoStore.todos.slice(firstIndex, lastIndex);

    const getList = async () => {
        const result = await todoStore.getTodoList();
        if (!result) {
            navigate('/');
        }
    }

    useEffect(() => {
        todoStore.loading = 'Loading'
        getList();
    }, [currentPage])

    // Event when click btn to logout
    async function handleClick() {
        await todoStore.logout();
        navigate('/');
    }

    return (
        <div className="page">
            <h1>Todos List</h1>
            <div className="profile">
                User: <i>{todoStore.user._id}</i>
                <button onClick={handleClick}> Logout </button>
            </div>
            <Link
                to={`/todos/create`}
                className="button-create"> Create Todo </Link>
            <div className="wrapper-table">
                <table className="todos-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th id="name">Name</th>
                            <th>IsDone</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todoStore.loading === 'Done' && todoStore.todos.map((todo: TodoType, index) => (
                            <tr key={todo._id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{todo.name}</td>
                                <td>{todo.isDone ? '✔️' : '❌'}</td>
                                <td>
                                    <div>
                                        <Link
                                            to={`/todos/edit/${todo._id}`}
                                            className="button-edit">Edit
                                        </Link>
                                        <Link
                                            to={`/todos/delete/${todo._id}`}
                                            className="button-delete">Delete
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination />
        </div>
    )
});