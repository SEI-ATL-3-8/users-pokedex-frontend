import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <ul>
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
            <li>
                <Link 
                to="/login">
                    Log In
                </Link>
            </li>
            <li>
                <Link 
                to="/signup">
                    Sign Up
                </Link>
            </li>
            <li>
                <span 
                    onClick={() => {
                        console.log('youre logged out!');
                    }}
                >
                    Log Out
                </span>
            </li>
        </ul>
    )
}

export default Navbar