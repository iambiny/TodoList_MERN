import { observer } from "mobx-react";
import { useContext, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom";
import { TodoContext } from "../context/TodoContext";

export const EditTodo = observer(() => {
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

    const handleEditTodo = async () => {
        const result = await todoStore.updateTodo(id!);
        if (result) {
            alert('Edit Todo successful');
            navigate(`/todos`);
        } else {
            alert('Edit Todo Failed');
        }
    }

    return (
        <div className="page">
            <h1>Edit Todo</h1>
            {todoStore.loading === 'Done' &&
                <div className="editTodo">
                    <div className="form">
                        <label htmlFor="todoName">Name:</label>
                        <input
                            type="text"
                            id="todoName"
                            value={todoStore.todo.name}
                            onChange={(e) => todoStore.todo.name = e.target.value} />
                        <label htmlFor="todoIsDone">IsDone:</label>
                        <input
                            type="checkbox"
                            id="todoIsDone"
                            checked={todoStore.todo.isDone}
                            onChange={(e) => todoStore.todo.isDone = e.target.checked} />
                    </div>
                    <button className="btn-update" onClick={handleEditTodo}>Update</button> {' '}
                    <Link className="button-back" to={`/todos`}> Back </Link>
                </div>
            }
        </div>
    )
});