import { useState, useContext } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { UserContext } from '../context/UserContext'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {userState} = useContext(UserContext)
    const [user, setUser] = userState

    const submitForm = (e) => {
        console.log(env.BACKEND_URL);
        e.preventDefault()
        axios.post(`${env.BACKEND_URL}/user/signup`, {name, email, password})
        .then((response) => {
            console.log(response);
            localStorage.setItem('userId', response.data.createUser.id)
            setUser(response.data.user)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1>Provide Your Information Here!</h1>
            <form onSubmit = {submitForm}>
                <label htmlFor = 'name'>Name</label>
                <input type = 'text' value = {name} onChange = {(e) => setName(e.target.value)}/>
                <label htmlFor = 'email'>Email</label>
                <input type = 'text' value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                <label htmlFor = 'password'>Password</label>
                <input type = 'password' value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                <input type = 'submit' value = 'Sign Up!' />
            </form>
        </div>
    )
}

export default SignUp;