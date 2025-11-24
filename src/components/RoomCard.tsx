'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { IRoom } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { FaUsers, FaStar, FaArrowRight } from 'react-icons/fa';

interface RoomCardProps {
    room: IRoom;
}

export default function RoomCard({ room }: RoomCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
            {/* Image Container with Zoom Effect */}
            <div className="relative h-64 overflow-hidden">
                {room.images && room.images.length > 0 ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={room.images[0]}
                            alt={room.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-white/10"
                            animate={{
                                backgroundPosition: ['0% 0%', '100% 100%'],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: 'reverse',
                            }}
                        />
                        <span className="relative z-10 text-white text-2xl font-bold drop-shadow-lg">
                            {room.name}
                        </span>
                    </div>
                )}

                {/* Featured Badge */}
                {room.featured && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="absolute top-4 right-4 z-10"
                    >
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                            <FaStar className="text-sm" />
                            <span className="text-sm font-bold">Featured</span>
                        </div>
                    </motion.div>
                )}

                {/* Room Type Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-semibold text-gray-800 capitalize">
                            {room.type}
                        </span>
                    </div>
                </div>

                {/* Availability Indicator */}
                <div className="absolute bottom-4 left-4 z-10">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${room.available
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}>
                        {room.available ? 'Available' : 'Booked'}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Room Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {room.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {room.description}
                </p>

                {/* Capacity */}
                <div className="flex items-center space-x-2 text-gray-700 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <FaUsers className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Up to {room.capacity} guests</span>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {formatCurrency(room.price)}
                            </span>
                            <span className="text-sm text-gray-500 font-medium">/night</span>
                        </div>
                    </div>

                    <Link href={`/rooms/${room._id}`}>
                        <motion.button
                            className="group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center space-x-2">
                                <span>View</span>
                                <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                                initial={{ x: '100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-100 to-purple-100 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-16 -mb-16" />
        </motion.div>
    );
}
