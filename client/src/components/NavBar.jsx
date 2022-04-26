import React from "react";
import { NavLink,Route } from "react-router-dom";
import s from './NavBar.module.css'
import SearchBar from './SearchBar';
import Filters from './Filtering';


function NavBar(props) {
    var imgLink='https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
     
    return (
        // <div className='NavBar'>
            <nav className={s.container}> 
                <ul >
                    <div className={s.divLinks}>
                    <li className="item" id="homeimg"><NavLink to="/home"
                    style={{ textDecoration: 'none', color: 'aliceblue'}}>HOME!
                    </NavLink></li>

                    <li className="item"><NavLink to="/create"
                     style={{ textDecoration: 'none', color: 'aliceblue' }}> Create your Pokemon!</NavLink></li>

                    <li className="item"><NavLink to="/about"
                     style={{ textDecoration: 'none', color: 'aliceblue'}}>About us</NavLink></li>
                    </div>
                    <div className={s.divFilters}>
                    
                    <Route exact path="/home" >
                     <li className='item'> <SearchBar></SearchBar></li>
                    </Route>
                    

                    <Route exact path="/home" >
                     <li className='item'> <Filters></Filters></li>
                    </Route>
                    </div>
                    
                    
                </ul>
        
            </nav>

        // </div>
    )



}

export default NavBar