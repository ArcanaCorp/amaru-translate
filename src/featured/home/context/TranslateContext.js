import { createContext, useContext, useState } from "react";
import { translate } from "../functions/translate";

const TranslateContext = createContext();

export const TranslateProvider = ({ children }) => {

    const [ texto, setTexto ] = useState('');
    const [ translation, setTranslation ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ messages, setMessages ] = useState([]);

    const handleChangeText = (txt) => setTexto(txt)

    const handleTranslation = (txt) => {

        try {
            
            setLoading(true);

            setMessages((prev) => [
                ...prev,
                { type: "me", text: txt }
            ]);

            const data = translate(txt);

            if (!data.ok) {
                setMessages((prev) => [
                    ...prev,
                    { type: "response", text: data.message }
                ]);
                return data;
            }
                
            setTranslation(`<b>${data.translate}</b>`)
            setMessages((prev) => [
                ...prev,
                { type: "response", text: data.translate }
            ]);
            return data;

        } catch (error) {
            const errorMessage = `Hubo un error interno: ${error.message}`;
            setMessages((prev) => [
                ...prev,
                { type: "response", text: errorMessage }
            ]);
            return { ok: false, message: errorMessage, data: null, error: error, code: 500 }
        } finally {
            setTexto('')
            setLoading(false)
        }
    }

    const contextValue = {
        texto,
        translation,
        loading,
        messages,
        handleChangeText,
        handleTranslation
    }

    return (
        <TranslateContext.Provider value={contextValue}>{children}</TranslateContext.Provider>
    )

}

export const useTranslate = () => useContext(TranslateContext);