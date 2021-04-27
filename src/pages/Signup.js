import { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { Redirect } from 'react-router-dom'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [emailError, setEmailError] = useState('')
    const { userState, fetchUser } = useContext(UserContext)
    const [user, setUser] = userState
    const submitForm = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, { email, password })
            .then((response) => {
                localStorage.setItem('userId', response.data.userId)
                fetchUser()
                // TODO: redirect to all pokemons page
            })
            .catch((error) => {
                console.log(error);
                alert('oops!! something went wrong.')
            })
    }

    return (
        <div>
            {user.id && <Redirect to="/" />}
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                    <input type="submit" value="Sign Up!" />
                </div>
            </form>
        </div>
    )
}

export default Signup