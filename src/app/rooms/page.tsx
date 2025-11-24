'use client';

import { useEffect, useState } from 'react';
import RoomCard from '@/components/RoomCard';
import { IRoom } from '@/types';
import { motion } from 'framer-motion';
import { FaFilter, FaSearch } from 'react-icons/fa';

export default function RoomsPage() {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [filteredRooms, setFilteredRooms] = useState<IRoom[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
    });

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, rooms]);

    const fetchRooms = async () => {
        try {
            const response = await fetch('/api/rooms?available=true');
            const data = await response.json();
            if (data.success) {
                setRooms(data.data);
                setFilteredRooms(data.data);
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...rooms];

        if (filters.type) {
            filtered = filtered.filter((room) => room.type === filters.type);
        }

        if (filters.minPrice) {
            filtered = filtered.filter((room) => room.price >= Number(filters.minPrice));
        }

        if (filters.maxPrice) {
            filtered = filtered.filter((room) => room.price <= Number(filters.maxPrice));
        }

        setFilteredRooms(filtered);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const resetFilters = () => {
        setFilters({
            type: '',
            minPrice: '',
            maxPrice: '',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Our{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Rooms
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find your perfect accommodation from our collection of luxury rooms
                    </p>
                </motion.div>

                {/* Filters Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                                <FaFilter className="text-white text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Filter Rooms</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Room Type */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Room Type
                                </label>
                                <select
                                    name="type"
                                    value={filters.type}
                                    onChange={handleFilterChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white"
                                >
                                    <option value="">All Types</option>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                    <option value="suite">Suite</option>
                                    <option value="deluxe">Deluxe</option>
                                </select>
                            </div>

                            {/* Min Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Min Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        name="minPrice"
                                        value={filters.minPrice}
                                        onChange={handleFilterChange}
                                        placeholder="0"
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Max Price */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Max Price
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        placeholder="1000"
                                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Reset Button */}
                            <div className="flex items-end">
                                <motion.button
                                    onClick={resetFilters}
                                    className="w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Reset Filters
                                </motion.button>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-gray-600 flex items-center space-x-2">
                                <FaSearch className="text-blue-600" />
                                <span>
                                    Found <span className="font-bold text-blue-600">{filteredRooms.length}</span> room{filteredRooms.length !== 1 ? 's' : ''}
                                </span>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Rooms Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="h-64 bg-gray-200 skeleton" />
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-gray-200 rounded skeleton" />
                                    <div className="h-4 bg-gray-200 rounded skeleton w-3/4" />
                                    <div className="h-8 bg-gray-200 rounded skeleton w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredRooms.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {filteredRooms.map((room) => (
                            <motion.div
                                key={room._id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                            >
                                <RoomCard room={room} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="inline-flex p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                            <FaSearch className="text-5xl text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No rooms found</h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your filters to see more results
                        </p>
                        <motion.button
                            onClick={resetFilters}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Reset Filters
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
