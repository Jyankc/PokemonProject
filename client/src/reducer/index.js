import { GET_TYPES, GET_ALL_POKEMONS, GET_POKEMON_ID, GET_POKEMON_NAME, GET_FILTERED, GET_CANCEL_FILTER} from "../actiontypes";
import React from "react";
import { Reducer } from "react";


const initialState = {
    pokemonAll: [],
    pokemon: {},
    types:[],
    filtered:[], //filtrado
}

const rootReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_POKEMONS: {
            return { ...state, pokemonAll: action.payload }
        }

        case GET_POKEMON_ID: {

            return { ...state, pokemon: action.payload }
        }

        case GET_POKEMON_NAME: {

            return { ...state, pokemon: action.payload }
        }

        case GET_TYPES: {
            return { ...state, types: action.payload }
        }
        
        case GET_FILTERED: {
            return { ...state, filtered: action.payload }
        }

 
       
        case GET_CANCEL_FILTER: {
            return { ...state, filtered: action.payload }
        }


        default: return state


    }


}
export default rootReducer