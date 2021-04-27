import {useState} from 'react'
import axios from 'axios'



// Login page is same as signup! 

const Login = (props) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {email, password})
        .then((response) => {
            // console.log(response);
            localStorage.setItem('userId', response.data.user.id)
            props.setUser(response.data.user)
        })
    }


    return(
        <div>
            <form onSubmit={submitForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>

                <div>
                    <input type="submit" value="Log In" />
                </div>
            </form>
        </div>
    
)
}

export default Login