import { React, createContext, useState } from "react";

export const PersonContext = createContext(null);

const PersonProvider = ({children}) => {
    const [secondPerson, setSecondPerson] = useState(null);

    return (
        <PersonContext.Provider value={{secondPerson, setSecondPerson}}>
            {children}
        </PersonContext.Provider>
    )
}

export default PersonProvider;