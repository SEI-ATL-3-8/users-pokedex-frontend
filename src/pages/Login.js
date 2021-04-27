import axios from 'axios'
import { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'

function Login() {
    const { userState } = useContext(GlobalContext)
    const [user, setUser] = userState

    const [inputs, setInputs] = useState({})

    const [ redirect, setRedirect ] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, inputs)
            .then(res => {
                // console.log(res);
                if(res.data.status === 200) {
                    localStorage.setItem('userId', res.data.user.id)
                    setUser(res.data.user)
                    setRedirect(true)
                }
            })
            .catch(error => {
                console.error('/user/login req failed', error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>

            { redirect && <Redirect to="/" /> }

            <h2>Log In</h2>
            
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

            <input type="submit" value="Log In" />
        </form>
    )
}

export default Login