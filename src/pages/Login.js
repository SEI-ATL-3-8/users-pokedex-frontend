import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import env from 'react-dotenv';

const Login = (props) =>
{
    const { userState } = useContext(UserContext);
    const [user, setUser] = userState;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        axios.post(`${env.BACKEND_URL}/users/login`, {
            email: email,
            password: password
        }).then((res) =>
        {
            // console.log(res);
            setUser({ id: res.data.user.id, email: res.data.user.email, password: res.data.user.password });
            localStorage.setItem('userId', res.data.user.id);
            props.fetchSavedPokemon();
        }).catch((error) =>
        {
            console.log(error.message);
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <input type="submit" value="Login" onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default Login;