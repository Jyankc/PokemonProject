export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMON_ID = 'GET_POKEMON_ID';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const GET_FILTERED = 'GET_FILTERED';
export const GET_ATTACK_FILTER = 'GET_ATTACK_FILTER';
export const GET_CANCEL_FILTER = 'GET_CANCEL_FILTER';
const URL= process.env.REACT_APP_API || 'https://localhost:3001'

export function getPokemons() {
    return function (dispatch) {
        return fetch(`${URL}/pokemons`)
            .then(data => data.json())
            .then(result => { dispatch({ type: GET_ALL_POKEMONS, payload: result }) })

    }
}

export function getPokemonId(id) {
    return function (dispatch) {
        return fetch(`${URL}/pokemons${id}`)
            .then(data => data.json())
            .then(result => { dispatch({ type: GET_POKEMON_ID, payload: result }) })
    }
}

export function getPokemonName(name) {
    return function (dispatch) {
        return fetch(`${URL}/pokemons?name=${name}`)
            .then(data => data.json())
            .then(result => { dispatch({ type: GET_POKEMON_NAME, payload: result }) })
    }
}

export function getTypes() {
    return function (dispatch) {
        return fetch(`${URL}/pokemons/types`)
            .then(data => data.json())
            .then(result => { dispatch({ type: GET_TYPES, payload: result }) })


    }
}

export function getFiltered(array) {
    return function (dispatch) {
        return dispatch({ type: GET_FILTERED, payload: array })

    }
}



export function cancelFilter(){
    return function(dispatch){
        dispatch({type: GET_CANCEL_FILTER, payload:[] })}
    }
    



