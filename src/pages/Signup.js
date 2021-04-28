import SignupLoginForm from '../components/SignupLoginForm'

const Signup = (props) => {
  return (
    <SignupLoginForm
      buttonText="Sign up!"
      setUser={props.setUser}
      route="/users"
    />
  )
}

export default Signup
