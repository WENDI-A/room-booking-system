import mongoose, { Schema, Model } from 'mongoose';
import { ICustomer } from '@/types';

const CustomerSchema = new Schema<ICustomer>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Customer: Model<ICustomer> =
    mongoose.models.Customer ||
    mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
