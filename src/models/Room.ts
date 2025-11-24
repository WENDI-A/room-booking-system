import mongoose, { Schema, Model } from 'mongoose';
import { IRoom } from '@/types';

const RoomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
            required: [true, 'Room name is required'],
            trim: true,
        },
        type: {
            type: String,
            enum: ['single', 'double', 'suite', 'deluxe'],
            required: [true, 'Room type is required'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: 0,
        },
        capacity: {
            type: Number,
            required: [true, 'Capacity is required'],
            min: 1,
        },
        amenities: {
            type: [String],
            default: [],
        },
        images: {
            type: [String],
            default: [],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Room: Model<IRoom> =
    mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);

export default Room;
