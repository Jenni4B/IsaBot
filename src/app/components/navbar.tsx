import Link from "next/link";

const navItems = [
    { name: "Home", href: "/" },
    // { name: "Dashboard", href: "/dashboard" },
    { name: "Login", href: "/loginPage" },
    { name: "Settings", href: "/settings" }
    ];

// {name: "Logout", href: "/" }, will be implemented later

const NavBar: React.FC = () => {
    return (
        <nav className="text-white p-6 shadow-lg text-xl">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">IsaBot</div>
                <ul className="flex space-x-8">
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