import Link from "next/link";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    ];



const NavBar: React.FC = () => {
    return (
        <nav className="text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">My Website</div>
                <ul className="flex space-x-4">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link href={item.href} className="hover:text-gray-400">
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;