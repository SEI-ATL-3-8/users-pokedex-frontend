import axios from "axios"
import { useState } from "react"


const Login = (props) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    
    const submitform = (e) =>{
        e.preventDefault()
    
        axios.post ('http://localhost:3001/users/login', { 
            email: email,
            password: password
        }).then ((response) =>{
            console.log(response)
            localStorage.setItem('userId', response.data.user.id)
            props.setUser(response.data.user)

        })
        .catch((error) =>{
            console.log(error)
        })
    
    }
        return(
            <div>
                <form onSubmit = {submitform}>
                    <div>
                        <label htmlFor ="email">Email:- </label>
                        <input value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                    </div>
    
                    <div>
                        <label htmlFor ="password">Password:- </label>
                        <input type = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)}/>
    
                    </div>
                
                    <div>
                        <input type = 'submit' value = 'Log In!'/>
                    </div>
                </form>
    
            </div>
        )
    
    }

export default Login