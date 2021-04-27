const PokemonList = (props) => {
    return (
        <div> 
            {props.filteredSearch ? 
            props.filteredResults.map((pokemon, i) => (
                <div 
                key ={i}
                className="singlePokemon">
                    <h1>{pokemon.name}</h1>
                    {props.isFave(pokemon.name) ? 
                        <span className="heartOutline" onClick={() => props.deletePokemon(pokemon.name)}>❤️</span>
                        :
                        <span className="heartOutline" onClick={() => props.savePokemon(pokemon.name)}>♡</span>
                    }
                    
                </div>
            ))
            :
            props.allPokemon.map((pokemon,i) => (
                <div 
                key ={i}
                className="singlePokemon">
                    <h1>{pokemon.name}</h1>
                    {props.isFave(pokemon.name) ? 
                        <span className="heartOutline" onClick={() => props.deletePokemon(pokemon.name)}>❤️</span>
                        :
                        <span className="heartOutline" onClick={() => props.savePokemon(pokemon.name)
                        }>♡</span>
                    }
                </div>
            ))
            }
        </div>

    )
}

export default PokemonList