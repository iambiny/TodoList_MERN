import { useContext } from "react"
import { useNavigate, Link } from "react-router-dom";
import { TodoContext } from "../context/TodoContext";
import { observer } from "mobx-react";

export const CreateTodo = observer(() => {
    const todoStore = useContext(TodoContext);
    const navigate = useNavigate();

    const handleCreateTodo = async () => {
        const result = await todoStore.createTodo();
        if (result) {
            navigate(`/todos`);
        } else {
            navigate('/');
        }
    }   

    return (
        <div className="page">
            <h1>Create Todo</h1>
            <div className="createTodo">
                <div className="form">
                    <label htmlFor="todoName">Name:</label>
                    <input
                        type="text"
                        id="todoName"
                        onChange={(e) => todoStore.setTodo(e.target.value)} />
                </div>
                <button className="button-create" onClick={handleCreateTodo}>Create</button> {' '}
                <Link className="button-back" to={`/todos`}> Back </Link>
            </div>
        </div>
    )
});