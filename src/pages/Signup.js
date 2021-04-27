import axios from 'axios'
import { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'

function Signup() {
    const { userState } = useContext(GlobalContext)
    const [user, setUser] = userState

    const [inputs, setInputs] = useState({})

    const [ redirect, setRedirect ] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/new`, inputs)
            .then(res => {
                if(res.data.status === 200) {
                    localStorage.setItem('userId', res.data.user[0].id)
                    setUser(res.data.user[0])
                    setRedirect(true)
                }
            })
            .catch(error => {
                console.error('/user/new req failed', error);
            })
    }

    return ( 
        // username email(unique) password
        <form onSubmit={handleSubmit}>

            { redirect && <Redirect to="/" /> }

            <h2>Sign Up</h2>

            <label htmlFor="username">Username:</label>
            <input name="username" 
                type="text"
                value={inputs.username}
                onChange={(e)=>{
                    setInputs({...inputs, username: e.target.value})
                }}
            />

            <label htmlFor="email">Email:</label>
            <input name="email" 
                type="email"
                value={inputs.email}
                onChange={(e)=>{
                    setInputs({...inputs, email: e.target.value})
                }}
            />

            <label htmlFor="password">Password:</label>
            <input name="password" 
                type="password"
                value={inputs.password}
                onChange={(e)=>{
                    setInputs({...inputs, password: e.target.value})
                }}
            />

            <input type="submit" value="Sign Up" />
        </form>
    )
}

export default Signup