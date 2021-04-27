import {Link} from 'react-router-dom'

const Navbar = (props) => {
    return (
        <nav>
            
                <Link 
                to="/">
                    Home
                </Link>
           
            
     
            {props.user.id ?
            <div>
                <span>
                    <span onClick={()=>{
                        localStorage.removeItem('userId')
                        props.setUser({})
                    }}>Logout</span>
                </span>

                
                    <Link 
                    to="/pokemon">
                        All Pokemon
                    </Link>
                

                
                    <Link 
                    to="/favorites">
                        My Favorites
                    </Link>
                
            </div>
        
            :
            <div>
                
                    <Link 
                    to="/signup">
                        Signup
                    </Link>
                

                
                    <Link 
                    to="/login">
                        Login
                    </Link>
                
            </div>

            }


        </nav>
    )
}

export default Navbar