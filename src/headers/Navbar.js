import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";


const Navbar = props => {
    const [userToken, setUserToken] =  useContext(UserContext).userTokenState;

    const handleClick = () => {
        localStorage.removeItem('userToken');
        setUserToken(null);
    }

    return (
        <header>
            <nav>
                { userToken === null ? 
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>

                    </ul> 
                    :
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/pokemons">Pokemons</Link></li>
                        <li><Link to="/favorites">Favorites</Link></li>
                        <li><span onClick={handleClick}>Logout </span></li>
                    </ul>
                }
            
            </nav>

        </header>
    );
 
};

export default Navbar;
