import {IoIosArrowBack} from "react-icons/io";
import axios from "axios";
import {useLoaderData, useNavigate} from "react-router-dom";


const SingleCharacter = () => {
    const navigate = useNavigate();
    const characterDetails = useLoaderData();

    return (
        <>
            <section
                className="w-full h-screen overflow-hidden flex flex-col items-center justify-start relative  pt-10 md:pt-24">
                <div className="w-full  h-44 bg-[#3C1E91] absolute top-0 left-0 z-0 md:h-40"></div>
                <button onClick={() => navigate(-1)}
                        className="absolute z-50 text-white top-5 left-5 flex justify-center items-center">
                    <IoIosArrowBack/> <span>Back</span></button>

                <main className=" px-3 flex flex-col justify-start relative z-50 mt-4">
                    <header className="mb-10 md:mb-5">
                        <div className="flex justify-start items-center md:items-start">
                            <div
                                className="overflow-hidden rounded-full w-24 h-24 mr-5 flex items-center justify-center shrink-0 border-4 border-white ">
                                <img className="w-full h-full object-cover object-center"
                                     src={characterDetails.image}
                                     alt={characterDetails.name}/>
                            </div>
                            <h1 className="text-3xl font-semibold text-white text-wrap">{characterDetails.name}</h1>
                        </div>
                    </header>
                    <div className="flex flex-col gap-5">
                        <h3 className="text-xl md:text-2xl">Character info</h3>
                        <div className="flex flex-row gap-5 md:gap-10">
                            <div>
                                <label className="text-gray-400">Species</label>
                                <h5 className="text-lg">{characterDetails.species}</h5>
                            </div>
                            <div>
                                <label className="text-gray-400">Origin</label>
                                <h5 className="text-lg">{characterDetails.origin.name}</h5>
                            </div>
                            <div>
                                <label className="text-gray-400">Location</label>
                                <h5 className="text-lg">{characterDetails.location.name}</h5>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 md:gap-10">
                            <div>
                                <label className="text-gray-400">Status</label>
                                <h5 className="text-lg">{characterDetails.status}</h5>
                            </div>
                            <div>
                                <label className="text-gray-400">Gender</label>
                                <h5 className="text-lg">{characterDetails.gender}</h5>
                            </div>
                        </div>

                        <div className="w-full h-[40vh] overflow-hidden pb-5">
                            <h3 className="text-xl md:text-2xl pb-3">Episodes</h3>

                            <div className="overflow-y-auto h-full flex flex-col justify-start">
                                {characterDetails.episode.map((episode, index) => {
                                    return <h3 key={index}><a href={episode}>{episode}</a></h3>
                                })}

                            </div>
                        </div>
                    </div>
                </main>
            </section>

        </>
    );
}
export default SingleCharacter;
