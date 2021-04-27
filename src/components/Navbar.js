import {Link} from 'react-router-dom'

const Navbar = (props) => {

    const logout = () => {
        localStorage.clear();
        props.setUser({})

    }

    // if user is logged in
    if(props.user != {}){
        console.log('logged in')
    }

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
                to="/signup">
                    Sign Up
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
                to="/login" onClick={()=>logout()}>
                    Log Out
                </Link>
            </li>
            
        </ul>
    )
}

export default Navbar