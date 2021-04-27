import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import {Redirect} from 'react-router-dom'

const backEnd = process.env.REACT_APP_BACKEND


const Signup = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const { userState } = useContext(UserContext)
    const [user, setUser] = userState
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        axios.post(`${backEnd}/users`, { name, email, password }).
            then((response) => {
                localStorage.setItem('userId', response.data.newUser.id)
                setUser(response.data.newUser)
                setShouldRedirect(true)
            })
    }

    return (
        <div>
            { shouldRedirect && <Redirect to={`/`} exact /> }
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
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