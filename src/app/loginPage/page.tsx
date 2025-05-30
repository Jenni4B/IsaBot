'use client';

import React from 'react';
import NavBar from '../components/navbar';

const loginpage = () => {

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        // Get the username and password input elements from the form by name.
        // Use optional chaining and nullish coalescing to safely extract and trim their values.
        // This ensures both username and password are always strings, even if the inputs are missing.
        const usernameInput = form.elements.namedItem('username') as HTMLInputElement | null;
        const passwordInput = form.elements.namedItem('password') as HTMLInputElement | null;
        const username = usernameInput?.value.trim() ?? '';
        const password = passwordInput?.value.trim() ?? '';
        if (!username || !password) {
            return;
        }
        console.log("Login form submitted");
        window.location.href = "/dashboard"; // Redirect to dashboard after login
    }
    
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-1 items-center justify-center">
                <form 
                    onSubmit={handleLogin}
                    className="p-12 rounded shadow-md w-full max-w-lg space-y-8"
                >
                    <div>
                        <label htmlFor="username" className="block mb-2 text-lg font-medium text-white">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-lg font-medium text-white">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        />
                    </div>
                    <button 
                        type="submit"
                        style={{ backgroundColor: "var(--color-accent)" }}
                        className="w-full text-white py-3 rounded hover:opacity-90 font-sans text-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>           
    )

}

export default loginpage;