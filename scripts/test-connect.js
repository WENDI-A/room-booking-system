const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const connectDB = async () => {
    console.log('Attempting to connect to:', process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
        });
        console.log('✅ MongoDB connected successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed!');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        // console.error('Full error:', error);
        process.exit(1);
    }
};

connectDB();
