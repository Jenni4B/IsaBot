import { useEffect, useState } from "react";

const LoggingIn = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Simulate a login process
        const timer = setTimeout(() => {
            setLoggedIn(true);
            console.log("User logged in successfully");
        }, 2000); // Simulate a 2-second login delay

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);
    
    return (
        <div>
            {loggedIn ? (
                <h1>Welcome back!</h1>
            ) : (
                <h1>Logging in...</h1>
            )}
        </div>
    );
}

export default LoggingIn;