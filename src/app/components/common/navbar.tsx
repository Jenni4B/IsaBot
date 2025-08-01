'use client';
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const NavBar: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();

    const navItems = [
        ...(isLoggedIn
            ? [
                { name: "Dashboard", href: "/dashboard" },
                { name: "Logout", href: "/loginPage", onClick: logout },
                { name: "Settings", href: "/settings" }
            ]
            : [ { name: "Home", href: "/" },
                { name: "Login", href: "/loginPage" }]
        )
    ];

    return (
        <nav className="text-white p-6 shadow-lg text-xl">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">IsaBot</div>
                <ul className="flex space-x-8">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            {item.onClick ? (
                                <a href="#" onClick={item.onClick} className="hover:text-gray-400">
                                    {item.name}
                                </a>
                            ) : (
                                <Link href={item.href} className="hover:text-gray-400">
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar