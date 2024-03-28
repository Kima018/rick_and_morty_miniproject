import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {CharacterProvider} from "./store/index.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <CharacterProvider>
        <StrictMode>
            <App/>
        </StrictMode>
    </CharacterProvider>
)
