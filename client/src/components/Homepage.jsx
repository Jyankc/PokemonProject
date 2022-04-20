// __Pagina inicial__: deben armar una landing page con
// - [ ] Alguna imagen de fondo representativa al proyecto
// - [ ] Botón para ingresar al home (`Ruta principal`)
import React from 'react';
import PokeCards from './PokeCards.jsx'
import NavBar from './NavBar';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPokemons } from '../actiontypes/index.js'

//no tendria ningun state local ni accede al store en principio
function Homepage(props) {

        const dispatch = useDispatch()
        const pokemons = useSelector((state) => state.pokemonAll)
        React.useEffect(() => dispatch(getPokemons()), []);



        return (
                <div className='Homepage'>
                <NavBar id={props.id} ></NavBar>
                        <div>
                                <label >Search Pokemons!:</label>
                                <input type="search" name="name" />
                                <button>Search</button>
                        </div>

                        {pokemons && pokemons.map((x) =>
                                <PokeCards
                                        key={x.id}
                                        name={x.name}
                                        id={x.id}
                                        img={x.img}
                                        types={x.types}




                                />)}



                </div>)


}


export default Homepage