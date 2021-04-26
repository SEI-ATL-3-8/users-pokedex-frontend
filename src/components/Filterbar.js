import { useState, useEffect } from 'react';

function FilterBar ({setFilteredPokemons, allPokemons, filteredPokemons }) {
    const [filterText, setFilterText] = useState('');

    const handleFilterChange = e => {
        const { value } = e.target; 
        setFilterText(value);
    };

    const filterPokemons = () => {
        const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.includes(filterText.toLowerCase()));
      
        setFilteredPokemons(filteredPokemons);
    }



    useEffect(() => {
        filterPokemons();
      }, [ filterText ]);

      
  
    return (
    <div className="filter-bar">
           <input 
           type="text" 
           onChange={handleFilterChange} 
           value={filterText}
           placeholder="Filter By Text"
           />
    </div>
    );
};  


export default FilterBar;