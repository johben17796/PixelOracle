const fetchFavs = async () => {
    try{
        const response = await fetch('/api/games/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Invalid API Response - FSAPIROUTE - FAVSFETCH');
        };

        return data
    }catch (error) {
        console.log('ERROR - FSAPIROUTE - FAVSFETCH');
        return '';
    }
}

// const addFav = async () => {
    // TODO: add function to POST the correct data using the route (ben note: make sure the path is right)
// }

// const removeFav = async () => {
    // TODO: add function to DELETE the correct one using the route (it takes the id)
// }


export { fetchFavs }