import {Link} from "react-router-dom";

const ErrorLayout = () => {
    return (
        <section className="flex items-center h-screen p-16 bg-[#3C1E91]">
            <div className="container flex flex-col items-center ">
                <div className="flex flex-col gap-6 max-w-md text-center">
                    <h2 className="font-extrabold text-center text-9xl text-gray-50">
                        Error 404
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-50">Sorry, we couldn't find this page.</p>
                    <Link to={'/'}
                          className="px-8 py-4 text-xl font-semibold rounded bg-purple-600 text-gray-50 hover:text-gray-200 hover:scale-105 transition-all">Back
                        to home</Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorLayout;
