// __Ruta de detalle de Pokemon__: debe contener
// - [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
// - [ ] Número de Pokemon (id)
// - [ ] Estadísticas (vida, fuerza, defensa, velocidad)
// - [ ] Altura y peso
import React from "react";
import { getPokemonId, getPokemonName,cleanPokemon} from "../actiontypes/index.js";
import { useDispatch, useSelector } from "react-redux";
import s from './Pokedetails.module.css'

function PokeDetails(props) {
    const dispatch = useDispatch()
    const pokemon = useSelector((state) => state.pokemon)
    const search =props.id
   
   
   
    React.useEffect(() => {
        let result
        if (!(isNaN(Number(search)))){  result=parseInt(search)}
        else {result=search}

        if (typeof (result) === 'number') {
            dispatch(getPokemonId(result));
        }
        else if (typeof (result === 'string') && result.length > 20) { dispatch(getPokemonId(result)) }
        else if (typeof (result === 'string') && result.length < 20) { dispatch(getPokemonName(result)) }
        
        return () => dispatch(cleanPokemon()) }, [] )

    if (pokemon.hasOwnProperty('Error')) {
        return (
            <div className='Poke404'>

                <h1>Error 404 Pokemon not found</h1>
                <img src='https://images.unsplash.com/photo-1610692567145-2c1fe6bf9c3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80'></img>

            </div>
        )
    }
    else {
        const types = pokemon.types
        return (
            <div className={s.PokeDetails}>
                {pokemon &&
                    <div>
                        <div className={s.Pokediv}>
                        <h1>{pokemon.name}</h1>
                        <img src={pokemon.img} />
                        <p><span>HP:</span> {pokemon.hp}</p>
                        <p><span>ATTACK: </span> {pokemon.attack}</p>
                        <p><span> DEFENSE:</span> {pokemon.defense}</p>
                        <p>SPEED: {pokemon.speed}</p>
                        <p>HEIGHT {pokemon.height}</p>
                        <p>WEIGHT {pokemon.weight}</p>
                        <p>{types ? types.map(x =>
                            <span className="types">{x}</span>) : "No types"}</p>
                            



                        <p>ID {pokemon.uuid}{pokemon.id}</p>
                        </div>
                    </div>}





            </div>

        )


    }
}
    export default PokeDetails