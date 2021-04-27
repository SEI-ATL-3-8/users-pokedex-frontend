import {useState , createContext} from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {
const [user,setUser] = useState({})

return(
    <UserContext.Provider>
        {children}
    </UserContext.Provider>
)

}

export{UserContext, UserProvider}