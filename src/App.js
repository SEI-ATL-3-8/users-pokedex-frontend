import AllPokemon from './pages/AllPokemon'
import FavPokemon from './pages/FavPokemon'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import {Route, Redirect} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import env from 'react-dotenv';
import {useState, useEffect, useContext} from 'react'
import {UserContext} from './context/UserContext'

function App() {
  const [favPokemon,setFavPokemon] = useState([])
  const [favPokemonNames, setFavPokemonNames] = useState([])
  const {userState, verifyUser } = useContext(UserContext);
  const [user, setUser] = userState;

  useEffect(verifyUser, []);
  // fetch saved pokemon from the database function
  const fetchSavedPokemon = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (userId)
      {
        let response = await axios.get(`${env.BACKEND_URL}/favPokemon`, {
          headers: {Authorization: userId}
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
      }
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
      const userId = localStorage.getItem('userId')
      if(userId)
      {
        let res = await axios.post(`${env.BACKEND_URL}/favPokemon`, {
          name: pokemonName
        }, {
          headers: {Authorization: userId}
        })
        // after every save, refetch all saved pokemon and update
        fetchSavedPokemon()
        // console.log(res)
      }
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
        const userId = localStorage.getItem('userId')
        if(userId)
        {
          let res = await axios.delete(`${env.BACKEND_URL}/favPokemon/${pokemonName}`, {
            headers: {Authorization: userId}
          })
          // console.log(res)
          fetchSavedPokemon()
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="App">
      <Navbar />
      <Route 
        exact path = "/"
        render={() => {
          if (user.id) {
            return <AllPokemon
            savePokemon = {savePokemon} 
            isFave = {isFave}
            deletePokemon ={deletePokemon}
            />
          }
          else
          {
            return <Redirect to="/login"/>
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
        }
        else
        {
          return <Redirect to="/login"/>
        }
      }
        }
      />

      <Route exact path="/signup" render={() => {if (user.id) {return <Redirect to="/favorites"/>} else {return <Signup setUser={setUser} fetchSavedPokemon={fetchSavedPokemon}/>}}}/>

      <Route exact path="/login" render={() => {if (user.id) {return <Redirect to="/favorites"/>} else {return <Login setUser={setUser} fetchSavedPokemon={fetchSavedPokemon}/>}}}/>
      
    </div>
  );
}

export default App;
