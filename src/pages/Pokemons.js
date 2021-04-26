import { Fragment, useEffect, useState } from "react";
import FilterBar from "../components/Filterbar";
import Pokemon from "../components/Pokemon";
import SavePokemon from "../components/SavePokemon";
import InfiniteScroll from 'react-simple-infinite-scroll';

export default function Pokemons() {
    const [allPokemons, setAllPokemons] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    




    const getAllPokemons = () => {
        Promise.all([
            fetch('https://pokeapi.co/api/v2/pokemon').then(response => response.json()),
            fetch('http://localhost:3001/favPokemon').then(response => response.json())
        ])
       .then(data => {
            const allPokemons = data[0].results.map(pokemon => {
              
                const { favPokemon } = data[1];
                
                return {
                    ...pokemon,
                    favorite: favPokemon.some(favP => favP.name === pokemon.name)
                }
            });
            setAllPokemons(allPokemons);
       });
    };


    const addFavoritePokemon = (e,name) => {
        fetch('http://localhost:3001/favPokemon',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        }).then(getAllPokemons);
    }

    useEffect(() => {
        setLoaded(false);
        getAllPokemons();
    },[]);

    useEffect(() => {
        if (!loaded) setLoaded(true);
        setFilteredPokemons(allPokemons);
    },[ allPokemons ]);

    
    return (
        <div className="container">
            {!loaded ? 
            <h1>Loading</h1>
                :
            <Fragment>
                <FilterBar filterPokemons={filteredPokemons} allPokemons={allPokemons} setFilteredPokemons={setFilteredPokemons}/>
                
                <div className="card-holder">
              
                    {filteredPokemons.map((pokemon, index)=> (
                        <Pokemon {...pokemon} key={pokemon.name} >
                                <SavePokemon addFavoritePokemon={addFavoritePokemon} favorite={pokemon.favorite} name={pokemon.name} />
                        </Pokemon>
                    ))}
                  
                </div>  
            </Fragment>
            }
        </div>
    )
};