const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

const RoomSchema = new mongoose.Schema({
    name: String,
    available: Boolean,
    featured: Boolean,
});

const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);

async function checkRooms() {
    try {
        await connectDB();
        const count = await Room.countDocuments();
        console.log(`Total rooms: ${count}`);

        const availableRooms = await Room.countDocuments({ available: true });
        console.log(`Available rooms: ${availableRooms}`);

        const featuredRooms = await Room.countDocuments({ featured: true });
        console.log(`Featured rooms: ${featuredRooms}`);

        const allRooms = await Room.find({});
        console.log('Sample room:', allRooms[0]);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkRooms();
