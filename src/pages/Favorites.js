import { useEffect, useState, Fragment } from "react";
import DeletePokemon from "../components/DeletePokemon";
import FilterBar from './../components/Filterbar';
import Pokemon from './../components/Pokemon';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const getFavorites = () => {
   
        fetch(`${process.env.REACT_APP_BACKEND_URL}/favPokemon`,{
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('userToken')
            }
        })
        .then(response => response.json())
        .then(data => {
            setFavorites(data.favPokemon)
        });  
    };

    const removeFavoritePokemon = (e, name) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/favPokemon/` + name, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('userToken')
            }
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