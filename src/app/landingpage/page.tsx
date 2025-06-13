'use client';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center flex-1">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to IsaBot</h1>
                <p className="text-lg mb-6">
                    {/* Will change this to a more descriptive text later. I made it like this for funsies*/}
                    IsaBot is your AI-powered assistant for generating and refining ideas.
                    <br />
                    Whether you&apos;re brainstorming new concepts or seeking feedback on existing ones, IsaBot is here to help.
                    <br />
                </p>
                <button
                    className="text-white py-2 px-4 rounded hover:opacity-90 font-sans"
                    style={{ backgroundColor: "var(--color-accent, #D0355B)" }}
                    onClick={() => {
                        window.location.href = "/loginPage";
                    }}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default LandingPage;