'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardStats } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { FaBed, FaCalendarCheck, FaDollarSign, FaCheckCircle, FaUsers, FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/dashboard');
            const data = await response.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Revenue',
            value: formatCurrency(stats?.totalRevenue || 0),
            icon: FaDollarSign,
            gradient: 'from-green-500 to-emerald-600',
            trend: '+12.5%',
            trendUp: true,
        },
        {
            title: 'Total Bookings',
            value: stats?.totalBookings || 0,
            icon: FaCalendarCheck,
            gradient: 'from-blue-500 to-indigo-600',
            trend: '+5.2%',
            trendUp: true,
        },
        {
            title: 'Total Rooms',
            value: stats?.totalRooms || 0,
            icon: FaBed,
            gradient: 'from-purple-500 to-pink-600',
            trend: '0%',
            trendUp: true,
        },
        {
            title: 'Available Now',
            value: stats?.availableRooms || 0,
            icon: FaCheckCircle,
            gradient: 'from-orange-500 to-red-600',
            trend: '-2',
            trendUp: false,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />

                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                                <stat.icon className="text-xl" />
                            </div>
                            <div className={`flex items-center space-x-1 text-sm font-semibold ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.trendUp ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                                <span>{stat.trend}</span>
                            </div>
                        </div>

                        <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Booking Status Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Analytics</h2>
                    <div className="h-64 flex items-end justify-between space-x-4 px-4">
                        {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                            <div key={i} className="w-full flex flex-col items-center space-y-2 group">
                                <div className="relative w-full bg-gray-100 rounded-t-lg h-full overflow-hidden">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg group-hover:opacity-80 transition-opacity"
                                    />
                                </div>
                                <span className="text-xs text-gray-500 font-medium">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Occupancy Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Occupancy Status</h2>
                    <div className="space-y-6">
                        {/* Occupancy Bar */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Total Occupancy</span>
                                <span className="font-bold text-gray-900">
                                    {Math.round(((stats?.totalRooms || 0) - (stats?.availableRooms || 0)) / (stats?.totalRooms || 1) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((stats?.totalRooms || 0) - (stats?.availableRooms || 0)) / (stats?.totalRooms || 1) * 100}%` }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Status List */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-200 rounded-lg text-green-700">
                                        <FaCheckCircle />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Available</p>
                                        <p className="text-xs text-gray-500">Ready for booking</p>
                                    </div>
                                </div>
                                <span className="text-lg font-bold text-green-600">{stats?.availableRooms || 0}</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-yellow-200 rounded-lg text-yellow-700">
                                        <FaCalendarCheck />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Booked</p>
                                        <p className="text-xs text-gray-500">Occupied rooms</p>
                                    </div>
                                </div>
                                <span className="text-lg font-bold text-yellow-600">
                                    {(stats?.totalRooms || 0) - (stats?.availableRooms || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
