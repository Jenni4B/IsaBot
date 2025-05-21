import LandingPage from "./landingpage/page";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen 
                    p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LandingPage />
      <footer className="text-center">
        <p className="text-sm text-gray-500">© Isa Media Inc</p>
      </footer>
    </div>
  );
}
