'use client';

import { useTheme } from "@/app/context/ThemeContext";

const Theme = ()=> {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Theme Settings</h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => setTheme("light")}
                    className={`px-4 py-2 rounded ${theme === "light" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Light Theme
                </button>
                <button
                    onClick={() => setTheme("dark")}
                    className={`px-4 py-2 rounded ${theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Dark Theme
                </button>
            </div>
        </div>
    )
}

export default Theme;