'use client';
import React from 'react';
import NavBar from '../components/navbar';

const loginpage = () => {

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const usernameInput = form.elements.namedItem('username') as HTMLInputElement | null;
        const passwordInput = form.elements.namedItem('password') as HTMLInputElement | null;
        const username = usernameInput?.value.trim() ?? '';
        const password = passwordInput?.value.trim() ?? '';
        if (!username || !password) {
            return;
        }
        
        console.log("Login form submitted");
        console.log("Username:", username);
        console.log("Password:", password);
        window.location.href = "/dashboard"; // Redirect to dashboard after login
    }
    
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-1 items-center justify-center">
                <form 
                    onSubmit={handleLogin}
                    className="p-8 rounded shadow-md w-full max-w-sm space-y-6"
                >
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit"
                        style={{ backgroundColor: "var(--color-accent, #D0355B)" }}
                        className="w-full text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>           
    )

}

export default loginpage;