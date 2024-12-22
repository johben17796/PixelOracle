//imports
import { useState, FormEvent } from "react";
import { gameInfoSlug } from "../api/searchRAWG";
import { getFavorites, addFavorites } from "../api/favoriteGames-api";
import { RawgData } from "../interfaces/RawgData";
// import { data } from "react-router-dom";
// import GameList from "../components/GameList";

//return code
export default function Home() {

    const [search, setSearch] = useState<string>('');
    const handleInputchange = (e: any) => {
        const { value } = e.target;
        setSearch(value);
    }

    const [userFavorites, setUserFavorites] = useState<RawgData>({
        name: '',
        slug: '',
        background_image: '',
        released: ''
    });

    const [newFavorites, setNewFavorites] = useState<RawgData>({
        name: '',
        slug: '',
        background_image: '',
        released: ''
    });

    // Troubleshooting functions to display useStates
    const viewCurrentFavorites = async (event: FormEvent) => {
        event.preventDefault();
        console.log(userFavorites)};
    const viewNewFavorites = async (event: FormEvent) => {
        event.preventDefault();
        console.log(newFavorites)};

    // Function to convert RAWG data into our custom RawgData type
    const convertRAWG = (event: FormEvent) => {
        event.preventDefault();
        const conversion = {
            name: `${newFavorites.name}`,
            slug: `${newFavorites.slug}`,
            background_image: `${newFavorites.background_image}`,
            released: `${newFavorites.released}`
        }
        setNewFavorites(conversion);
    };

    // Function that uses a text input to search for a game from RAWG by slug
    const searchForGames = async (event: FormEvent, gameTitle: string) => {
        event.preventDefault();
        try {
            const data = await gameInfoSlug(gameTitle);
            console.log(data);
            setNewFavorites(data);
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
            setUserFavorites(data);
        } catch (err) {
            console.error('No matches found!', err);
        }
    }

    // Function to add favorite games to a user profile
    const addNewFavorites = async (event: FormEvent, user_id: number) => {
        event.preventDefault();
        try {
            addFavorites(user_id, newFavorites);
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

            <form onSubmit={(event: FormEvent) => viewCurrentFavorites(event)}>
                <button type="submit">VIEW CURRENT USER FAVORITES</button>
            </form>

            <form onSubmit={(event: FormEvent) => convertRAWG(event)}>
                <button type="submit">CONVERT DATA</button>
            </form>

            <form onSubmit={(event: FormEvent) => viewNewFavorites(event)}>
                <button type="submit">VIEW FAVORITES TO BE ADDED</button>
            </form>

            <form onSubmit={(event: FormEvent) => addNewFavorites(event, 1)}>
                <button type="submit">ADD NEW FAVORITES</button>
            </form>

            <p>Or pick from the list below!</p>
            {/* <GameList /> */}
        </section>
        </>
    );
}