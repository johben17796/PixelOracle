export const getRec = async () => {
    try {
        const response = await fetch('/api/Gemini')
            
        const data = await response.json();

        // if (response.ok) {
        //     throw new Error('Invalid API Response - FSAPIROUTE - GEMINIFETCH1');
        // };

        return data;
    } catch (error) {
        console.log('Error - FSAPIROUTE - GEMINIFETCH2', error);
        return [{ title: '', summary: '' }, { title: '', summary: '' }, { title: '', summary: '' }];
    }
};