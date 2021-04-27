import AllPokemon from './pages/AllPokemon'
import FavPokemon from './pages/FavPokemon'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route, Redirect } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from './context/UserContext'

const backEnd = process.env.REACT_APP_BACKEND
function App() {
  const { userState, fetchUser } = useContext(UserContext)
  const [user, setUser] = userState

  useEffect(fetchUser, [])

  const [favPokemon, setFavPokemon] = useState([])
  const [favPokemonNames, setFavPokemonNames] = useState([])
  // fetch saved pokemon from the database function
  const fetchSavedPokemon = async () => {
    const userId = localStorage.getItem('userId')
    try {
      let response = await axios.get(`${backEnd}/favPokemon`,{
        headers: {
          Authorization: userId
      }})
      console.log(response)
      // assign to state of favPokemon
      setFavPokemon(response.data.favPokemon)

      // create an empty array
      let names = []
      // loop through the favorite pokemon array 
      for (let pokemon of response.data.favPokemon) {
        // only push the names of each favorited pokemon into names
        names.push(pokemon.name)
      }
      // then set favpokemonnames to an array of just the saved pokemon names
      // to be used in the isFave function
      setFavPokemonNames(names)
    } catch (error) {
      console.log(error)
    }
  }

  // ONLY when the app loads fetch all saved pokemon 
  // will not update saved pokemon everytime you save one!!!
  useEffect(() => {
    fetchSavedPokemon()
  }, [fetchUser])

  const savePokemon = async (pokemonName) => {
    console.log(pokemonName)
    const userId = localStorage.getItem('userId')
    try {
      let res = await axios.post('http://localhost:3001/favPokemon', {

        name: pokemonName
      }
        , {
          headers: {
            Authorization: userId
          }
        })
      // after every save, refetch all saved pokemon and update
      fetchSavedPokemon()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const isFave = (currentPokemonName) => {
    // check if the parameter currentPokemonName exists inside of the favPokemonNames array, if so return true, otherwise return false (for the conditional render of hearts)
    if (favPokemonNames.includes(currentPokemonName)) {
      return true
    }
    return false
  }

  const deletePokemon = async (pokemonName) => {
    const userId = localStorage.getItem('userId')
    try {
      let res = await axios.delete(`http://localhost:3001/favPokemon/${pokemonName}`,
        {
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

  return (
    <div className="App">
      <Navbar/>
      <Route
        exact path="/"
        render={() => {
          if (user.id) {
            return <AllPokemon
              savePokemon={savePokemon}
              isFave={isFave}
              deletePokemon={deletePokemon}
            />
          }
          else {
            return <Redirect to='/login' />
          }
        }
        }
      />
      <Route
        exact path="/favorites"
        render={() => {
          if (user.id) {
            return <FavPokemon
              favPokemon={favPokemon}
              isFave={isFave}
              deletePokemon={deletePokemon}
            />
          }
          else {
            return <Redirect to="/login" />
          }
        }} />
      <Route path='/login' render={() => {
        if (user.id) {
          return <Redirect to="/" exact />
        }
        else { return <Login /> }
      }} />
      <Route path='/signup' render={() => {
        if (user.id) {
          return <Redirect to="/" exact />
        }
        else { return <Signup /> }
      }} />
    </div>
  );
}

export default App;
