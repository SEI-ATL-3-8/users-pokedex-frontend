import axios from 'axios'

const Login = props => {

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
            username: props.username,
            password: props.password
        }).then(res => {
            if (res.data.user) {
                localStorage.setItem('userId', res.data.user.id)
            }
        })
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type='text' value={props.username} onChange={e => props.setUsername(e.target.value)} placeholder='Username' required />
                </div>
                <div>
                    <input type='password' value={props.password} onChange={e => props.setPassword(e.target.value)} placeholder='Password' required />
                </div>
                    <input type='submit' value='Login!' />
            </form>
        </div>
    )
}

export default Login