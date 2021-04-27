import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
    const { userState } = useContext(UserContext)
    const [user, setUser] = userState

    return (
        <nav>
          
                <Link to="/">All Pokemon</Link> {' | '}
                {localStorage.getItem('userId') ?
           <span>
            <span onClick ={() => {
               localStorage.removeItem('userId')
               setUser({})
            }}>Logout</span>{' | '}
            
                <Link to="/favorites">My Favorites</Link>{' | '}
            </span> 
            :
            <span>
            <Link to="/signup">Sign Up</Link>
            {' | '}
            <Link to="/login">Login</Link>

          </span>
}
        </nav>
    )
}

export default Navbar