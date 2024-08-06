import { createContext, useState, useEffect } from "react";
const ThemeContext = createContext('light');

export const ThemeProvider = ({children} ) =>{
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';

    });

    useEffect(( ) =>{
        localStorage.setItem('theme', theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};
export default ThemeContext;