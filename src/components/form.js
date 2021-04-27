const Form = (props) => {

    return(
        <div>
            <h4>Email:</h4>
            <input type = 'text' value={props.Email} onChange={(e) => { props.setEmail(e.target.value) }}/>
            <h4>Password:</h4>
            <input type = 'password' value={props.Password} onChange={(e) => { props.setPassword(e.target.value) }}/>
        </div>
    )

}

export default Form