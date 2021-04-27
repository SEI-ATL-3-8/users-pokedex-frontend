import axios from 'axios'
import env from 'react-dotenv'
import { useState, createContext} from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user, setUser] = useState({})

    const fetchUser = () => {
        console.log(`${env.BACKEND_URL}/user/verify`);
      const userId = localStorage.getItem('userId')
      console.log(userId);
      if (userId) {
        axios.get(`${env.BACKEND_URL}/user/verify`, {
          headers: {
            authorization: userId
          }
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.user);
          setUser(response.data.user)
        })
      }
    }

    const state = {
        userState: [user, setUser],
        fetchUser: fetchUser
    }

    return (
        <UserContext.Provider value = {state}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}