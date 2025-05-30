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
        // Here I will handle the login logic, and make sure you are authenticated
        // For now, we will just redirect to the dashboard
    }
    
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar />
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
        </div>           
    )

}

export default loginpage;