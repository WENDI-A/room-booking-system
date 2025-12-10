'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { IBooking } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FaUser, FaCalendar, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

function DashboardContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        } else if (session) {
            fetchUserBookings();
        }
    }, [session, status, router]);

    useEffect(() => {
        const booked = searchParams.get('booked');
        if (booked === 'success') {
            toast.success('Welcome to your dashboard! Your booking has been confirmed.');
        }
    }, [searchParams]);

    const fetchUserBookings = async () => {
        try {
            console.log('Fetching bookings for email:', session?.user?.email);
            const response = await fetch(`/api/bookings/user/${session?.user?.email}`);
            const data = await response.json();
            console.log('Bookings response:', data);
            if (data.success) {
                setBookings(data.data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-12">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <FaUser className="text-2xl text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome, {session?.user?.name}</h1>
                                <p className="text-gray-600">{session?.user?.email}</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Your Bookings</h2>
                </motion.div>

                {bookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {bookings.map((booking) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden"
                            >
                                <div className="p-4 sm:p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {typeof booking.room === 'object' ? booking.room.name : 'Room'}
                                        </h3>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <FaCalendar className="text-sm" />
                                            <span className="text-sm">
                                                {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <FaUsers className="text-sm" />
                                            <span className="text-sm">{booking.guests} guests</span>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t">
                                            <span className="text-sm text-gray-600">Total Price:</span>
                                            <span className="text-lg font-bold text-blue-600">
                                                {formatCurrency(booking.totalPrice)}
                                            </span>
                                        </div>

                                        {booking.specialRequests && (
                                            <div className="pt-2">
                                                <p className="text-xs text-gray-500">
                                                    <strong>Special Requests:</strong> {booking.specialRequests}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <FaCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
                            <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring our rooms!</p>
                            <button
                                onClick={() => router.push('/rooms')}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Browse Rooms
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function UserDashboard() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}