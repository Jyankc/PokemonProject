import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPokemons, getTypes, getFiltered, cancelFilter } from '../actiontypes/index.js'
import s from './Filtering.module.css'



function Filters() {
    const dispatch = useDispatch()
    const pokemons = useSelector((state) => state)
    const filtered = useSelector((state) => state.filtered)


    React.useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
        // dispatch(getAttackFiltered(pokemons.pokemonAll))
    }, []);

    async function handleFilters(e) {
        e.preventDefault()

        switch (e.target.name) {

            case "types": {
                const pokeTypes = []

                if (e.target.value === '0') {
                    return dispatch(getFiltered([]))

                }

               
                else if (e.target.value !== '0') {
                    pokemons.pokemonAll.map(x => {
                        if (x.types.includes(e.target.value)) { pokeTypes.push(x) }
                        
                    })

                    if (pokeTypes.length === 0) { 
                    pokeTypes.push('No Pokemon matches that type!') }
                
                    return dispatch(getFiltered(pokeTypes))
                
                }
            
                
           

            }

            case "dbApiSort": {
                if (e.target.value === '0') {

                    dispatch(getPokemons())
                }

                else if (e.target.value !== 0) {
                    let pokeTypeSort = []
                    if (e.target.value === "created") {
                        pokemons.pokemonAll.map(x => {
                            if (x.hasOwnProperty('uuid')) { pokeTypeSort.push(x) }
                        })
                    }

                    else {
                        pokemons.pokemonAll.map(x => {
                            if (x.hasOwnProperty('id')) { pokeTypeSort.push(x) }
                        })
                    }



                    if (pokeTypeSort.length === 0) { pokeTypeSort.push('No Pokemon matches that filter!') }
                    return dispatch(getFiltered(pokeTypeSort))
                    // console.log(filtered)
                }
                else return console.log('ERROR')

            }

            case "abcSort": {
                let abcSort = [...pokemons.pokemonAll]
                let abcSort2 = [...abcSort]

                if (e.target.value === '0') {
                    dispatch(getFiltered([]))

                }

                else if (e.target.value !== 0) {

                    if (e.target.value === '0') {
                        dispatch(getFiltered([]))

                    }
                    else if (e.target.value === 'AZ') {
                        abcSort2 = abcSort.sort(function (a, b) {
                            const nameA = a.name.toUpperCase();
                            const nameB = b.name.toUpperCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    }
                    else if (e.target.value === 'ZA') {
                        abcSort2 = abcSort.sort(function (b, a) {
                            const nameA = a.name.toUpperCase();
                            const nameB = b.name.toUpperCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    }

                    return dispatch(getFiltered(abcSort2))
                }
                else return (console.log('ERROR EN A-Z'))
            }



            case "attackSort": {
                if (e.target.value === '0') {
                    return dispatch(getFiltered([]))
                }
                else if (e.target.value !== 0) {
                    let attack2
                    if (e.target.value === `weakest`) {
                        attack2 = pokemons.pokemonAll.sort(function (a, b) {
                            if (a.attack < b.attack) {
                                return -1;
                            }
                            if (a.attack > b.attack) {
                                return 1;
                            }
                            return 0;
                        })
                    }
                    else if (e.target.value === 'strongest') {
                        attack2 = pokemons.pokemonAll.sort(function (a, b) {
                            if (a.attack > b.attack) {
                                return -1;
                            }
                            if (a.attack < b.attack) {
                                return 1;
                            }
                            return 0;
                        })
                    }


                    return dispatch(getFiltered(attack2))
                }

            }
            default: console.log('UH LALA')

        }

    }

    function clear(e) {
        e.preventDefault()

        dispatch(cancelFilter())
        console.log(filtered)


    }
    return (
        <div className={s.container}>
            <div className={s.filtering}>
            <label>Sort by type! </label>
            <select id="typeSelec" name="types" onChange={handleFilters}>
                {/* <option id={0} value={null} >All Types </option> */}
                <option id={0} value={0} selected>All Types</option>
                {pokemons.types &&
                    pokemons.types.map((x, i) =>
                        <option id={i + 1} value={x.name} name={`${x.name}`}>{`${x.id} ${x.name}`} </option >

                    )}
            </select>
            </div>


            <div className={s.filtering}>       
            {/* //DB OR API */}
            <label>Sort by Created/API: </label>
            <select id="dbApi" name="dbApiSort" onChange={handleFilters}>
                <option id={0} value={0} selected >Select filter</option>
                <option id={1} value={`created`} name={`created`}  >Created By USER</option>
                <option id={2} value={`imported`} name={`imported`} >Imported by API</option>


            </select>
            </div>
            {/* //ORDEN ALF*/}

            
            <div className={s.filtering}> 
            <label>Sort by A-Z! </label>
            <select id="abcType" name="abcSort" onChange={handleFilters}>
                <option id={0} selected >Select filter</option>
                <option id={1} value={`AZ`} name={`A-Z`} >A-Z</option>
                <option id={2} value={`ZA`} name={`Z-A`} >Z-A</option>


            </select>
            </div>

            {/* //ORDEN FUERZA*/}
            
            <div className={s.filtering}> 
            <label>Sort by Strength! </label>
            <select id="attackSort" name="attackSort" onChange={handleFilters}>
                <option id={0} value={0} name={`none`} selected>Select filter</option>
                <option id={1} value={`strongest`} name={`strongest`}  >Strongest</option>
                <option id={2} value={`weakest`} name={`strongest`} >Weakest</option>
            </select>
            </div> 

                    
            <div className={s.filtering}> 
            <input type="button" name={"clean"} value='CLEAR' onClick={clear} />
            
            </div> 


        </div>

    )




}



export default Filters