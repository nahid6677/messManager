import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

const ThemToggle = () => {
    const { theme, setTheme } = useContext(AuthContext);
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };
    return (
        <button onClick={toggleTheme} className={`btn rounded-full flex justify-center items-center pb-[2px] pl-[17px] h-10 w-10 ${theme === 'dark' ? 'bg-[#6ac045]' : 'bg-slate-300'}`}>
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemToggle;