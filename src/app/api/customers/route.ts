import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Customer from '@/models/Customer';

export async function GET(request: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');

        const filter: any = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ];
        }

        const customers = await Customer.find(filter).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: customers });
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
        
        // Check if customer already exists
        let customer = await Customer.findOne({ email: body.email });
        
        if (!customer) {
           const newCustomer = new Customer(body);
customer = await newCustomer.save();

        } else {
            // Update existing customer info
            customer = await Customer.findByIdAndUpdate(
                customer._id,
                { name: body.name, phone: body.phone },
                { new: true }
            );
        }

        return NextResponse.json({ success: true, data: customer }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
