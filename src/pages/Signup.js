import React, { useState } from 'react'
import env from 'react-dotenv'
import axios from 'axios'


export default function Signup(props) {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleSignup = async (event) => {
        event.preventDefault();
        try{
            let response = await axios.post(`${env.BACKEND_URL}/users/`,{ username, password })
            
            localStorage.setItem('userId', response.data.newUser.id)
            props.setUser(response.data.newUser)
        }catch(error){
            console.log(error)
        }
    }


    return (
        <div className="loginBox">
            <form>
                <input type="text" placeholder="username" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                <button type="submit" onClick={(event) => handleSignup(event)}>Sign Up</button>

            </form>
            
        </div>
    )
}
