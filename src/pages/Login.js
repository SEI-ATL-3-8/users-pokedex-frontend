import SignupLoginForm from '../components/SignupLoginForm'

const Login = (props) => {
  return (
    <SignupLoginForm
      buttonText="Log in!"
      setUser={props.setUser}
      route="/users/login"
    />
  )
}

export default Login
