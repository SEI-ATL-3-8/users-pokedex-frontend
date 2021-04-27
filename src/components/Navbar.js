import {Link} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <div>
            <div>
                <Link to ='/home'>Home</Link> 
            </div>

            {!props.user.name ? 
                <div>
                    <span onClick={()=>{props.setForm('signup')}}>
                        <Link to = '/home/form'>Sign Up</Link>{'  |  '}
                    </span>

                    <span onClick={()=>{props.setForm('login')}}>
                        <Link to = '/home/form'>Login</Link>
                    </span>

                </div>
            :
                <div>
                    <Link to="/all">All Pokemon</Link>{'  |  '}
                    <Link to="/favorites"> My Favorites</Link>{'  |  '}

                    <span onClick={()=>{
                        localStorage.removeItem('userId') 
                        props.setUser({})
                        props.setFavPokemon([])
                        props.setFavPokemonNames([])
                        
                        }}>
                        <Link to='/home'>Logout</Link>
                    </span>
                </div>
        
            }            
        </div>
    )
}

export default Navbar