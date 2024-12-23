//imports
import { useState, FormEvent } from "react";
import { gameInfoSlug, searchGamesByName } from "../api/searchRAWG";
import { getFavorites, addFavorites } from "../api/favoriteGames-api";
import { RawgData } from "../interfaces/RawgData";
import RecsPanel from "../components/GameRecs";
// import { data } from "react-router-dom";
// import GameList from "../components/GameList";

//return code
export default function Home() {
    // useState for the RAWG search field
    const [search, setSearch] = useState<string>('');
    const handleInputchange = (e: any) => {
        const { value } = e.target;
        setSearch(value);
    }
    // useState for the Seach by Name field
    const [search1, setSearch1] = useState<string>('');
    const handleInputchange2 = (e: any) => {
        const { value } = e.target;
        setSearch1(value);
    }
    // useState for the Favorite Deletion Field
    const [indexSlug, setIndexSlug] = useState<string>('');
    const handleInputchange1 = (e: any) => {
        const { value } = e.target;
        setIndexSlug(value);
    }
    // useState for the saved user favorites
    const [userFavorites, setUserFavorites] = useState<RawgData[]>([{
        name: '',
        slug: '',
        background_image: '',
        released: ''
    }]);
    // useState for pending changes to the user favorites
    const [newFavorites, setNewFavorites] = useState<RawgData[]>([{
        name: '',
        slug: '',
        background_image: '',
        released: ''
    }]);

    // useState for the rendering of recs page
    const [recMessage, setRecMessage] = useState<string>('Consult the Oracle.');
    const [panel, setPanel] = useState<Boolean>(false);
    const [recPanel, setRecPanel] = useState<JSX.Element>(<></>);

    const recButtonHandler = (e: FormEvent) => {
        e.preventDefault();

        if(panel){
            setPanel(false);
            setRecPanel(<></>);
            console.log('setPanel false');
            setRecMessage('Consult the Oracle.');
        } else {
            setPanel(true);
            setRecPanel(<RecsPanel />);
            console.log('setPanel true');
            setRecMessage('Enough of the Oracle.');
        }
    }

    // Troubleshooting function to display useState for the saved user favorites
    // const viewCurrentFavorites = async (event: FormEvent) => {
    //     event.preventDefault();
    //     console.log(userFavorites)};

    // Troubleshooting function to display useState for pending changes to the user favorites
    const viewNewFavorites = async (event: FormEvent) => {
        event.preventDefault();
        console.log(newFavorites)};

    // Function to convert RAWG data into our custom RawgData type
    const convertRAWG = (event: FormEvent) => {
        event.preventDefault();
        const conversion = [{
            name: `${newFavorites[0].name}`,
            slug: `${newFavorites[0].slug}`,
            background_image: `${newFavorites[0].background_image}`,
            released: `${newFavorites[0].released}`
        }]
        setNewFavorites(conversion);
        console.log('RAWG API reply cleaned to match custom RawgData type format.');
    };

    // Function to concatinate the user favorites with the new favorite selection
    const concatenateFavorites = (event: FormEvent) => {
        event.preventDefault();

        const favoritesArray = [...userFavorites, ...newFavorites]

        console.log(favoritesArray);

        setNewFavorites(favoritesArray);
    };

    // Function that uses a text input to retrieve a game from RAWG by slug
    const searchForGames = async (event: FormEvent, gameTitle: string) => {
        event.preventDefault();
        try {
            const data = await gameInfoSlug(gameTitle);
            console.log(data);
            setNewFavorites([data]);
        } catch (err) {
            console.error('No matches found!', err);
        }
    }

    // Function to search all games on RAWG
    // const searchAllGames = async (event: FormEvent) => {
    //     event.preventDefault();
    //     try {
    //         const data = await searchGames();
    //         console.log(data);
    //     } catch (err) {
    //         console.error('No matches found!', err);
    //     }
    // }

    // Function to retrieve favorite games list by user_id
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

    // Function to locate the index of a specific favorite object and remove it from the array
    const locateRemoveIndex = async (event: FormEvent, slug: string) => {
        event.preventDefault();
        try {
            const resultsIndex = userFavorites.findIndex((element) => (element.slug === `${slug}`));
            console.log(`Flagging favorite at index ${resultsIndex} of array for deletion.`);
            const arrayLeft = userFavorites.slice(0, resultsIndex);
            const arrayRight = userFavorites.slice(resultsIndex+1);
            setNewFavorites([...arrayLeft, ...arrayRight]);
        } catch (err) {
            console.error('No matches found!', err);
        }
    };

    // Function to update the favorite games list on a user profile
    const addNewFavorites = async (event: FormEvent, user_id: number) => {
        event.preventDefault();
        try {
            addFavorites(user_id, newFavorites);
        } catch (err) {
            console.error('No matches found!', err);
        }
    }

    // Function stack above functions to automatically add info to games database
    const addRAWGtoFavorites = async (event: FormEvent, gameTitle: string, user_id: number) => {
        event.preventDefault();
    
        //Search RAWG for game by name
        try {
            const search = await searchGamesByName(gameTitle);
            const userfavs = await getFavorites(1);
            setUserFavorites(userfavs);
            console.log(search);
            const fav = search[0];
            setNewFavorites([fav]);

            const conversion = [{
                name: `${fav.name}`,
                slug: `${fav.slug}`,
                background_image: `${fav.background_image}`,
                released: `${fav.released}`
            }]
            setNewFavorites(conversion);

            const favoritesArray = [...userFavorites, ...[fav]];
            console.log('CONCAT', favoritesArray);
            setNewFavorites(favoritesArray);

        } catch (error) {
            console.error('No Matches Found!', error);
        }

        try {
            addFavorites(user_id, newFavorites);
        } catch (error) {
            console.error('Unable to update Favorites!', error);
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
                <button type="submit">EXACT SLUG SEARCH</button>
            </form>

            <form className="searchArea" onSubmit={(event: FormEvent) => addRAWGtoFavorites(event, search1, 1)}>
                <input
                    value={search1}
                    placeholder="Find a Game!"
                    id="search"
                    onChange={handleInputchange2}
                />
                <button type="submit">Search by Title</button>
            </form>

            <form onSubmit={(event: FormEvent) => getUserFavorites(event)}>
                <button type="submit">RETRIEVE SAVED FAVORITES</button>
            </form>

            <form onSubmit={(event: FormEvent) => convertRAWG(event)}>
                <button type="submit">CONVERT SEARCH DATA</button>
            </form>

            <form onSubmit={(event: FormEvent) => concatenateFavorites(event)}>
                <button type="submit">CONCATENATE FAVORITES</button>
            </form>

            <form onSubmit={(event: FormEvent) => viewNewFavorites(event)}>
                <button type="submit">VIEW PENDING FAVORITES CHANGES</button>
            </form>

            <form onSubmit={(event: FormEvent) => addNewFavorites(event, 1)}>
                <button type="submit">UPDATE FAVORITES LIST</button>
            </form>

            <form className="searchArea" onSubmit={(event: FormEvent) => locateRemoveIndex(event, indexSlug)}>
                <input
                    value={indexSlug}
                    placeholder="Index Slug"
                    id="locateIndex"
                    onChange={handleInputchange1}
                />
                <button type="submit">FLAG FAVORITE FOR REMOVAL</button>
            </form>

            <form onSubmit={(event: FormEvent) => recButtonHandler(event)}>
                <button type="submit">{recMessage}</button>
            </form>

            {recPanel}

            <p>Or pick from the list below!</p>
            {/* <GameList /> */}
        </section>
        </>
    );
}