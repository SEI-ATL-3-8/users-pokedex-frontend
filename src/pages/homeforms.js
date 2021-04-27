import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { render } from '@testing-library/react'
import Form from '../components/form'


const HomeForms = (props) => {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{setRedirect(false)}, [])
   



    const handleSignUp = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {Name, Email, Password})
        if(res.data.message === 'Signed up'){
            localStorage.setItem('userId', res.data.userId)
            // props.setUser({name: res.data.userName, email: res.data.userEmail})
            props.fetchUser()
            setRedirect(true)
        }
    }

    const handleLogin = async () => {
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {Email, Password})
        console.log(res);
        if(res.data.message === 'login successful'){
            localStorage.setItem('userId', res.data.userId)
            // props.setUser({name: res.data.userName, email: res.data.userEmail})
            props.fetchUser()
            setRedirect(true)
        }
    }


    render()
    if(redirect === true){
        return <Redirect to = '/all' />
    }


    return (
        <div>

            {props.form === 'signup' &&
                <div>
                    <h4>Name:</h4>
                    <input type = 'text' value={Name} onChange={(e) => { setName(e.target.value) }}/>
                    <Form Email = {Email} Password={Password} setEmail={setEmail} setPassword = {setPassword} />
                    <button onClick={()=>{handleSignUp()}} >Sign Up</button>
                </div>
            } 

            {props.form === 'login' &&
                <div>
                    <Form Email = {Email} Password={Password} setEmail={setEmail} setPassword = {setPassword} />
                    <button onClick={()=>{handleLogin()}}>Login</button>
                    
                </div>
            }

        </div>
    )
}

export default HomeForms