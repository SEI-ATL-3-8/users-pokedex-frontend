import { useState } from 'react'

const SignupLoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <div>
      <form>
        <div>
          <label htmlFor="new-email">Email: </label>
          <input id="new-email" value={email} onChange={(e) => { setEmail(e.target.value) }}/>
        </div>

        <div>
          <label htmlFor="new-password">Password: </label>
          <input type="password" id="new-password" value={password} onChange={(e) => { setPassword(e.target.value) }}/>
        </div>

        <div>
          <input type="submit" value={props.buttonText} />
        </div>
      </form>
    </div>
  )
}

export default SignupLoginForm