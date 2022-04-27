import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

function NotFound() {
const myStyle = {
        margin: '20px',
        border: '1px solid black',
        textDecoration: 'none',
        color: 'black',
        backgroundColor:'green'
    }

const myStyleDiv={
backgroundColor: 'gray',
width:'100%',
height:'1000px',
}

    return (
        <>
        <NavBar></NavBar>
        <div style={myStyleDiv}>
            <h1>NOT FOUND!</h1>
            <h2>
                <NavLink to="/home"
                    style={myStyle}>LETS GO BACK TO HOME!
                </NavLink></h2>
        </div>
        </>
    )



}

export default NotFound