//imports

import NavBar from "./Nav";

//display function
export default function Header() {
    return (
        <>
        <img className="logo" src="/img/PixelOracle.png" alt="PixelOracle"></img>
        <NavBar />
        <button id="loginButton" type="submit">LOGIN</button>
        </>
    )
}