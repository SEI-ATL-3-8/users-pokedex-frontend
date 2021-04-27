import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const Navbar = () => {

    const {userState} = useContext(UserContext)
    const [user, setUser] = userState

    return (
        <nav className="nav-bar">
            <NavLink className="nav-link" activeClassName="nav-active" exact to='/'>Home</NavLink>
            <NavLink className="nav-link" activeClassName="nav-active" to='/login'>Login</NavLink>
            <NavLink className="nav-link" activeClassName="nav-active" to='/signup'>Sign up</NavLink>
            <NavLink className="nav-link" activeClassName="nav-active" to='/pokemon'>All Pokemon</NavLink>
            <NavLink className="nav-link" activeClassName="nav-active" to='/favorites'>My Favorites</NavLink>
            <NavLink className="nav-link" activeClassName="nav-active" to='/logout'>Logout</NavLink>
            
        </nav>
    )
}

export default Navbar