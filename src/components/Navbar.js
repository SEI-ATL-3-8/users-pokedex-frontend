import { NavLink, Redirect } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'


const Navbar = () => {

    const {userState} = useContext(UserContext)
    const [user, setUser] = userState

    return (
        <div>
            { user.length > 0 ? 
                <nav className="nav-bar">
                    <NavLink className="nav-link" activeClassName="nav-active" to='/pokemon'>All Pokemon</NavLink>
                    <NavLink className="nav-link" activeClassName="nav-active" to='/favorites'>My Favorites</NavLink>
                    <span className="nav-logout" onClick={() => {
                        localStorage.removeItem('userId')
                        setUser({})
                    }}>Logout</span>
                    <span className="nav-side-margin"></span>
                </nav>    
            :
                <nav className="nav-bar">
                    <NavLink className="nav-link" activeClassName="nav-active" exact to='/'>Home</NavLink>
                    <NavLink className="nav-link" activeClassName="nav-active" to='/login'>Login</NavLink>
                    <NavLink className="nav-link" activeClassName="nav-active" to='/signup'>Sign up</NavLink>
                    <span className="nav-side-margin"></span>
                </nav> 
            }
        </div>

    )
}

export default Navbar