import React from "react";
import s from "./pokecreate.module.css"
import { getPokemons, getTypes } from "../actiontypes";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
const local = 'http://localhost:3001/pokemons'
const heroku = 'https://pok3api-back.herokuapp.com/pokemons'


function PokeCreation(props) {
    const history = useHistory()
    const [isLoading, setIsLoading] = React.useState(true)
    const [pokemon, setPokemon] = React.useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        img: "",
        types: []
    });
    const [errors, setErrors] = React.useState({})


    const dispatch = useDispatch()

    const types = useSelector((state) => state.types)

    React.useEffect(() => {
        dispatch(getTypes())
        setIsLoading(false)
    }, [])

    
    React.useEffect(()=>{
        handleErrors()

    },[pokemon])



    async function handleSubmit(e) {
        e.preventDefault()
        console.log(pokemon)



        const crear = await fetch(heroku, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pokemon)

        });
        const respuesta = await crear.json();

        if (respuesta.hasOwnProperty('Error')) {
            alert(respuesta['Error'])
        }
        else {

            const idtoGo = pokemon.name
            setPokemon({
                name: "",
                hp: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                height: 0,
                weight: 0,
                img: "",
                types: []
            })
            history.push(`/pokemon/${idtoGo}`)
        }
    }


    function handleErrors() {

        let errores = {}
        if (!pokemon.name) { errores.name = 'No hay name ingresado' }
        else if (!/^[a-z]+$/.test(pokemon.name) || (pokemon.name.length > 18)) { errores.name = 'el nombre debe ser en minusculas y tener maximo 18 caracteres' }
        if (!pokemon.attack) { errores.attack = 'No hay value para attack ingresado' }
        else if (pokemon.attack > 999) { errores.attack = 'Attack debe ser menor a 999' }
        if (pokemon.img.length < 6) { errores.img = 'No hay link ingresado' }
        if (!pokemon.types.length) { errores.types = 'Por favor seleccione al menos un tipo de Pokemon' }
        setErrors(errores)





        return errores
    }



    function handleChange(e) {

        if (e.target.name != "name" && e.target.name != "img") {
            setPokemon({ ...pokemon, [e.target.name]: parseInt(e.target.value) })
        }
        else {
            setPokemon({ ...pokemon, [e.target.name]: e.target.value })

        }
      

    }

    function handleChecks(e) {
        const checkedEls = [...pokemon.types];
        const value = e.target.value
        if (e.target.checked === true) {
            const index = checkedEls.findIndex(day => day === value);
            if (index === -1) {
                checkedEls.push(parseInt(value))
            }
            setPokemon({ ...pokemon, types: checkedEls });
        }
        else {
            const filtered = checkedEls.filter(el => el !== parseInt(e.target.value))
            setPokemon({ ...pokemon, types: filtered });


        }

    }

    const myStyle = {
        color: 'red',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        marginLeft: '5px'
    }
    const mandatory = {
        color: 'red',
        fontWeight: 'Bold'
    }

    if (isLoading) {
        return (
            <div className="LOADER">
                <h1>Cargando...</h1>
            </div>
        );
    }
    else {
        return (

            <div className={s.container}>
                <h1> Welcome to the Pokemon Creation Section!</h1>
                <div className={s.form}>
                    <form onSubmit={handleSubmit} action='POST' >
                        <p>
                            <label>Name:</label>

                            <input type="text" name="name" value={pokemon.name} onChange={handleChange} />

                            {<span style={mandatory}> *</span>}
                            {errors.name ? <span style={myStyle} >{errors.name}</span> : null}
                        </p>
                        <p>
                            <label>Hp: </label>
                            <input type="number" name="hp" value={pokemon.hp} onChange={handleChange} /> </p>
                        <p>
                            <label>ATTACK: </label>
                            <input type="number" name="attack" value={pokemon.attack} onChange={handleChange} />

                            {errors.attack ? <span style={myStyle} >{errors.attack}</span> : null}
                            {<span style={mandatory}> *</span>} </p>
                        <p>
                            <label>DEFENSE: </label>
                            <input type="number" name="defense" value={pokemon.defense} onChange={handleChange} /></p>
                        <p>
                            <label>SPEED: </label>
                            <input type="number" name="speed" value={pokemon.speed} onChange={handleChange} /></p>
                        <p>
                            <label>HEIGHT: </label>
                            <input type="number" name="height" value={pokemon.height} onChange={handleChange} /></p>
                        <p>
                            <label>WEIGHT: </label>
                            <input type="number" name="weight" value={pokemon.weight} onChange={handleChange} /></p>

                        <p>
                            <label>INSERT IMAGE LINK</label>
                            {<span className={s.mandatory}>*</span>}
                            <input type="text" name="img" value={pokemon.img} onChange={handleChange} /></p>
                        {errors.img ? <span style={myStyle} >{errors.img}</span> : null}

                        <div>
                            <label>SELECT TYPES</label>
                            {errors.types ? <span style={myStyle} >{errors.types}</span> : null}
                            {<span style={mandatory}> *</span>}
                            {types.map((x, i) =>
                                <p>

                                    <label>{x.name}</label>
                                    <input type="checkbox" name='types' value={x.id} onChange={handleChecks} id={`${i}`} />
                                </p>
                            )}
                        </div>


                        <input type="submit" name="submit" disabled={Object.keys(errors).length === 0 ? false : true} />
                        <p>Obligatory Information (<span style={mandatory}>*</span>) </p>
                    </form>
                </div>
            </div>

        )
    }
}




export default PokeCreation