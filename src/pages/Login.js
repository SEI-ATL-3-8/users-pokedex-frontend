import React, { useState } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

export default function Login(props) {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        try{
            let response = await axios.post(`${env.BACKEND_URL}/users/login`,{ username, password })
            
            localStorage.setItem('userId', response.data.user.id)
            props.setUser(response.data.user)
        

        }catch(error){
            console.log(error)
        }
    }


    return (
        <div className="loginBox">
            <form>
                <input type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <button type="submit" onClick={(event) => handleLogin(event)}>Log In</button>

            </form>
            
        </div>
    )
}
