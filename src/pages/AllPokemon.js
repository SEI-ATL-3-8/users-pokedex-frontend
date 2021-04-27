

import axios from 'axios'
import {useEffect, useState} from 'react'
import PokemonList from '../components/PokemonList'
import Filterbar from '../components/Filterbar'
const AllPokemon = (props) => {
    const[allPokemon, setAllPokemon] = useState([])
    const [filteredSearch, setFilteredSearch]= useState('')
    const [filteredResults, setFilteredResults] = useState([])
 

    const fetchAllPokemon = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API}`)
            setAllPokemon(response.data.results)
        } catch (error) {
            console.log(error)
        }
      
    }
    useEffect(() => {
        fetchAllPokemon()
    },[])
    const filter = (term) => {
        let filtered = allPokemon.filter((pokemon) => {
            return pokemon.name.includes(term)
        })
        setFilteredResults(filtered)
    }
    useEffect(() => {
        filter(filteredSearch)
    },[filteredSearch])


    return (
        <div className="allPokemon">
            <h1>All Pokemon</h1>
            <Filterbar 
            filteredSearch ={filteredSearch}
            setFilteredSearch={setFilteredSearch}
            />
            <PokemonList 
                allPokemon = {allPokemon}
                filteredResults = {filteredResults}
                filteredSearch ={filteredSearch}
                savePokemon ={props.savePokemon}
                isFave = {props.isFave}
                deletePokemon={props.deletePokemon}
            />
        </div>
    )
}
export default AllPokemon