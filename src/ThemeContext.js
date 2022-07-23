import React, { useContext, useState } from 'react'

export const ThemeContext = React.createContext()
export const ThemeUpdateContext = React.createContext()


export function useTheme() {
    return {
        theme: useContext(ThemeContext),
        themeUpdate: useContext(ThemeUpdateContext),
    }
}

export default function ThemeProvider({ children }) {

    const [darkTheme, setDarkTheme] = useState(true)

    function toggleTheme() {
        setDarkTheme(prev => !prev)
        console.log('toggle', darkTheme)
    }

    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}
