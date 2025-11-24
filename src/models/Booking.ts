import mongoose, { Schema, Model } from 'mongoose';
import { IBooking } from '@/types';

const BookingSchema = new Schema<IBooking>(
    {
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: [true, 'Room is required'],
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
            required: [true, 'Customer is required'],
        },
        checkIn: {
            type: Date,
            required: [true, 'Check-in date is required'],
        },
        checkOut: {
            type: Date,
            required: [true, 'Check-out date is required'],
        },
        guests: {
            type: Number,
            required: [true, 'Number of guests is required'],
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: [true, 'Total price is required'],
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },
        specialRequests: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking: Model<IBooking> =
    mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
