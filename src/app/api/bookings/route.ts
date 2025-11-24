import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET() {
    try {
        await connectDB();

        const bookings = await Booking.find()
            .populate('room')
            .populate('customer')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: bookings });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const booking = await Booking.create(body);

        const populatedBooking = await Booking.findById((booking as any)._id)
            .populate('room')
            .populate('customer');

        return NextResponse.json(
            { success: true, data: populatedBooking },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
