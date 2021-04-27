import { createContext, useEffect, useState } from 'react';

const UserContext = createContext('');


const UserProvider = ({children}) => {
    const [userToken, setUserToken] = useState(null);

    const verifyUser = async () => {
        if (localStorage.getItem('userToken')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/verify`, {
                    method: 'GET',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('userToken')
                    }
                });

                if (response.status !== 200 ) throw new Error('Something Went Wrong');

                setUserToken(localStorage.getItem('userToken'));

                
            }
            catch(error) {
                console.log(error);
            }


        }
   
    }

    useEffect( () => {
     
        verifyUser();
    }, []);

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