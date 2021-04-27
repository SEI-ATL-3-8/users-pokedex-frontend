import { useState, createContext } from "react";
import axios from 'axios'
// Create Context Object
const UserContext = createContext()

// Create a provider for components to consume and subscribe to changes
const UserProvider = props => {
    const [user, setUser] = useState({});
    const fetchUser = () => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
                headers: {
                    Authorization: userId
                }
            })
                .then((response) => {
                    console.log(response);
                    setUser(response.data.user)
                })
        }
    }

    const state = {
        userState: [user, setUser],
        fetchUser: fetchUser
    }
    return (
        <UserContext.Provider value={state}>
            {props.children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider }