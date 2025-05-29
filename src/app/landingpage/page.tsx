'use client';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center flex-1">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to IsaBot</h1>
                <p className="text-lg mb-6">
                    Prepare for progress! And make it double!
                    To protect your time from administration,
                    To unite all check-ins in one location!
                </p>
                <button
                    className="text-white py-2 px-4 rounded hover:opacity-90 font-sans"
                    style={{ backgroundColor: "var(--color-accent, #D0355B)" }}
                    onClick={() => {
                        window.location.href = "/loginPage";
                    }}
                >
                    View Clients
                </button>
            </div>
        </div>
    );
}

export default LandingPage;