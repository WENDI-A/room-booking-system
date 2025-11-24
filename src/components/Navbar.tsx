'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaHotel, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/90 backdrop-blur-lg shadow-lg'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <motion.div
                            className={`p-2 rounded-xl transition-all duration-300 ${scrolled
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                                    : 'bg-white/20 backdrop-blur-md'
                                }`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <FaHotel className="text-2xl text-white" />
                        </motion.div>
                        <span className={`text-2xl font-bold transition-colors duration-300 ${scrolled
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                                : 'text-white'
                            }`}>
                            LuxuryStay
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <Link href="/">
                            <motion.span
                                className={`font-medium transition-colors duration-300 relative group ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                            </motion.span>
                        </Link>

                        <Link href="/rooms">
                            <motion.span
                                className={`font-medium transition-colors duration-300 relative group ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                            >
                                Rooms
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                            </motion.span>
                        </Link>

                        {/* Book Now Button */}
                        <Link href="/rooms">
                            <motion.button
                                className={`px-5 py-2.5 rounded-full font-semibold shadow-lg transition-all ${scrolled
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                                        : 'bg-white text-blue-600 hover:bg-blue-50'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Now
                            </motion.button>
                        </Link>

                        {session?.user ? (
                            <>
                                <Link href="/admin/dashboard">
                                    <motion.span
                                        className={`font-medium transition-colors duration-300 relative group ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        Dashboard
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                                    </motion.span>
                                </Link>

                                <motion.button
                                    onClick={() => signOut()}
                                    className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </motion.button>
                            </>
                        ) : (
                            <Link href="/admin/login">
                                <motion.button
                                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold shadow-lg transition-all ${scrolled
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl'
                                            : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaUser />
                                    <span>Admin Login</span>
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
