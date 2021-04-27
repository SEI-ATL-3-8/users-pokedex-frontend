import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {userState} = useContext(UserContext)
    const [user, setUser] = userState

    const loginForm = (e) => {
        e.preventDefault()
        loginUser()
    }

    const loginUser = async () => {
        let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
            email: email,
            password: password
        })
        localStorage.setItem('userId', response.data.user.id)
        setUser(response.data.user)
    }

    return (
        <div>
            <form onSubmit={loginForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}


export default Login