import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
const Navbar = () => {
    const { userState } = useContext(UserContext)
    const [user, setUser] = userState
    return (
        <div>
            <nav>

                {localStorage.getItem('userId') ?
                    <span>
                        <Link to="/favorites">My Favorites</Link>
                        {'  |   '}
                        <Link to="/">All Pokemon</Link>
                        {'  |   '}
                        <span onClick={() => {localStorage.removeItem('userId'); setUser({}) }}>
                            Log Out
            </span>
                    </span>
                    :
                    <span>
                        <Link to='/login'>Login</Link>
                        {'  |   '}
                        <Link to='/signup'>Signup</Link>

                    </span>
                }
            </nav>
        </div>
    )
}

export default Navbar