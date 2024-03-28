import {useGlobalContext} from "../store";
import {Link} from "react-router-dom";

const HomeFeed = () => {
    const {characters, handleLoadMore, isLoading} = useGlobalContext();
    return (
        <>
            {
                !isLoading && <section className="w-full h-[95vh]">
                    <h1 className="mb-3 text-3xl">Characters</h1>
                    <div className="w-full h-[82vh] overflow-hidden">
                        <div className="overflow-y-auto h-full flex flex-col justify-start">
                            {characters.map((character) => {
                                return <Link to={`singleCharacter/${character.id}`} key={character.id}
                                             className="py-5 mb-5">
                                    <article className="w-full flex flex-row items-start justify-center md:items-center">
                                        <div
                                            className="overflow-hidden rounded-full w-20 h-20 mr-5 flex items-center justify-center shrink-0 md:w-32 md:h-32">
                                            <img className="w-full h-full object-cover object-center" src={character.image}
                                                 alt={character.name}/>
                                        </div>
                                        <main className="w-full flex flex-col justify-center">
                                            <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
                                            <div className="flex justify-start gap-3 flex-wrap md:gap-8">
                                                <div>
                                                    <label className="text-gray-400">Species</label>
                                                    <h5 className="text-lg">{character.species}</h5>
                                                </div>
                                                <div>
                                                    <label className="text-gray-400">Origin</label>
                                                    <h5 className="text-lg">{character.origin.name}</h5>
                                                </div>
                                                <div>
                                                    <label className="text-gray-400">Location</label>
                                                    <h5 className="text-lg">{character.location.name}</h5>
                                                </div>
                                            </div>
                                        </main>
                                    </article>
                                </Link>
                            })}
                            <div className="py-4 flex justify-center">
                                <button onClick={handleLoadMore} type="button"
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Load more
                                </button>
                            </div>
                        </div>

                    </div>

                </section>
            }
        </>

    )
        ;
}

export default HomeFeed;
