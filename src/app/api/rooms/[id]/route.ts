import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Room from '@/models/Room';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const params = await context.params;
        const room = await Room.findById(params.id);

        if (!room) {
            return NextResponse.json(
                { success: false, error: 'Room not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: room });
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
        const room = await Room.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!room) {
            return NextResponse.json(
                { success: false, error: 'Room not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: room });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const params = await context.params;
        const room = await Room.findByIdAndDelete(params.id);

        if (!room) {
            return NextResponse.json(
                { success: false, error: 'Room not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
