import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import {Redirect} from 'react-router-dom'
const backEnd = process.env.REACT_APP_BACKEND
const Login = () => {
    const { userState } = useContext(UserContext)
    const [user, setUser] = userState
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const submitForm = (e) => {
        e.preventDefault()
        axios.post(`${backEnd}/users/login`, { email, password }).
            then((response) => {
                console.log(response)
                localStorage.setItem('userId', response.data.user.id)
                setUser(response.data.user)
                setShouldRedirect(true)
            })   
    }
    return (
        <div>
            { shouldRedirect && <Redirect to={`/`} exact /> }
            <form className="log-sign-form" onSubmit={submitForm}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Log In!" />
                </div>
            </form>
        </div>
    )
}

export default Login