import { useEffect, createContext, useState } from "react";
import { fetchDictionary } from "./components/DictionaryAPI";

const WordContext = createContext();

export function WordProvider({children}) {
    const [word, serWord]  = useState("");

    useEffect(() => {
        const fetchKeyboard = async () => {
            const data = await fetchDictionary("keyboard");
            serWord(data[0]);
        };
        fetchKeyboard();
    }, []);

    return (
        <WordContext.Provider value={{word, serWord}}>
            {children}
        </WordContext.Provider>
    )
}

export default WordContext;