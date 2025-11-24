const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
}, { timestamps: true });

const RoomSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    capacity: Number,
    amenities: [String],
    images: [String],
    featured: Boolean,
    available: Boolean,
}, { timestamps: true });

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
}, { timestamps: true });

const BookingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    checkIn: Date,
    checkOut: Date,
    guests: Number,
    totalPrice: Number,
    status: String,
    specialRequests: String,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);
const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

async function seed() {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing data...');
        await User.deleteMany({});
        await Room.deleteMany({});
        await Customer.deleteMany({});
        await Booking.deleteMany({});

        console.log('👤 Creating admin user...');
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
        const admin = await User.create({
            name: 'Admin User',
            email: process.env.ADMIN_EMAIL || 'admin@hotel.com',
            password: hashedPassword,
            role: 'admin',
        });
        console.log('✅ Admin created:', admin.email);

        console.log('🏨 Creating sample rooms...');
        const rooms = await Room.insertMany([
            {
                name: 'Deluxe Ocean View Suite',
                type: 'deluxe',
                description: 'Spacious suite with breathtaking ocean views, king-size bed, and private balcony. Perfect for a luxurious getaway.',
                price: 350,
                capacity: 4,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View', 'Balcony', 'Room Service'],
                images: [
                    'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/beach-boat',
                    'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/nature-mountains',
                ],
                featured: true,
                available: true,
            },
            {
                name: 'Executive Double Room',
                type: 'double',
                description: 'Comfortable double room with modern amenities and city views. Ideal for business travelers or couples.',
                price: 180,
                capacity: 2,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Work Desk', 'Coffee Maker'],
                images: [
                    'https://res.cloudinary.com/demo/image/upload/v1/samples/people/kitchen-bar',
                    'https://res.cloudinary.com/demo/image/upload/v1/samples/food/dessert',
                ],
                featured: true,
                available: true,
            },
            {
                name: 'Cozy Single Room',
                type: 'single',
                description: 'Perfect for solo travelers. Compact yet comfortable with all essential amenities.',
                price: 120,
                capacity: 1,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Work Desk'],
                images: [
                    'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/girl-urban-view',
                ],
                featured: false,
                available: true,
            },
            {
                name: 'Presidential Suite',
                type: 'suite',
                description: 'The ultimate luxury experience with separate living area, dining room, and panoramic city views.',
                price: 500,
                capacity: 6,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Jacuzzi', 'Living Room', 'Dining Area', 'Butler Service'],
                images: [
                    'https://res.cloudinary.com/demo/image/upload/v1/samples/landscapes/architecture-signs',
                    'https://res.cloudinary.com/demo/image/upload/v1/samples/animals/three-dogs',
                ],
                featured: true,
                available: true,
            },
            {
                name: 'Family Double Room',
                type: 'double',
                description: 'Spacious room perfect for families with two double beds and extra space for children.',
                price: 220,
                capacity: 4,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Fridge', 'Extra Beds'],
                images: [
                    'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man',
                ],
                featured: false,
                available: true,
            },
        ]);
        console.log(`✅ Created ${rooms.length} rooms`);

        console.log('👥 Creating sample customers...');
        const customers = await Customer.insertMany([
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1-555-0101',
                address: '123 Main St, New York, NY 10001',
            },
            {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                phone: '+1-555-0102',
                address: '456 Oak Ave, Los Angeles, CA 90001',
            },
            {
                name: 'Robert Johnson',
                email: 'robert.j@example.com',
                phone: '+1-555-0103',
                address: '789 Pine Rd, Chicago, IL 60601',
            },
        ]);
        console.log(`✅ Created ${customers.length} customers`);

        console.log('📅 Creating sample bookings...');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        const bookings = await Booking.insertMany([
            {
                room: rooms[0]._id,
                customer: customers[0]._id,
                checkIn: tomorrow,
                checkOut: new Date(tomorrow.getTime() + 3 * 24 * 60 * 60 * 1000),
                guests: 2,
                totalPrice: 1050,
                status: 'confirmed',
                specialRequests: 'Late check-in requested',
            },
            {
                room: rooms[1]._id,
                customer: customers[1]._id,
                checkIn: nextWeek,
                checkOut: new Date(nextWeek.getTime() + 2 * 24 * 60 * 60 * 1000),
                guests: 2,
                totalPrice: 360,
                status: 'pending',
            },
            {
                room: rooms[3]._id,
                customer: customers[2]._id,
                checkIn: new Date(nextWeek.getTime() + 3 * 24 * 60 * 60 * 1000),
                checkOut: new Date(nextWeek.getTime() + 5 * 24 * 60 * 60 * 1000),
                guests: 4,
                totalPrice: 1000,
                status: 'confirmed',
                specialRequests: 'Anniversary celebration - champagne requested',
            },
        ]);
        console.log(`✅ Created ${bookings.length} bookings`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📋 Summary:');
        console.log(`   - Admin: ${admin.email} / ${process.env.ADMIN_PASSWORD || 'admin123'}`);
        console.log(`   - Rooms: ${rooms.length}`);
        console.log(`   - Customers: ${customers.length}`);
        console.log(`   - Bookings: ${bookings.length}`);
        console.log('\n✨ You can now run: npm run dev');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
}

seed();
