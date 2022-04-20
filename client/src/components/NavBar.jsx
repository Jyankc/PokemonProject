import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css'
import SearchBar from './SearchBar';

function NavBar(props) {
    var imgLink='https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
     
    return (
        // <div className='NavBar'>
            <nav > 
                <ul>
                    <li className="item" id="homeimg"><NavLink to="/home">HOME!</NavLink></li>

                    <li className="item"><NavLink to="/create"> Create your Pokemon!</NavLink></li>

                    <li className="item"><NavLink to="/about">About us</NavLink></li>
                    
                    
                    <li className='item'><SearchBar></SearchBar></li>
                    
                    
                    
                </ul>
        
            </nav>

        // </div>
    )



}

export default NavBar