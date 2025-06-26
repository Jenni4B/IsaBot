'use client';

import React from 'react';

import { loggingIn } from '../auth/login/loggingIn';
import PublicRoute from '../auth/PublicRoute';
import { useAuth, AuthProvider } from '../context/AuthContext';
import { useLoginWTimeout } from '../hooks/useLoginWTimeout';

// Login page component: handles form submission, prevents default behavior,
// retrieves username and password, and calls the loggingIn function.
const LoginPage = () => {
    
    const { login } = useAuth();
    const [error, setError] = React.useState<string | null>(null);
    const { loginWTimeout } = useLoginWTimeout(); // 10 seconds timeout

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        
        const result = await loginWTimeout(event.currentTarget, loggingIn);
        if (result && 'token' in result && typeof result.token === 'string' && result.token) {
            login(result.token); // Store JWT in context and localStorage
            // Redirect or update UI
        } else if (result && 'error' in result && result.error) {
            setError(result.error);
        } else {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 items-center justify-center">
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
                    {error && (
                        <div className="mt-4 text-red-500 text-center">{error}</div>
                    )}      
                </form>
            </div>
        </div>
    );
};

export default function LoginPageWithProvider() {
    return (
        <AuthProvider>
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        </AuthProvider>
    );
}