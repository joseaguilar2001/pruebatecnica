import React, { createContext, useState, useEffect, useMemo } from "react";
import { PersonasServices } from "../services/personasService"; 

export const PersonasContext = createContext();

const PersonasContextProvider = (props) => {
    const personaService = useMemo(() => new PersonasServices(), []);

    const [ personas, setPersonas ] = useState([]);

    const [ editPersonas, setEditPersonas ] = useState(null);

    useEffect(() => {
        personaService.readAll().then((data) => setPersonas(data));
    }, [personaService, personas]);

    const createPersonas = (persona) => {
        personaService
        .create(persona)
        .then((data) => setPersonas([...personas, data]));
    };

    const deletePersonas = (id) => {
        personaService
        .delete(id)
        .then(() => setPersonas(personas.filter((p) => p.id !== id)));
    };

    const findPersonas = (id) => {
        const personaVar = personas.find((p) => p.id === id);
        setEditPersonas(personaVar);
    }

    const updatePersonas = (persona) => {
        personaService
        .update(persona)
        .then((data) => 
        setPersonas(
            persona.map((p) => (p.id === persona.id ? data: persona))
        ))
        setEditPersonas(null);
    };

    return(
        <PersonasContext.Provider 
        value = {{
            createPersonas, 
            deletePersonas,
            findPersonas, 
            updatePersonas,
            editPersonas,
            personas,
        }}>
            {props.children}
        </PersonasContext.Provider>
    )
}

export default PersonasContextProvider;