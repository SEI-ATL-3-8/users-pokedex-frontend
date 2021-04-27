import { createContext, useState } from 'react';

const UserContext = createContext('');


const UserProvider = ({children}) => {
    const [userToken, setUserToken] = useState(null);

    const store = {
        userTokenState: [userToken, setUserToken]
    }

    return (
        <UserContext.Provider value={store}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider};