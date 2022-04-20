import React from 'react';

export default function PokerCards(props) {
    var types = props.types
    return (
        <div>
            <h1>{props.name}</h1>
            <img src={props.img}></img>
            {types ? types.map(x =>
                <p className="types">{x}</p>) : "No types"}


        </div>
        
    )

}