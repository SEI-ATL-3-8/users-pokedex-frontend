import pokeballLogo from '../pokeball.png';

const Pokemon = ({name, favorite, children}) => (
    <div className="col">
        <div className="card">
            <h2>{name.toUpperCase()}</h2>
            <img src={pokeballLogo} alt="PokeBall" />
            { children }
        </div>
    </div>
);

export default Pokemon;