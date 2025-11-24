import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';
import Booking from '@/models/Booking';

export async function GET() {
    try {
        await connectDB();

        const totalRooms = await Room.countDocuments();
        const availableRooms = await Room.countDocuments({ available: true });
        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });

        const revenueData = await Booking.aggregate([
            {
                $match: {
                    status: { $in: ['confirmed', 'completed'] },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        return NextResponse.json({
            success: true,
            data: {
                totalRooms,
                totalBookings,
                totalRevenue,
                availableRooms,
                pendingBookings,
                confirmedBookings,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
