'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { IRoom } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';

export default function AdminRoomsPage() {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState<IRoom | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'single' as 'single' | 'double' | 'suite' | 'deluxe',
        description: '',
        price: 0,
        capacity: 1,
        amenities: '',
        images: '',
        featured: false,
        available: true,
    });

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await fetch('/api/rooms');
            const data = await response.json();
            if (data.success) {
                setRooms(data.data);
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
            toast.error('Failed to fetch rooms');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const roomData = {
            ...formData,
            amenities: formData.amenities.split(',').map((a) => a.trim()),
            images: formData.images.split(',').map((i) => i.trim()).filter((i) => i),
        };

        try {
            const url = editingRoom ? `/api/rooms/${editingRoom._id}` : '/api/rooms';
            const method = editingRoom ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(editingRoom ? 'Room updated!' : 'Room created!');
                setShowForm(false);
                setEditingRoom(null);
                resetForm();
                fetchRooms();
            } else {
                toast.error(data.error || 'Failed to save room');
            }
        } catch (error) {
            console.error('Error saving room:', error);
            toast.error('Failed to save room');
        }
    };

    const handleEdit = (room: IRoom) => {
        setEditingRoom(room);
        setFormData({
            name: room.name,
            type: room.type,
            description: room.description,
            price: room.price,
            capacity: room.capacity,
            amenities: room.amenities.join(', '),
            images: room.images.join(', '),
            featured: room.featured,
            available: room.available,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this room?')) return;

        try {
            const response = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
            const data = await response.json();

            if (data.success) {
                toast.success('Room deleted!');
                fetchRooms();
            } else {
                toast.error('Failed to delete room');
            }
        } catch (error) {
            console.error('Error deleting room:', error);
            toast.error('Failed to delete room');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            type: 'single',
            description: '',
            price: 0,
            capacity: 1,
            amenities: '',
            images: '',
            featured: false,
            available: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Manage Rooms</h1>
                    <button
                        onClick={() => {
                            setShowForm(!showForm);
                            setEditingRoom(null);
                            resetForm();
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        {showForm ? 'Cancel' : 'Add New Room'}
                    </button>
                </div>

                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-lg p-8 mb-8"
                    >
                        <h2 className="text-2xl font-bold mb-6">
                            {editingRoom ? 'Edit Room' : 'Add New Room'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Room Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Room Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                type: e.target.value as 'single' | 'double' | 'suite' | 'deluxe',
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="single">Single</option>
                                        <option value="double">Double</option>
                                        <option value="suite">Suite</option>
                                        <option value="deluxe">Deluxe</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price per Night
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: Number(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Capacity
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.capacity}
                                        onChange={(e) =>
                                            setFormData({ ...formData, capacity: Number(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amenities (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.amenities}
                                    onChange={(e) =>
                                        setFormData({ ...formData, amenities: e.target.value })
                                    }
                                    placeholder="WiFi, TV, Air Conditioning"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URLs (comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.images}
                                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center space-x-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) =>
                                            setFormData({ ...formData, featured: e.target.checked })
                                        }
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Featured Room</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.available}
                                        onChange={(e) =>
                                            setFormData({ ...formData, available: e.target.checked })
                                        }
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Available</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                {editingRoom ? 'Update Room' : 'Create Room'}
                            </button>
                        </form>
                    </motion.div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Room
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Capacity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {rooms.map((room) => (
                                    <tr key={room._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {room.name}
                                                        {room.featured && (
                                                            <FaStar className="inline ml-2 text-yellow-500" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {room.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatCurrency(room.price)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {room.capacity} guests
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.available
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {room.available ? 'Available' : 'Unavailable'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(room)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <FaEdit className="inline" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(room._id!)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FaTrash className="inline" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
