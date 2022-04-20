export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_POKEMON = 'GET_POKEMON';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';


export function getPokemons() {
    return function (dispatch) {
        return fetch('http://localhost:3001/pokemons')
            .then(data => data.json())
            .then(result => { dispatch({ type: GET_ALL_POKEMONS, payload: result }) })

    }
}

export function getPokemon(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/pokemons/${id}`)
            .then(data => data.json())
            .then(result => { dispatch({ type: GET_POKEMON, payload: result }) })
    }
}

export function getPokemonName(name) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/pokemons?name=${name}`)
            .then(data => data.json())
            .then(result => { dispatch({ type: GET_POKEMON_NAME, payload: result }) })
    }
}

export function createPokemon(ObjInfo) {
    return function(dispatch){
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ObjInfo })
    };
    return fetch('http://localhost:3001/pokemons', reqOptions)
        .then(response => response.json())
        .then(data => { dispatch({ type: CREATE_POKEMON, payload: data }) });

    }   

}


