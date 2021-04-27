import './App.css';
import { Fragment, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Navbar from './headers/Navbar';
import Pokemons from './pages/Pokemons';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WrongPage from './pages/Wrongpage';
import { UserContext } from './context/userContext';
import Home from './pages/Home';

function App() {
  const [userToken] =  useContext(UserContext).userTokenState;

  return (
    <Fragment>
      <Navbar />
      <Switch>  
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/pokemons"> 
          {userToken === null ? <Redirect to="/"/>: <Pokemons />}
        </Route>

        <Route path="/favorites" > 
        {userToken === null ? <Redirect to="/"/>: <Favorites />}
        </Route>

        <Route exact path="/login">
          {userToken === null ? <Login /> :  <Redirect to="/"/> }
        </Route>

        <Route exact path="/signup">
          {userToken === null ? <Signup /> :  <Redirect to="/"/> }
        </Route>

        <Route exact path="/unauthorized">
          <WrongPage />
        </Route>
      </Switch>
 
     
    </Fragment>
  );
}

export default App;
