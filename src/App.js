import AllPokemon from './pages/AllPokemon'
import FavPokemon from './pages/FavPokemon'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import {Redirect, Route} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import {useState, useEffect, useReducer} from 'react'

function App() {  
  const [user, setUser] = useState({})  
  const [favPokemon,setFavPokemon] = useState([])
  const [favPokemonNames, setFavPokemonNames] = useState([])
  
  const fetchUser = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/verify`, {
      headers: {
        Authorization: localStorage.getItem('userId')
      }
    })
    .then((response) => { setUser(response.data.user) })
  }
  useEffect(fetchUser, [])

  // fetch saved pokemon from the database function
  const fetchSavedPokemon = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favPokemon`, {
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
  },[user])

  const savePokemon = async (pokemonName) => {
    try {
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favPokemon`, {
        name: pokemonName
      }, {
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
        let res = await axios.delete(`http://localhost:3001/favPokemon/${pokemonName}`, {
          headers: {
            Authorization: user.id
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
      <Navbar user={user} setUser={setUser} />
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
            return <Redirect to="/login" />
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
          return <Redirect to="/login" />
        }
      }}
      />
      <Route 
      exact path = "/signup"
      render={() => {
        if (user.id) {
          return <Redirect to="/" />
        } else {
          return <Signup setUser={setUser} />
        }
      }}
      />
      <Route 
      exact path = "/login"
      render={() => {
        if (user.id) {
          return <Redirect to="/" />
        } else {
          return <Login setUser={setUser} />
        }
      }}
      />
    </div>
  );
}

export default App;
