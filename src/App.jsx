import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./views/HomePage.jsx";
import SingleCharacter from "./views/SingleCharacterPage.jsx";
import {singleCharacterLoader as fetchSingleCharacter} from "./utils/singleCharacterLoader.jsx";
import RootLayout from "./views/RootPage.jsx";
import ErrorLayout from "./views/ErrorPage.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorLayout/>,
        children: [
            {index: true, element: <Home/>},
            {path: 'singleCharacter/:characterId', element: <SingleCharacter/>, loader: fetchSingleCharacter},
        ]
    }
]);
const App = () => {
    return <>
        <RouterProvider router={router}/>
    </>
};
export default App
