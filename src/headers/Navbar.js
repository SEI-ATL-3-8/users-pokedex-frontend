import { Link } from "react-router-dom";


const Navbar = props => (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Pokemons</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
            </ul>
        </nav>

    </header>
);

export default Navbar;
