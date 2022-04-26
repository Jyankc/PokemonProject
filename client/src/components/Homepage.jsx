// __Pagina inicial__: deben armar una landing page con
// - [ ] Alguna imagen de fondo representativa al proyecto
// - [ ] Botón para ingresar al home (`Ruta principal`)
import React from 'react';
import PokeCards from './PokeCards.jsx'
import Pagination from './Pagination.jsx'
import s from './Homepage.module.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPokemons, getTypes, getFiltered, cancelFilter} from '../actiontypes/index.js'

//no tendria ningun state local ni accede al store en principio
// [ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
// - [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza

// FILTRAR POR TIPO 
// FILTRAR POR EXISTENTE O CREADO
// FILTRAR POR FUERZA ASC Y DESC
// FILTRAR POR ORDEN ALFABETICO ASC Y DESC
// mi objeto tiene ---> pokemonAll, pokemon, y types
function Homepage() {

        
        const dispatch = useDispatch()
        const pokemons = useSelector((state) => state)
        const filtered = useSelector((state) => state.filtered)

        React.useEffect(() => {
                dispatch(getPokemons())
                dispatch(getTypes())
        }, []);
        
        const[page, setPage] =React.useState(1)
        const[amountPage,setAmountPage]= React.useState(12)
        const maxAm= (pokemons.pokemonAll.length/amountPage)
        const maxAmFiltered=(filtered.length/amountPage)
        
        

      if (filtered.length > 0) {
        let data
        if (filtered.includes('No Pokemon matches that type!')) {
                data=filtered[0]
        }
     
               
               
                
                return (
                        <div className={s.container}>
                                 <div className={s.pokeCards}>

                                {filtered&&
                                        filtered
                                        .slice((page-1) * amountPage, ((page-1)*amountPage + amountPage))
                                        .map((x) =>
                                        
                                        <PokeCards
                                        data={data}
                                        
                                        filtered={x.filtered}
                                        key={x.id}
                                        name={x.name}
                                        id={x.id}
                                        img={x.img}
                                        types={x.types}
                                        attack={x.attack}
                                        
                                        />
                                        
                                        )}
                                </div>
                                                
                        
                                
                                <Pagination className={s.pagination} page={page} setPage={setPage} maxAm={maxAm} maxAmFiltered={maxAmFiltered}/>
                               
                        </div>
                )
        }





else if (filtered.length===0){

        return (

                <div className={s.container}>
                         <div className={s.pokeCards}>
                        {pokemons.pokemonAll &&
                                
                                pokemons.pokemonAll
                                .slice((page-1) * amountPage, ((page-1)*amountPage + amountPage))
                                .map((x) =>
                                        
                                        <PokeCards
                                                key={x.id}
                                                name={x.name}
                                                id={x.id}
                                                img={x.img}
                                                types={x.types}
                                                
                                        />
                                       
                                        )}
                        </div>
                                       
                                        <Pagination className={s.pagination} page={page} setPage={setPage} maxAm={maxAm}  maxAmFiltered={maxAmFiltered}/>
                                        
                </div>)                         


}
}


export default Homepage