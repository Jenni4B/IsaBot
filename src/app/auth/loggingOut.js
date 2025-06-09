
export const LoggingOut = () => {
    const handleLogout = () => {
        console.log("Logging out...");
        // Simulate logout process
        setTimeout(() => {
            console.log("User logged out successfully");
            window.location.href = "/login"; // Redirect to login page
        }, 2000);
    };

    return (
        <div>
            <h2>Logging Out</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}