import { Link } from 'react-router-dom'
import React from 'react'

export default function LandingPage() {

    return (
        <div className="Landing">
            <h1>Henry Pokemon</h1>
            <Link to="/home">
                <h2>Take me to the PokeDex!!</h2>
            </Link>
        </div>
    )

}