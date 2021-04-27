import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <ul>
            
            <Link to="/">All Pokemon-</Link> 
            <Link to="/favorites">  My Favorites-</Link>
            <Link to='/login'>LogIn-</Link>
            <Link to='/logout'>Logout-</Link>
            <Link to='/signup'>Signup</Link>
     
        </ul>
    )
}

export default Navbar