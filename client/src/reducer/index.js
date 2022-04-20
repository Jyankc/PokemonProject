import { CREATE_POKEMON, GET_ALL_POKEMONS, GET_POKEMON, GET_POKEMON_NAME} from "../actiontypes";
import React from "react";
import { Reducer } from "react";


const initialState = {
    pokemonAll: [],
    pokemon: {}
}

const rootReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POKEMONS: {
            return { ...state, pokemonAll: action.payload }
        }

        case GET_POKEMON: {

            return { ...state, pokemon: action.payload }
        }

        case GET_POKEMON_NAME: {

            return { ...state, pokemon: action.payload }
        }

        case CREATE_POKEMON: {
            return { ...state, pokemonAll: [...state.pokemonAll, action.payload] }
        }


        default: return state


    }


}
export default rootReducer