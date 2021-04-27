import axios from 'axios'
import { useState, createContext } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({children}) => {
    const [user, setUser] = useState({})

    const fetchUser = () => {
        const userId = localStorage.getItem('userId')
        if (userId) {
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verify`, {
            headers: {
              Authorization: userId
            }
          })
            .then(res => {
              // console.log(res);
              if (res.status === 200) {
                setUser(res.data.user)
                // console.log('user set', user);
              }
            })
            .catch(error => {
                console.error(error)
            })
        }
    }

    const store = {
        userState: [user, setUser],
        fetchUser
    }

    return (
        <GlobalContext.Provider value={store}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider }