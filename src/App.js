import AllPokemon from './pages/AllPokemon'
import FavPokemon from './pages/FavPokemon'
import Navbar from './components/Navbar'
import {Route, Redirect} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import {UserContext} from './context/UserContext'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  const [favPokemon,setFavPokemon] = useState([])
  const [favPokemonNames, setFavPokemonNames] = useState([])
  const { userState, fetchUser } = useContext(UserContext)
  const [user, setUser] = userState

  useEffect(fetchUser, [])
 
  const fetchSavedPokemon = async () => {
    const userId = localStorage.getItem('userId')
    try {
      let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favPokemon`,{
        headers: {
          Authorization: userId
        }
      })
      console.log(response)
     
      setFavPokemon(response.data.favPokemon)

   
      let names = []
      for(let pokemon of response.data.favPokemon) {
        names.push(pokemon.name)
      }
      setFavPokemonNames(names)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSavedPokemon()
  },[fetchUser])

  const savePokemon = async (pokemonName) => {
    const userId = localStorage.getItem('userId')
    try {
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favPokemon`, {
        name: pokemonName
      },
      {
        headers: {
          Authorization: userId
      }
    })
      fetchSavedPokemon()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const isFave = (currentPokemonName) => {
    if(favPokemonNames.includes(currentPokemonName)) {
      return true
    }
    return false
  }

    const deletePokemon = async (pokemonName) => {
      const userId = localStorage.getItem('userId')
      try {
        let res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favPokemon/${pokemonName}`, {
          headers: {
            Authorization: userId
          }
        })
        console.log(res)
        fetchSavedPokemon()
      } catch (error) {
        console.log(error)
      }
    }

   

    // const fetchUser = () => {
    //     const userId = localStorage.getItem('userId')
    //     if (userId) {
    //       axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verify`, {
    //         headers: {
    //           Authorization: userId
    //         }
    //       })
    //       .then((response) => {
    //         setUser(response.data.user)
    //       })
    //     }
    //   }

    //   useEffect(fetchUser, [])

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser}/>
      <Route 
        exact path = "/"
        render={() => {
          if (user.id) {
           return <AllPokemon
          savePokemon = {savePokemon} 
          isFave = {isFave}
          deletePokemon ={deletePokemon}
          />
          } else {
            return <Redirect to='/login' />
          }
        }
      }
     />
      <Route 
      exact path = "/favorites"
      render={() => {
        if (user.id) {
          return <FavPokemon 
        favPokemon ={favPokemon}
        isFave = {isFave}
        deletePokemon ={deletePokemon}
        />
          } else {
            return <Redirect to='/login' />
          }
        }
      }
      />
      <Route path="/signup" render = {() => {
        if (user.id) {
          return <Redirect to="/" exact />
        } else {
          return <Signup />
        }
      }}  />
      <Route path="/login" render = {() => {
        if (user.id) {
          return <Redirect to="/" exact />
        } else {
          return <Login />
        }
      }}  />
      
    </div>
  );
}

export default App;
