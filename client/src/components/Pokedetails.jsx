// __Ruta de detalle de Pokemon__: debe contener
// - [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
// - [ ] Número de Pokemon (id)
// - [ ] Estadísticas (vida, fuerza, defensa, velocidad)
// - [ ] Altura y peso
import React from "react";
import { getPokemon, getPokemonName } from "../actiontypes/index.js";
import { useDispatch, useSelector } from "react-redux";

function PokeDetails(props) {
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.pokemon)
    
    React.useEffect(() => {
        if (typeof(props.id)==='number' || props.id.length>20) {
          return dispatch(getPokemon(props.id));
        }
        else return  dispatch(getPokemonName(props.id),)
    },[])


    const types = pokemon.types
    return (
        <div className="PokeDetails">
            {pokemon &&
                <div>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.img} />
                    <p>HP: {pokemon.hp}</p>
                    <p>ATTACK: {pokemon.attack}</p>
                    <p>DEFENSE: {pokemon.defense}</p>
                    <p>SPEED: {pokemon.speed}</p>
                    <p>HEIGHT {pokemon.height}</p>
                    <p>WEIGHT {pokemon.weight}</p>
                    <p>{types ? types.map(x =>
                    <span className="types">{x}</span>) : "No types"}</p>
                    

                
                    <p>ID {pokemon.id}</p>
                </div>}





        </div>

    )


}

export default PokeDetails