import './App.css';
import {  Route, Switch, Redirect } from 'react-router-dom'
import Homepage from './components/Homepage.jsx'
import LandingPage from './components/LandingPage'
import PokeDetails from './components/Pokedetails'
import Pokecreate from './components/Pokecreate'
import NotFound from './components/NotFound'
import NavBar from './components/NavBar';
import About from './components/About'
import React from 'react';

function App() {
  return (
    
    <div className='App' >
      <Route  exact path={["/home", "/about", "/create", "/pokemon/:id"]} component={NavBar} />
      <Switch>
      <Route  exact path='/' component={LandingPage} />
      <Route exact path='/home' render={({match})=> <Homepage id={match.params.home}  />}/>
      <Route  path='/about' component={About}/>
      <Route  path='/create' component={Pokecreate}/>
      <Route  path='/pokemon/:id' render={({match})=> <PokeDetails id={match.params.id}  />} />    
      <Route path='*' component={NotFound} />
      </Switch>
      
      

      

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


