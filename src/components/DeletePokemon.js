const DeletePokemon = ({name, removeFavoritePokemon}) => (
    <div className="">
         <div className="icon-large">
            <span onClick={(e) => removeFavoritePokemon(e, name)} className="icon-trash-o click" >
            </span>
          
        </div>
    </div>
);

export default DeletePokemon;