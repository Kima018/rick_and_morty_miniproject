import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';


const CharacterContext = createContext(null);

const CharacterProvider = ({children}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [unknown, setUnknown] = useState(false);
    const [isSearching, setIsSearching] = useState(false)
    const [urlForNextPage, setUrlForNextPage] = useState("");
    const urlSearchCharacters = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
    const urlAllCharacters = "https://rickandmortyapi.com/api/character";

    const fetchCharacters = async (url) => {
        try {
            await axios.get(url).then((data) => {
                if (characters.length === 0) {
                    setCharacters(data.data.results);
                } else {
                    setCharacters(prevState => [...prevState, ...data.data.results]);
                }
                setUrlForNextPage(data.data.info.next);
            });
        } catch (error) {
            throw new Error("Fetch failed!")
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCharactersBySearch = async (url) => {
        try {
            await axios.get(url).then((data) => {
                setCharacters(data.data.results)
                unknown && setUnknown(false);
                isLoading && setIsLoading(false);
            });
        } catch (error) {
            setUnknown(true);
        }
    };

    const handleLoadMore = () => {
        setIsLoading(true);
        fetchCharacters(urlForNextPage);
    };

    useEffect(() => {
        if (searchTerm.trim() !== "") {
            fetchCharactersBySearch(urlSearchCharacters);
            return;
        }
        fetchCharacters(urlAllCharacters);
        setIsSearching(false);
        setUnknown(false);

    }, [searchTerm]);

    let timer;
    const handleSearchChange = (event) => {
        if (unknown) {
            window.alert("No similar characters");
            event.target.value = "";
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            setIsSearching(true);
            setSearchTerm(event.target.value);
        }, 700);
    };


    const contextValue = {
        characters: characters,
        isLoading,
        searchTerm,
        handleSearchChange,
        handleLoadMore,
        isSearching,
    };
    return (
        <CharacterContext.Provider value={contextValue}>
            {children}
        </CharacterContext.Provider>
    );
};

const useCharacterContext = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error("Context not provided");
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export {useCharacterContext, CharacterContext, CharacterProvider};


// code for fetch single character
// const fetchSingleCharacter = async (url) => {
//     try {
//         setIsLoading(true);
//         await axios.get(url).then((data) => {
//             setSingleCharacter(data.data);
//         });
//     } catch (error) {
//         console.error('Error fetching suggestions:', error);
//     } finally {
//         if (singleCharacter.length !== 0) {
//             setIsLoading(false);
//         }
//     }
//
// };