import './App.css';
import { NavLink, Route, Routes, Switch } from 'react-router-dom'
import Homepage from './components/Homepage.jsx'
import LandingPage from './components/LandingPage'
import PokeDetails from './components/Pokedetails'
import Pokecreate from './components/Pokecreate'
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import About from './components/About'
import React from 'react';

function App() {
  return (
  
    <div className='App' >
     
      
      
      <Route exact path='/' component={LandingPage} />
      <Route path={["/home", "/about", "/create", "/pokemon"]} component={NavBar} />
      <Route exact path='/home' render={({match})=> <Homepage id={match.params.home}  />}/>
      <Route expact path='/about' component={About}/>
      <Route expact path='/create' component={Pokecreate}/>
      <Route exact path='/pokemon/:id' render={({match})=> <PokeDetails id={match.params.id}  />} />
     
      

    </div>




  );
}

export default App;


// __Ruta principal__: debe contener
// - [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta,
//  es decir solo encontrará al pokemon si se coloca el nombre completo)
// - [ ] Área donde se verá el listado de pokemons. Al iniciar deberá cargar los primeros
// resultados obtenidos desde la ruta `GET /pokemons`
// y deberá mostrar su:
//   - Imagen
//   - Nombre
//   - Tipos (Electrico, Fuego, Agua, etc)
// - [ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
// - [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
// - [ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina.


