import HomeFeed from "../components/HomeFeed.jsx";
import {useCharacterContext} from "../store";
import Spinner from "../components/Spinner.jsx";

const Home = () => {
    const {
        isLoading,
        searchTerm,
        handleSearchChange,
    } = useCharacterContext();


    return (
        <div className="w-full h-screen overflow-hidden flex flex-col justify-start items-center bg-[#F0F0F5]">
            <div
                className="w-full px-8 pt-8 flex flex-col justify-start items-center md:max-w-3xl lg:max-w-4xl lg:px-14 bg-white">
                <div className="relative w-full h-[5vh] mb-4">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search"
                           className="bg-[#F0F0F5] text-gray-500 text-sm focus:border-none  w-full ps-10 p-2.5  "
                           placeholder="Search character..."
                           defaultValue={searchTerm}
                           onChange={handleSearchChange}
                    />
                </div>
                {isLoading ?
                    <Spinner/> :
                    <HomeFeed/>
                }
            </div>

        </div>
    );
}

export default Home;
