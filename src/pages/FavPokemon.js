import PokemonList from '../components/PokemonList'
const FavPokemon = (props) => {
    return (
        <div>
            <h1>Favorite Pokemon</h1>
            <PokemonList 
            allPokemon={props.favPokemon}
            isFave = {props.isFave}
            deletePokemon ={props.deletePokemon}
            />
        </div>
    )
}
export default FavPokemon