import Form from "../components/Form"

import {useContext} from 'react';
import { UserContext } from "../context/userContext";



const Login = () => {
    const [userToken, setUserToken] =  useContext(UserContext).userTokenState;


    const handleSubmit = async(e, formParams) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formParams)
            });
    
            const data = await response.json();
    
            console.log(data);
    
            localStorage.setItem('userToken', data.userToken);
    
            setUserToken(data.userToken);
        }

        catch(error) {
            console.log(error);
        }
       
    }

    
    return (
        <div className="login-section">
            <h1>Login</h1>
            <Form handleSubmit={handleSubmit} buttonName="Login" />

        </div>
    )

}


export default Login;