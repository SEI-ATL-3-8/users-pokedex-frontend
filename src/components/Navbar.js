import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <ul className ='navbar'>
            <>
            <li>
                <Link 
                to="/">
                    All Pokemon
                </Link>
            </li>
            <li>
            {' | --     |'} {' -- | '}
                <Link 
                to="/favorites">
                    My Favorites
                </Link>
            </li>
            </>
            <>
            <li>
                {' | --     |'} {' -- | '}
                <Link to = '/login'>Login</Link>
            </li>
            <li>
                {' | --     |'} {' -- | '}
                <Link to = '/signup'>Signup</Link>
            </li>
            <li>
                {' | --     |'} {' -- | '}
                <Link to = '/profile'>Profile</Link>
            </li>
            </>
        </ul>
    )
}

export default Navbar