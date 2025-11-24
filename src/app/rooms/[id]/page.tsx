'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { IRoom, ICustomer } from '@/types';
import { formatCurrency, calculateTotalPrice } from '@/lib/utils';
import { FaUsers, FaCheck } from 'react-icons/fa';

export default function RoomDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [room, setRoom] = useState<IRoom | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        checkIn: '',
        checkOut: '',
        guests: 1,
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        specialRequests: '',
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchRoom();
        }
    }, [params.id]);

    useEffect(() => {
        if (bookingData.checkIn && bookingData.checkOut && room) {
            const price = calculateTotalPrice(
                new Date(bookingData.checkIn),
                new Date(bookingData.checkOut),
                room.price
            );
            setTotalPrice(price);
        }
    }, [bookingData.checkIn, bookingData.checkOut, room]);

    const fetchRoom = async () => {
        try {
            const response = await fetch(`/api/rooms/${params.id}`);
            const data = await response.json();
            if (data.success) {
                setRoom(data.data);
            } else {
                toast.error('Room not found');
                router.push('/rooms');
            }
        } catch (error) {
            console.error('Error fetching room:', error);
            toast.error('Failed to load room details');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Create customer first
            const customerResponse = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: bookingData.customerName,
                    email: bookingData.customerEmail,
                    phone: bookingData.customerPhone,
                }),
            });

            const customerData = await customerResponse.json();
            if (!customerData.success) {
                throw new Error('Failed to create customer');
            }

            // Create booking
            const bookingResponse = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room: room?._id,
                    customer: customerData.data._id,
                    checkIn: bookingData.checkIn,
                    checkOut: bookingData.checkOut,
                    guests: bookingData.guests,
                    totalPrice,
                    specialRequests: bookingData.specialRequests,
                }),
            });

            const bookingResult = await bookingResponse.json();
            if (bookingResult.success) {
                toast.success('Booking created successfully!');
                router.push('/');
            } else {
                throw new Error('Failed to create booking');
            }
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Failed to create booking. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!room) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        {room.images && room.images.length > 0 ? (
                            room.images.map((image, index) => (
                                <div key={index} className="relative h-64">
                                    <Image
                                        src={image}
                                        alt={`${room.name} - ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="relative h-64 col-span-2">
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center rounded-lg">
                                    <span className="text-white text-3xl font-bold">{room.name}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Room Details */}
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{room.name}</h1>
                                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    {room.type}
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold text-blue-600">
                                    {formatCurrency(room.price)}
                                </div>
                                <div className="text-gray-500">per night</div>
                            </div>
                        </div>

                        <p className="text-gray-700 text-lg mb-6">{room.description}</p>

                        <div className="mb-6">
                            <div className="flex items-center space-x-2 text-gray-700 mb-4">
                                <FaUsers className="text-xl" />
                                <span>Capacity: Up to {room.capacity} guests</span>
                            </div>

                            <h3 className="text-xl font-bold mb-3">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {room.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <FaCheck className="text-green-600" />
                                        <span className="text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="border-t pt-8">
                            <h2 className="text-2xl font-bold mb-6">Book This Room</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Check-in Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={bookingData.checkIn}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, checkIn: e.target.value })
                                            }
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Check-out Date
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={bookingData.checkOut}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, checkOut: e.target.value })
                                            }
                                            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Guests
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            max={room.capacity}
                                            value={bookingData.guests}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, guests: Number(e.target.value) })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={bookingData.customerName}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, customerName: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={bookingData.customerEmail}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, customerEmail: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={bookingData.customerPhone}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, customerPhone: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Special Requests (Optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={bookingData.specialRequests}
                                        onChange={(e) =>
                                            setBookingData({ ...bookingData, specialRequests: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {totalPrice > 0 && (
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold">Total Price:</span>
                                            <span className="text-2xl font-bold text-blue-600">
                                                {formatCurrency(totalPrice)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Processing...' : 'Book Now'}
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
