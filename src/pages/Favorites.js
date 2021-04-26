import { useEffect, useState, Fragment } from "react";
import DeletePokemon from "../components/DeletePokemon";
import FilterBar from './../components/Filterbar';
import Pokemon from './../components/Pokemon';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const getFavorites = () => {
   
        fetch('http://localhost:3001/favPokemon')
        .then(response => response.json())
        .then(data => {
            setFavorites(data.favPokemon)
        });  
    };

    const removeFavoritePokemon = (e, name) => {
        fetch('http://localhost:3001/favPokemon/' + name, {
            method: 'DELETE',
        }).then(getFavorites);
    };

    useEffect(() => {
        setLoaded(false);
        getFavorites();
    }, [])

    useEffect(() => {
        if (!loaded) setLoaded(true);
        setFilteredPokemons(favorites);
    }, [ favorites ]);

    return (
        <div className="container">
             {
             !loaded
              ? 
            <h1>Loading</h1>
                :
            <Fragment>
                 <FilterBar filterPokemons={filteredPokemons} allPokemons={favorites} setFilteredPokemons={setFilteredPokemons}/>
                <div className="card-holder">
                    {filteredPokemons.map(pokemon => (
                        <Pokemon {...pokemon} key={pokemon.name} >
                            <DeletePokemon removeFavoritePokemon={removeFavoritePokemon} name={pokemon.name} />
                        </Pokemon>
                    ))
                    }
                </div>  
            </Fragment>
            }
        </div>
    );
};