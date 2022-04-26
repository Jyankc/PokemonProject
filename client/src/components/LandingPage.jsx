import { Link } from 'react-router-dom'
import React from 'react'
import s from './Landing.module.css'

export default function LandingPage() {

    return (
        <div className={s.landing}>
            <div className={s.image}>
                <p id='p1' >Welcome, do you want to go to the Pokedex?</p>
            <Link to="/home">
                <button type='button' className={s.p2} id='p2 '>YES!</button>
            </Link>
          {/* <img src='./landingtemplate.jpg'></img> */}
            </div>
        </div>
    )

}