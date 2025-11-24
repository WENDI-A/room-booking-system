'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaChartLine, FaBed, FaCalendarCheck, FaUsers, FaSignOutAlt, FaHotel } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: FaChartLine },
        { name: 'Rooms', href: '/admin/rooms', icon: FaBed },
        { name: 'Bookings', href: '/admin/bookings', icon: FaCalendarCheck },
        { name: 'Customers', href: '/admin/customers', icon: FaUsers },
    ];

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-40 hidden md:block">
            <div className="p-6">
                <Link href="/" className="flex items-center space-x-3 mb-10 group">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                        <FaHotel className="text-xl text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        LuxuryStay
                    </span>
                </Link>

                <nav className="space-y-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.name} href={link.href}>
                                <motion.div
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                            : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <link.icon className={`text-lg ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                                    <span className="font-medium">{link.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                                        />
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="absolute bottom-0 w-full p-6 border-t border-gray-700">
                <motion.button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-colors w-full px-4 py-3 rounded-xl hover:bg-white/5"
                    whileHover={{ x: 5 }}
                >
                    <FaSignOutAlt />
                    <span className="font-medium">Logout</span>
                </motion.button>
            </div>
        </div>
    );
}
