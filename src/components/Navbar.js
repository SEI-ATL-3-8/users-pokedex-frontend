import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { useContext } from 'react'
const Navbar = () => {
    const { userState } = useContext(UserContext)
    const [user, setUser] = userState
    return (
        <ul>
            <li>
                <Link
                    to="/">
                    All Pokemon
                </Link>
            </li>
            {user.id ?
                <>
                    <li>
                        <Link
                            to="/favorites">
                            My Favorites
             </Link>
                    </li>
                    <li
                        onClick={() => {
                            localStorage.removeItem('userId')
                            setUser({})
                        }}
                    >Logout</li>
                </>
                :
                <>
                    <li>
                        <Link
                            to="/login">
                            Login
                </Link>
                    </li>
                    <li>
                        <Link
                            to="/signup">
                            Sign up
                </Link>
                    </li>
                </>
            }
        </ul>
    )
}

export default Navbar