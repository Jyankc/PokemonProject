import React from "react";
import "./pokecreate.css"
import { createPokemon } from "../actiontypes";
import { useDispatch } from 'react-redux'


function PokeCreation(props) {

    const [pokemon, setPokemon] = React.useState({
        name: "",
        hp: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
        img: "",
        types: []
    });

    const [types, setTypes] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(true);

    const dispatch = useDispatch()
    React.useEffect(() => {
        fetch('http://localhost:3001/pokemons/types')
            .then(data => data.json())
            .then(result => {
                setTypes(result)
                setIsLoading(false)
            }).catch(err => err.json("Something went wrong"))
    }, [])


    function handleSubmit(e) {
        e.preventdefault()
        dispatch(createPokemon(pokemon))

    }

    function handleChange(e) {
        setPokemon({ ...pokemon, [e.target.name]: e.target.value })
    }

    function handleChecks(e) {
        const checkedEls = [...pokemon.types];
        const value = e.target.value
        if (e.target.checked===true){
            const index = checkedEls.findIndex(day => day === value);
            if (index === -1) {
             checkedEls.push(value)}
        
        setPokemon({ ...pokemon, types: checkedEls });
        }
        else if (e.target.checked===false) {    
        const filtered=checkedEls.filter(el=>el !==e.target.value)
        setPokemon({ ...pokemon, types: filtered});






        }
    }





    if (isLoading) {
        return (
            <div className="LOADER">
                <h1>Cargando...</h1>
            </div>
        );
    }

    else return (

        <div className="PokeCreation">
            <div> Welcome to the Pokemon Creation Section!</div>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>Name:
                            <input type="text" name="name" value={pokemon.name} onChange={handleChange} />
                        </label>
                    </p>
                    <p>
                        <label>Hp: </label>
                        <input type="number" name="hp" value={pokemon.hp} onChange={handleChange} /> </p>
                    <p>
                        <label>ATTACK: </label>
                        <input type="number" name="attack" value={pokemon.attack} onChange={handleChange} /></p>
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
                        <input type="text" name="img" value={pokemon.img} onChange={handleChange} /></p>

                    <div>
                        <label>SELECT TYPES</label>
                        {types.map( (x ,i) =>
                            <p>
                                <input type="checkbox" name={`${x.name}`} value={x.name} onChange={handleChecks} id={`${i}`} />
                                <label>{x.name}</label>
                            </p>
                        )}
                    </div>


                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>

    )

}




export default PokeCreation