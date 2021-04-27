import AllPokemon from './pages/AllPokemon'
import FavPokemon from './pages/FavPokemon'
import Navbar from './components/Navbar'
import { Route, Redirect } from 'react-router-dom'
import './App.css';
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserContext } from './context/userContext';

function App() {
  const [favPokemon, setFavPokemon] = useState([])
  const [favPokemonNames, setFavPokemonNames] = useState([])
  const { userState, fetchUser } = useContext(UserContext)
  const [user, setUser] = userState

  // fetch saved pokemon from the database function
  const fetchSavedPokemon = async () => {
    try {
      let response = await axios.get(`http://localhost:3001/users/${user.id}/allFavpokemons`, {
        headers: {
          Authorization: localStorage.getItem('userId')
        }
      })
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
    fetchUser()
    if (user.id) {
      fetchSavedPokemon()
    }
  }, [user.id])

  const savePokemon = async (pokemonName) => {
    try {
      console.log(localStorage.getItem('userId'));
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}/addFavpokemon`, { name: pokemonName }, {
        headers: {
          Authorization: localStorage.getItem('userId')
        },

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
    try {
      let res = await axios.delete(`http://localhost:3001/favPokemon/${pokemonName}`)
      console.log(res)
      fetchSavedPokemon()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Route
        exact path="/"
        render={() => {
          return user.id ?
            <AllPokemon
              savePokemon={savePokemon}
              isFave={isFave}
              deletePokemon={deletePokemon}
            />
            :
            <Redirect to="/login" />
        }}
      />
      <Route
        exact path="/favorites"
        render={() => {
          return user.id ?
            <FavPokemon
              favPokemon={favPokemon}
              isFave={isFave}
              deletePokemon={deletePokemon}
            />
            :
            <Redirect to="/login" />
        }

        }
      />

      <Route
        exact path="/login"
        render={() =>
          <Login />
        }
      />

      <Route
        exact path="/signup"
        render={() =>
          <Signup />
        }
      />

    </div>
  );
}

export default App;
