// import Dashboard from "./dashboard/page";
import LandingPage from "./landingpage/page";
import NavBar from "./components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <LandingPage />
      <footer className="text-center">
        <p className="text-sm text-gray-500">© Isa Media Inc</p>
      </footer>
    </div>
  );
}
