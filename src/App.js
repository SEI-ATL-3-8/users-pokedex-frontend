import AllPokemon from './pages/AllPokemon'
import FavPokemon from './pages/FavPokemon'
import Navbar from './components/Navbar'
import {Route, Redirect} from 'react-router-dom'
import './App.css';
import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import {UserContext} from './context/userContext'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
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
      <Navbar user={user} setUser={setUser} />

      <Route 
        path="/"
        exact
        component={Home}
      />

      <Route 
        path="/signup"
        render={()=>{
          if(user.id) {
            return <Redirect to ="/pokemon" />
          } else{
            return <Signup setUser={setUser} />
          }
        }}
      />      

      <Route 
        path="/login"
        render={()=>{
          if(user.id){
            return <Redirect to="/pokemon" />
          }else{
            return <Login setUser={setUser} />
          }
        }}
      />


      <Route 
        exact path = "/pokemon"
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
        <FavPokemon 
        favPokemon ={favPokemon}
        isFave = {isFave}
        deletePokemon ={deletePokemon}
        />
        }
      />
      
    </div>
  );
}

export default App;
