import React from "react";


function SearchBar(){
    const [search, setSearch] = React.useState('')

function handleSearch(e){
setSearch(e.target.value)
}

function handleSubmit(e){
e.preventDefault()

setSearch('')


}
return(
        <div className='SearchBar'>
        <form onSubmit={handleSubmit}>
            <label>Search Pokemons by name or ID! </label>
            <input type="search" name={search} value={search} onChange={handleSearch} />
            <button type='submit' >Search!</button>
        </form>
        </div>


 )

}

export default SearchBar;