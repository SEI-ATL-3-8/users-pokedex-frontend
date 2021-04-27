import { useReducer } from 'react';
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const testVar = true
    return (
        <ul>
            {/* { testVar ? 'yes' : 'no' } */}
            {/* { testVar ? 'yes' : null } */}
            {/* { testVar && 'yes' } */}

            { props.user.id ? <>
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
                    <span 
                        onClick={() => {
                            localStorage.removeItem('userId')
                            props.setUser({})
                        }}
                    >
                        Log Out
                    </span>
                </li>
            </>
            :
            <>
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
            </>}
        
        </ul>
    )
}

export default Navbar