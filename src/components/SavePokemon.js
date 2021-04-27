
const SavePokemon =({favorite, name, addFavoritePokemon}) => (
    <div className="icon-large">
    {
    favorite
        ? 
    <span className="icon-star-1"></span>
        :
    <span onClick={(e) => addFavoritePokemon(e, name)} className="icon-star-o click">
    </span>
    }
    </div>
)


export default SavePokemon;