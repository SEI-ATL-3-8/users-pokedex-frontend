import {useState} from 'react'
import axios from 'axios'
import { useContext } from 'react'
 import { UserContext } from '../context/UserContext'
 import {Redirect} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('')
  const { userState } = useContext(UserContext)
  const [user, setUser] = userState
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const loginForm = (e) => {
      e.preventDefault()
      
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {email, password})
      .then((response) => {
          console.log(response)
          localStorage.setItem('userId', response.data.user.id)
          setUser(response.data.user)
          setShouldRedirect(true)
      })
  }

  return (
    <div className="loginPage">
    { shouldRedirect && <Redirect to={`/`} exact /> }
     <form onSubmit={loginForm}>
         <div>
             <label htmlFor="email">Email:</label>
             <input value={email} onChange ={(e) => setEmail(e.target.value)} />
         </div>
         <div>
             <label htmlFor="password">Password:</label>
             <input value={password} onChange ={(e) => setPassword(e.target.value)} />
         </div>
         <div>
             <input type="submit" value = "Login!"/>
         </div>
     </form>
    </div>
  )
}

export default Login