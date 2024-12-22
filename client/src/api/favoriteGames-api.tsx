import { RawgData } from "../interfaces/RawgData";
import { UserData } from "../interfaces/UserData";

const getFavorites = async (user_id: number): Promise<UserData> => {
    try {
        const response = await fetch(`/api/users/getFavorites/${user_id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        });
        const data = await response.json();
        if(!response.ok) {
        throw new Error('invalid user ID!');
        }
    
        return data;
    } catch (err) {
        console.log('Error from data retrieval:', err);
        return Promise.reject('No matches for that search criteria');
    }
};

const addFavorites = async (user_id: number ,favorites: RawgData) => {
try {
    const response = await fetch(`/api/users/addFavoriteGames/${user_id}`, {
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        { 
            "favorites": [{
                "name": `${favorites.name}`,
                "slug": `${favorites.slug}`
            }]
        })
    });
    // const data = await response.json();
    if(!response.ok) {
    throw new Error('invalid RAWG API response, check network tab!');
    }

    // return data.results;
} catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('No matches for that search criteria');
}
};

export { getFavorites, addFavorites };