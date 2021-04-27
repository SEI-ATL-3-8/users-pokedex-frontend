import axios from 'axios'

const Signup = props => {
    const handleSubmit = e => {
        e.preventDefault()
        console.log(props.username);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
            username: props.username,
            password: props.password
        }).then(res => {
            console.log(res)
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
                    <input type='submit' value='Sign Up!' />
            </form>
        </div>
    )
}

export default Signup