//imports
import { Link } from "react-router-dom";

//display function
export default function Header() {
    return (
        <>
        <img className="logo" src="/img/PixelOracle.png" alt="PixelOracle"></img>
        <Link to="/Login">
          <button id="loginButton" type="submit">LOGIN</button>         
        </Link>
        </>
    )
}

