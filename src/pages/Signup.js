import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirectState, setRedirectState] = useState('')

    const {userState} = useContext(UserContext)
    const [user, setUser] = userState

    const submitForm = (e) => {
        e.preventDefault()
        signUpUser()
    }

    const signUpUser = async () => {
        let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            name: name,
            email: email,
            password: password
        })
        localStorage.setItem('userId', response.data.userId)
        setUser(response.data.userId)
        setRedirectState(response.data.userId)
    }

    return (
        <div>
            { redirectState.length > 0 ? <Redirect to='/pokemon' />
            :
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Sign Up" />
                </div>
            </form>
            }
            
        </div>
    )
}


export default SignUp