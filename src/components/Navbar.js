import {Link} from 'react-router-dom'

import { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalContext'

const Navbar = () => {
    const { userState } = useContext(GlobalContext)
    const [ user, setUser ] = userState

    const [ redirect, setRedirect ] = useState(false)

    return (
        <ul>
            { redirect && <Redirect to="/" />}

                <Link to="/">
                    All Pokemon
                </Link>

            { user.id ? 
                <span>
                    <Link to="/favorites">
                        My Favorites
                    </Link>
            
                    <a onClick={()=>{
                        localStorage.removeItem('userId')
                        setUser({})
                        setRedirect(true)
                    }}>
                        Log Out
                    </a>
                </span>
            :
                <span>
                    <Link to="/user/signup">
                        Sign Up
                    </Link>

                    <Link to="/user/login">
                        Log In
                    </Link>
                </span>
            }
            
        </ul>
    )
}

export default Navbar