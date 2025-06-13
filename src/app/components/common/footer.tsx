
const Footer = () => {
  // This component renders a simple footer with copyright information and a note about the technology used.
  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Isabot. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;