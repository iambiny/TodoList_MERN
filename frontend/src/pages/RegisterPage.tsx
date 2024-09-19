import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { todoStore } from "../store/TodoStore";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const user = {
            name: username,
            email: email,
            password: password
        }
        const mess = await todoStore.registerUser(user);
        alert(mess)
        if (mess === 'Đăng ký thành công') {
            navigate('/');
        }
    };

    return (
        <div className="entry-form">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Email: </label> <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </div>
                <div>
                    <label> Username: </label> <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required={true}
                    />
                </div>
                <div>
                    <label> Password: </label> <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>
                <button type="submit" className="btn-submit">Sign up</button>
            </form>
            <span>Already have an account?</span> {' '}
            <Link to={'/'} >Login in</Link>
        </div>
    );
}