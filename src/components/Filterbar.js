const Filterbar = (props) => {
    return (
        <form>
            <input type="text" placeholder ="search!"value = {props.filteredSearch} onChange={(e) => props.setFilteredSearch(e.target.value)} />
        </form>
    )
}

export default Filterbar