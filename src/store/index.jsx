import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {url as urlAllCharacters} from "../utils/urlAllCharacters.js";


const CharacterContext = createContext(null);

const CharacterProvider = ({children}) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [charactersListAll, setCharactersListAll] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [unknown, setUnknown] = useState(false);
    const [isSearching, setIsSearching] = useState(false)
    const [urlForNextPage, setUrlForNextPage] = useState("");
    const [singleCharacterDetails, setSingleCharacterDetails] = useState([]);
    const urlSearchCharacters = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
    // const [state, setState] = useState({
    //     error: false,
    //     unknown: false,
    //     isLoading: true,
    //     isSearching: false,
    //     searchTerm: '',
    //     charactersListAll: [],
    //     info: {},
    // });

    const fetchCharacters = async (url) => {
        try {
            await axios.get(url).then((data) => {
                if (charactersListAll.length === 0) {
                    setCharactersListAll(data.data.results);
                } else {
                    setCharactersListAll(prevState => [...prevState, ...data.data.results]);
                }
                setUrlForNextPage(data.data.info.next);
            });
        } catch (error) {
            setError(true)
            console.error('Error fetching suggestions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        setIsLoading(true);
        fetchCharacters(urlForNextPage);
    };

    const fetchCharactersBySearch = async (url) => {
        try {
            await axios.get(url).then((data) => {
                setCharactersListAll([])
                setCharactersListAll(data.data.results)
               unknown && setUnknown(false);
                isLoading && setIsLoading(false);
            });
        } catch (error) {
            console.log(error);
            setUnknown(true);
        }
    };

    useEffect(() => {
        if (searchTerm.trim() !== "") {
            fetchCharactersBySearch(urlSearchCharacters);
        } else if (searchTerm.trim() === "") {
            setCharactersListAll([])
            fetchCharacters(urlAllCharacters);
            setIsSearching(false);
            setUnknown(false);
        }
    }, [searchTerm]);
    let timer;
    const handleSearchChange = (event) => {
        if (unknown){
            window.alert("No similar characters");
            event.target.value = "";
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
            setIsSearching(true);
            setSearchTerm(event.target.value);
        }, 700);
    };

    const fetchSingleCharacter = async (url) => {
        try {
            setIsLoading(true);
            await axios.get(url).then((data) => {
                setSingleCharacterDetails(data.data);
            });
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            if (singleCharacterDetails.length !== 0) {
                setIsLoading(false);
            }
        }

    };

    const handleSetCharacterId = (id) => {
        const singleCharacterUrl = `https://rickandmortyapi.com/api/character/${id}`;
        fetchSingleCharacter(singleCharacterUrl);
    }


    const contextValue = {
        characters: charactersListAll,
        isLoading,
        searchTerm,
        handleSearchChange,
        handleLoadMore,
        isSearching,
        handleSetCharacterId,
        characterDetails: singleCharacterDetails,
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