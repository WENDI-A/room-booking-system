import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Customer from '@/models/Customer';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ email: string }> }
) {
    try {
        await connectDB();
        
        const { email } = await params;
        console.log('Looking for customer with email:', email);
        const customer = await Customer.findOne({ email });
        console.log('Found customer:', customer);
        
        if (!customer) {
            console.log('No customer found for email:', email);
            return NextResponse.json({
                success: true,
                data: [],
            });
        }

        const bookings = await Booking.find({ customer: customer._id })
            .populate('room')
            .populate('customer')
            .sort({ createdAt: -1 });
        
        console.log('Found bookings:', bookings.length);

        return NextResponse.json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}