'use client';

import { FaFacebook, FaTwitter, FaInstagram, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* About Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            LuxuryStay Hotel
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Experience comfort and luxury at its finest. Your perfect stay awaits at our premium accommodations.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: FaFacebook, color: 'hover:text-blue-400' },
                                { icon: FaTwitter, color: 'hover:text-sky-400' },
                                { icon: FaInstagram, color: 'hover:text-pink-400' },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className={`p-3 bg-white/10 rounded-full ${social.color} transition-all duration-300 hover:bg-white/20`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Home', 'Rooms', 'About Us', 'Contact', 'Admin'].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link === 'Admin' ? '/admin/login' : link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
                                    >
                                        <span className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-4 transition-all duration-300" />
                                        <span>{link}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-xl font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-gray-400">
                                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                                <span>123 Luxury Avenue, City Center, 12345</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <FaPhone className="text-purple-400 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-400">
                                <FaEnvelope className="text-pink-400 flex-shrink-0" />
                                <span>info@luxurystay.com</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-xl font-bold mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-4">
                            Subscribe to get special offers and updates
                        </p>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-blue-400 transition-colors duration-300 text-white placeholder-gray-400"
                            />
                            <motion.button
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm flex items-center space-x-2">
                            <span>&copy; 2025 LuxuryStay Hotel. All rights reserved.</span>
                        </p>
                        <p className="text-gray-400 text-sm flex items-center space-x-2">
                            <span>Made with</span>
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <FaHeart className="text-red-500" />
                            </motion.span>
                            <span>by LuxuryStay Team</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
