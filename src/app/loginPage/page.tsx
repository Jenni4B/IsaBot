'use client';

import React from 'react';
import NavBar from '../components/navbar';
import { loggingIn } from '../auth/loggingIn';
import { useAuth } from '../context/AuthContext';
import { AuthProvider } from '../context/AuthContext';

// Login page component: handles form submission, prevents default behavior,
// retrieves username and password, and calls the loggingIn function.
const LoginPage = () => {
    const { login } = useAuth();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        loggingIn(form);
        login(); // Call the login function from AuthContext
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-1 items-center justify-center">
                <AuthProvider>
                    <form
                        onSubmit={handleSubmit}
                        className="p-12 rounded shadow-md w-full max-w-lg space-y-8"
                    >
                        <div>
                            <label htmlFor="username" className="block mb-2 text-lg font-medium text-white">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-lg font-medium text-white">
                                Password:
                            </label>
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

                </AuthProvider>
            </div>
        </div>
    );
};

export default LoginPage;
