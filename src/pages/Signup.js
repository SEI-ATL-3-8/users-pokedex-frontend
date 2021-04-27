import Form from "../components/Form"
import { useContext } from 'react';
import { UserContext } from "../context/userContext";



const Signup = () => {

    
    const [userToken, setUserToken] =  useContext(UserContext).userTokenState;


    const handleSubmit = async(e, formParams) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formParams)
        });

        const data = await response.json();

        console.log(data);

        localStorage.setItem('userToken', data.userToken);

        setUserToken(data.userToken);
    }

    
    return (
        <div className="login-section">
            <h1>Signup</h1>
            <Form handleSubmit={handleSubmit} buttonName="Sign Up"/>

        </div>
    );

}


export default Signup;