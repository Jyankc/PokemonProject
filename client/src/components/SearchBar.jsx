import React from "react";
import {useHistory} from "react-router-dom";
import s from "./Searchbar.module.css"




function SearchBar(){


const history=useHistory()


const [search, setSearch] = React.useState('')



function handleSearch(e){
setSearch(e.target.value)
}

function handleSubmit(e){
e.preventDefault()
if (search.length===0){
    return alert('Please insert a name or ID')
}
setSearch('')
history.push(`/pokemon/${search}`)


}
return(
        <div className={s.container}>
        <form onSubmit={handleSubmit}>
            <label>Search Pokemons by name or ID </label>
            <input type="search" name='searchbar' value={search} onChange={handleSearch}  />
            <button type='submit' >GO!</button>
        </form>

       

        </div>


 )

}

export default SearchBar;