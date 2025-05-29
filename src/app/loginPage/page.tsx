'use client';
import React from 'react';
import NavBar from '../components/navbar';

const loginpage = () => {

    const handleLogin = (event: React.FormEvent) => {
        console.log("Login form submitted");
    }
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex flex-col items-center flex-1 p-1">
                <h1> Login</h1>
                <form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )

}

export default loginpage;