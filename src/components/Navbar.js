import {Link} from 'react-router-dom'

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
        </ul>
    )
}

export default Navbar