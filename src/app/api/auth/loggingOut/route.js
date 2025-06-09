import React, { useEffect } from 'react';

const LoggingOut = () => {
    useEffect(() => {
        // Simulate a logout process
        const timer = setTimeout(() => {
            console.log("User logged out successfully");
            // Redirect to login page or perform any other action
        }, 2000); // Simulate a 2-second logout delay

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    return (
        <div>
            <h1>Logging out...</h1>
        </div>
    );
}

export default LoggingOut;