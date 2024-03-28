import axios from "axios";

export const singleCharacterLoader = async ({params}) => {
    const id = params.characterId;
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}