import {useState} from 'react'
import axios from 'axios'


const Signup = (props) =>{
    // console.log(env);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [emailError, setEmailError] = useState('')

    
    const submitForm = (e) => {
        e.preventDefault()
        // console.log(`${process.env.REACT_APP_BACKEND_URL}`);
        // console.log({email, password});
        // These are to check if it's connected to backend 
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {email, password})
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
                        <input type="submit" value="Sign up" />
                    </div>
                </form>
            </div>
        
    )
}

export default Signup