import React from "react";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PersonasContextProvider from "../context/PersonasContext";
import List from '../components/personas/personasList';

function PersonasScreen () {
    return (
        <div className="PersonasScreen">
            <PersonasContextProvider>
                <List />
            </PersonasContextProvider>
        </div>
    );
}

export default PersonasScreen;