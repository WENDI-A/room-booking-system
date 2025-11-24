'use client';

import AdminSidebar from '@/components/AdminSidebar';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <AdminSidebar />

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center justify-between px-4">
                <Link href="/admin/dashboard" className="text-xl font-bold text-gray-900">
                    Admin Panel
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
                        <div className="relative w-64 h-full bg-white shadow-2xl">
                            <AdminSidebar />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="md:ml-64 min-h-screen pt-16 md:pt-0 transition-all duration-300">
                <div className="p-6 md:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
