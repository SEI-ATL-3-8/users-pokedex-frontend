import {useState, createContext } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

const UserContext = createContext()

const UserProvider = ({children}) => {
    const [user,setUser] = useState({})
    const [color,setColor] = useState('red')

    const fetchUser = () => {
        const userId = localStorage.getItem('userId')
       if(userId) {
         axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
           headers: {Authorization: userId}
         }).then((response) => {
           console.log(response)
           setUser(response.data.user)
         })
       }
      }
    

    const state = {
        userState: [user,setUser],
        fetchUser: fetchUser,
        colorState: [color,setColor]
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider}