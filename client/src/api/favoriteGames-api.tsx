import { RawgData } from "../interfaces/RawgData";

const getFavorites = async (user_id: number) => {
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

const addFavorites = async (user_id: number , newFavorites: RawgData[]) => {
    // console.log({"favorites": newFavorites});
    console.log(`Updating Favorites List.`);
try {
    const request = await fetch(`/api/users/addFavoriteGames/${user_id}`, {
    headers: {
        'Content-Type': 'application/json',
    },
    method:"PUT",
    body: JSON.stringify({"favorites": newFavorites})
    });
    if(!request.ok) {
    throw new Error('invalid RAWG API response, check network tab!');
    }
} catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('No matches for that search criteria');
}
};

export { getFavorites, addFavorites };