import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const params = await context.params;
        const booking = await Booking.findById(params.id)
            .populate('room')
            .populate('customer');

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const params = await context.params;
        const body = await request.json();
        const booking = await Booking.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        })
            .populate('room')
            .populate('customer');

        if (!booking) {
            return NextResponse.json(
                { success: false, error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
