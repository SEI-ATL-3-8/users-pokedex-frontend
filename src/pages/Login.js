import { useState, useContext } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { UserContext } from '../context/UserContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {userState} = useContext(UserContext)
    const [user, setUser] = userState

    const loginForm = (e) => {
        e.preventDefault()
        axios.post(`${env.BACKEND_URL}/user/login`, ({email, password}))
        .then((response) => {
            console.log(response);
            localStorage.setItem('userId', response.data.findUser.id)
            setUser(response.data.user)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1>Log-In</h1>
            <form onSubmit = {loginForm}>
                <label htmlFor = 'email'>Email</label>
                <input type = 'text' value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                <label htmlFor = 'password'>Password</label>
                <input type = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                <input type = 'submit' value = 'Login' />
            </form>
        </div>
    )
}

export default Login;