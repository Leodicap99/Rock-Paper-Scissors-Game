import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useState, useEffect } from "react";
import { darkTheme, lightTheme } from "./Theme";
const ThemeContext = createContext();
export const useTheme=()=>useContext(ThemeContext);
export const ThemeProviderComponent = ({children}) =>{
    const [darkMode,setDarkMode] = useState(()=>{
        const savedTheme = JSON.parse(sessionStorage.getItem('darkMode'));
        return savedTheme;
    });
    useEffect(()=>{
        sessionStorage.setItem("darkMode", JSON.stringify(darkMode));
    },[darkMode]);
    const theme = darkMode? darkTheme: lightTheme;
    const toggleTheme = () =>{
        setDarkMode(prevTheme=>!prevTheme);
    };
    return (
        <ThemeContext.Provider value={{darkMode,toggleTheme}}>
            <ThemeProvider theme={theme}>
                <CssBaseline></CssBaseline>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
