import './App.css';
import { Fragment } from 'react';
import { Route, Switch } from 'react-router';

import Navbar from './headers/Navbar';
import Pokemons from './pages/Pokemons';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>  
        <Route exact path="/"> 
          <Pokemons />
        </Route>

        <Route path="/favorites" > 
          <Favorites />
        </Route>
      </Switch>
 
     
    </Fragment>
  );
}

export default App;
