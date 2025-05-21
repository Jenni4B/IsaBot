// import Dashboard from "./dashboard/page";
import LandingPage from "./landingpage/page";
import NavBar from "./components/navbar";

export default function Home() {
  return (
      // Layout summary:
      // - Centers content
      // - Ensures minimum height fills the viewport
      // - Adds responsive padding (larger on small screens and up)
      // - Adds extra bottom padding and gap between children
      // - Uses a custom font family
    <div className="items-center justify-items-center min-h-screen 
                    p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <LandingPage />
      <footer className="text-center">
        <p className="text-sm text-gray-500">© Isa Media Inc</p>
      </footer>
    </div>
  );
}
