import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <ul>
            {localStorage.getItem('userId') ?
                <div>
                    <li>
                        <Link
                        to='/signup'>
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link
                        to='/login'>
                            Login
                        </Link>
                    </li>
                </div>
            :
                <div>
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
                        to='/'
                        onClick={() => {
                            localStorage.clear()
                        }}>
                            Logout
                        </Link>
                    </li>
                </div>
            }
        </ul>
    )
}

export default Navbar