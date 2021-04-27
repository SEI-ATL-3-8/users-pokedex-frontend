import './App.css';
import axios from 'axios'

import Navbar from './components/Navbar'
import AllPokemon from './pages/AllPokemon'
import FavPokemon from './pages/FavPokemon'
import Signup from './pages/Signup'
import Login from './pages/Login'

import { Route, Redirect } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { GlobalContext } from './context/GlobalContext'

function App() {
  const { userState, fetchUser } = useContext(GlobalContext)
  const [user, setUser] = userState

  const [favPokemon,setFavPokemon] = useState([])
  const [favPokemonNames, setFavPokemonNames] = useState([])

  useEffect(fetchUser, [])

  // fetch saved pokemon from the database function
  const fetchSavedPokemon = async () => {
    try {
      let response = await axios.get('http://localhost:3001/favPokemon', {
        headers: {
          Authorization: user.id
        }
      })
      console.log(response)
      // assign to state of favPokemon
      setFavPokemon(response.data.favPokemon)

      // create an empty array
      let names = []
      // loop through the favorite pokemon array 
      for(let pokemon of response.data.favPokemon) {
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
  },[])

  const savePokemon = async (pokemonName) => {
    try {
      let res = await axios.post('http://localhost:3001/favPokemon', {
        name: pokemonName
      },
      {
        headers: {
          Authorization: user.id
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
    if(favPokemonNames.includes(currentPokemonName)) {
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
        exact path = "/"
        render={() => 
          <AllPokemon
          savePokemon = {savePokemon} 
          isFave = {isFave}
          deletePokemon ={deletePokemon}
          />
        }
      />
      <Route 
      exact path = "/favorites"
      render={() => 
        { user.id ?
          <FavPokemon 
          favPokemon ={favPokemon}
          isFave = {isFave}
          deletePokemon ={deletePokemon}
          />
        :
          <Redirect to="/" />
        }
      }
      />

      <Route exact path="/user/signup">
        { user.id ?
          <Redirect to="/" />
        :
          <Signup />
        }
      </Route>

      <Route exact path="/user/login">
        { user.id ?
          <Redirect to="/" />
        :
          <Login />
        }
      </Route>
      
    </div>
  );
}

export default App;
