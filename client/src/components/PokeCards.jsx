import React from 'react';
import s from './PokeCards.module.css'
import { useHistory } from "react-router-dom";
export default function PokerCards(props) {
    var img404='https://images.unsplash.com/photo-1610692567145-2c1fe6bf9c3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80'
    var types = props.types
    const history= useHistory()

    
    if (props.data){
        return (
            <div className={s.notFound} >
                <h1>{props.data}</h1>
                <img src={img404}></img>
            
            
            
            </div>
        )

    }
    else{

        const redirect= props.name

        function handleClick(e){
            history.push(`/pokemon/${redirect}`)


        }

        return(

           
        <div className={s.container} >
            <h1>{props.name}</h1>
            <img onClick={handleClick} src={props.img}></img>
            
           <div className={s.types}>
            {types ? types.map(x =>{
                let typecolor
                switch(x){
                    case 'water': typecolor='blue'; break
                    case 'fire':typecolor='red'; break
                    case 'normal': typecolor='grey'; break
                    case 'grass' : typecolor='lime'; break
                    case 'poison': typecolor='purple' ; break
                    case 'fairy' : typecolor='#ff3073' ; break
                    case 'flying': typecolor='cadetblue' ; break               
                    case 'rock': typecolor='beige' ; break               
                    case 'bug': typecolor='green' ; break               
                    case 'ghost': typecolor='brown' ; break               
                    case 'steel': typecolor='silver' ; break               
                    case 'electric': typecolor='yellow' ; break               
                    case 'physic': typecolor='fuchsia' ; break               
                    case 'ice': typecolor='	aqua' ; break               
                    case 'dragon': typecolor='maroon' ; break               
                    case 'dark': typecolor='black' ; break               
                    case 'unknown': typecolor='olive' ; break               
                    case 'fighting': typecolor='crimson' ; break               
                    case 'shadow': typecolor='black' ; break
                    case 'ground':  typecolor='brown' ; break             
                                
                }
                return <span  style={{backgroundColor:typecolor}}>{x}</span>}  ) : 'No types'}
            </div>
            <div className={s.attack}>
            { props.attack? `Attack: ${props.attack} ` : ''} 
            </div>


        </div>
        )
    }
        
    

}