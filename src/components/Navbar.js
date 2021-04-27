import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { userState } = useContext(UserContext);
    const [user, setUser] = userState;

    const logoutUser = () =>
    {
        localStorage.removeItem('userId');
        setUser({});
    }
    
    return (
        <div>
            {user.id ?
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
                    to="/logout" onClick={logoutUser}>
                        Logout
                    </Link>
                </li>
            </ul>
            :
            <ul>
                <li>
                    <Link 
                    to="/signup">
                        Signup
                    </Link>
                </li>
                <li>
                    <Link 
                    to="/login">
                        Login
                    </Link>
                </li>
            </ul>
            }
        </div>
    )
}

export default Navbar