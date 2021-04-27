import AllPokemon from './pages/AllPokemon'
import FavPokemon from './pages/FavPokemon'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import {Route} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from './context/UserContext'
import { Redirect } from 'react-router-dom'

function App() {
  const [favPokemon,setFavPokemon] = useState([])
  const [favPokemonNames, setFavPokemonNames] = useState([])

  const {userState, verifyUser} = useContext(UserContext)
  const [user, setUser] = userState


  const fetchSavedPokemon = async () => {
    try {
      const userId = localStorage.getItem('userId')

      let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/favPokemon`, {
        headers: {
          Authorization: userId
        }
      })
      setFavPokemon(response.data.savedPokemon)

      let names = []
      for(let pokemon of response.data.savedPokemon) {
        names.push(pokemon.name)
      }
      setFavPokemonNames(names)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSavedPokemon()
  },[])

  useEffect(() => {
    verifyUser()
  }, [])

  const savePokemon = async (pokemonName) => {
    try {
      const userId = localStorage.getItem('userId')

      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/favPokemon`, {
       name: pokemonName
      }, {
        headers: {
          Authorization: userId
        }
      })
      fetchSavedPokemon()

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
      try {
        const userId = localStorage.getItem('userId')


        let res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favPokemon/${pokemonName}`, {
          headers: {
            Authorization: userId
          }
        })

        fetchSavedPokemon()
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="App">
      <Navbar />
      <div className="container">
          <Route exact path = "/" render = {() => {
            if (user.length > 0) {
              return <Redirect to = '/pokemon' />
            } else {
              return <Home />
            }
          }} />
          <Route path = "/login" render = {() => {
            if (user.length > 0) {
              return <Redirect to = '/pokemon' />
            } else {
              return <Login />
            }
          }} />
          <Route path = "/signup" render = {() => {
            if (user.length > 0) {
              return <Redirect to = '/pokemon' />
            } else {
              return <SignUp />
            }
          }} />
          <Route 
            exact path = "/pokemon"
            render={() => {
              if (user.length > 0) {
                return <AllPokemon
                          savePokemon = {savePokemon} 
                          isFave = {isFave}
                          deletePokemon ={deletePokemon}
                        />
              } else {
                return <Redirect to = '/' />
              }
            }} />

          <Route 
          exact path = "/favorites"
          render={() => {
            if (user.length > 0) {
              return <FavPokemon 
                        favPokemon ={favPokemon}
                        isFave = {isFave}
                        deletePokemon ={deletePokemon}
                      />
            } else {
              return <Redirect to = '/' />
            }
          }} />
      </div>
    </div>
  );
}

export default App;
