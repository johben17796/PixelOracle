//imports

import NavBar from "./Nav";
//import Login from "./pages/Login";
import { Link } from "react-router-dom";

//display function
export default function Header() {
    return (
        <>
        <img className="logo" src="/img/PixelOracle.png" alt="PixelOracle"></img>
        <NavBar />
        <Link to="/Login">
          <button id="loginButton" type="submit">LOGIN</button>         
        </Link>
        </>
    )
}

