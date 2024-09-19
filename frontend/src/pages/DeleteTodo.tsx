import { useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"
import { TodoContext } from "../context/TodoContext";
import { observer } from "mobx-react";

export const DeleteTodo = observer(() => {
    const todoStore = useContext(TodoContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const getDetailTodo = async () => {
        const result = await todoStore.getDetailTodo(id!);
        if (!result) {
            navigate('/');
        }
    }

    useEffect(() => {
        todoStore.loading = 'Loading';
        getDetailTodo();
    }, []);

    const handleDeleteTodo = async () => {
        const result = await todoStore.deleteTodo(id!);
        if (result) {
            alert('Delete Todo successful')
            navigate(`/todos`);
        } else {
            alert('Delete Todo failed')
        }
    }

    return (
        <div className="page">
            <h1>Delete Todo</h1>
            {todoStore.loading === 'Done' &&
                <div className="delete-todo">
                    <div className="details">
                        <div>
                            <span>Name:</span> {todoStore.todo.name}
                        </div>
                        <div>
                            <span>IsDone:</span> {todoStore.todo.isDone ? '✔️' : '❌'}
                        </div>
                    </div>
                    <button className="button-delete" onClick={handleDeleteTodo}>Delete</button> {' '}
                    <Link className="button-back" to={`/todos`}> Back </Link>
                </div>
            }
        </div>
    )
})