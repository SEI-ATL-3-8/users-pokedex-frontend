import {Link} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <ul>
            <span>
            <span onClick = {() => {localStorage.removeItem('userId')
            props.setUser({})
                }}>Log-Out</span>
            </span>
            <li>
                <Link 
                to="/signup">
                    Sign Up
                </Link>
            </li>
            <li>
                <Link 
                to="/login">
                    Login
                </Link>
            </li>
            <li>
                <Link 
                to="/">
                    All Pokemon
                </Link>
            </li>
            <li>
                <Link 
                to="/favorites">
                    My Favorites
                </Link>
            </li>
        </ul>
    )
}

export default Navbar