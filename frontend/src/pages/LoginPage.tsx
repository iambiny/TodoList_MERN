import { FormEvent, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoContext } from "../context/TodoContext";
import { observer } from "mobx-react";

export const LoginPage = observer(() => {
    const todoStore = useContext(TodoContext);
    const navigate = useNavigate();

    // Check if has token in cookie then go straight to todos page
    const isAuth = async () => {
        const result = await todoStore.getAuthentication();
        if (result) {
            navigate(`/todos`);
        }
    }

    useEffect(() => {
        todoStore.resetUser();
        isAuth();
    }, []);

    // handle button login
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            email: todoStore.user.email,
            password: todoStore.user.password
        }
        const result = await todoStore.checkUserLogin(data);
        if (result) {
            navigate(`/todos`)        // Go to todos page
        }
    };

    return (
        <>
            {todoStore.loading === 'Done' && <div className="entry-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label> Email: </label> <br />
                        <input
                            type="email"
                            value={todoStore.user.email}
                            onChange={(e) => todoStore.user.email = e.target.value}
                            required={true}
                        />
                    </div>
                    <div>
                        <label> Password: </label> <br />
                        <input
                            type="password"
                            value={todoStore.user.password}
                            onChange={(e) => todoStore.user.password = e.target.value}
                            required={true}
                        />
                    </div>
                    <button type="submit" className="btn-submit">Login</button>
                </form>
                <span>Don't have account?</span> {' '}
                <Link to={'/register'} >Sign up</Link>
            </div>}
        </>
    );
});