'use client';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to IsaBot</h1>
            <p className="text-lg">
                Prepare for progress! And make it double!
                To protect your time from administration,
                To unite all check-ins in one location!
            </p>
            <button
                className="text-white py-2 px-4 rounded hover:opacity-90 font-sans"
                style={{ backgroundColor: "var(--color-accent, #D0355B)" }}
                onClick={() => {
                    window.location.href = "/dashboard";
                }}
            >
                View Clients
            </button>
        </div>
    );
}

export default LandingPage;