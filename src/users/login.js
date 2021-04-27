import axios from "axios"
import { useState } from "react"

const LogIn = () =>{

    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    
    const submitHandler = async (e) =>{
        e.preventDefault()
        try {
            let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {username,email,password})
            
         localStorage.setItem('userId', response.data.newUser.id)
              
        } catch (error) {
            console.log({error: error.message});
            console.log('can not sign up');
        }


    }


return(



<form onSubmit = {submitHandler}>

<input type='text' name='username' placeholder='Username' value={username} onChange={(e)=>setUsername (e.target.value)} />
<input type='email' name='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
<input type='password' name='password' placeholder='password' value={password} onChange={(e) =>setPassword(e.target.value)}/>
<input type='submit' value='submit' />

</form>



    )
    
    }
    
    export default LogIn 