//imports
import { useState, FormEvent } from "react";
import { searchGamesByName } from "../api/searchRAWG";
import { getFavorites } from "../api/favoriteGames-api";
// import { data } from "react-router-dom";
// import GameList from "../components/GameList";
//return code
export default function Home() {

    const [search, setSearch] = useState<string>('');

    const handleInputchange = (e: any) => {
        const { value } = e.target;
        setSearch(value);
    }

    // Function that uses a text input to search for a game from RAWG
    const searchForGames = async (event: FormEvent, gameTitle: string) => {
        event.preventDefault();
        try {
            const data = await searchGamesByName(gameTitle);
            console.log(data);
        } catch (err) {
            console.error('No matches found!', err);
        }
    }

    // // Function to search all games on RAWG
    // const searchAllGames = async (event: FormEvent) => {
    //     event.preventDefault();
    //     try {
    //         const data = await searchGames();
    //         console.log(data);
    //     } catch (err) {
    //         console.error('No matches found!', err);
    //     }
    // }

    // Function to get favorite games by user_id
    const getUserFavorites = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const data = await getFavorites(1);
            console.log(data);
        } catch (err) {
            console.error('No matches found!', err);
        }
    }

    return (
        <>
        <section>
            <div className="homeBanner">
                <h1>PixelOracle</h1>
                <p>Need a new game? Consult the Oracle...</p>
                {/* background image - simple texture */}
            </div>
            {/* search bar to build rawg request */}
            <form className="searchArea" onSubmit={(event: FormEvent) => searchForGames(event, search)}>
                <input
                    value={search}
                    placeholder="Find a Game!"
                    id="search"
                    onChange={handleInputchange}
                />
                <button type="submit">SEARCH</button>
            </form>
            <form onSubmit={(event: FormEvent) => getUserFavorites(event)}>
                <button type="submit">GET USER 1 FAVORITES</button>
            </form>
            <p>Or pick from the list below!</p>
            {/* <GameList /> */}
        </section>
        </>
    );
}