import { createContext, useContext, useEffect, useState } from "react"

const UIContext = createContext();

export const UIProvider = ({ children }) => {

    const [ theme, setTheme ] = useState('light');

    // ✅ Detectar y cargar preferencia inicial
    useEffect(() => {
        // 1. Ver si ya hay algo en localStorage
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.setAttribute("data-theme", storedTheme);
        } else {
            // 2. Si no, usar preferencia del SO
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const systemTheme = prefersDark ? "dark" : "light";
            setTheme(systemTheme);
            localStorage.setItem('theme', systemTheme)
            document.documentElement.setAttribute("data-theme", systemTheme);
        }
    }, []);

    // ✅ Función para alternar
    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const contextValue = {
        theme,
        toggleTheme,
    };

    return (
        <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
    )

}

export const useUI = () => useContext(UIContext);