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
            // Standard / Classic Rooms
            {
                name: 'Standard Single Room',
                type: 'single',
                description: 'Basic, comfortable room with a queen bed. Perfect for solo travelers.',
                price: 120,
                capacity: 1,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Work Desk'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765356701/yorkshire-hotel-1-5_yfraws.jpg'],
                featured: false,
                available: true,
            },
            {
                name: 'Superior Double Room',
                type: 'double',
                description: 'Slightly larger than standard, with better views and upgraded amenities.',
                price: 180,
                capacity: 2,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Work Desk', 'Coffee Maker', 'City View'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765356798/Ikos-Andalusia-Superior-Double-Room-Sea-View_2880x1779-_1_-1_bu6yde.webp'],
                featured: true,
                available: true,
            },
            // Deluxe Rooms
            {
                name: 'Deluxe Ocean View',
                type: 'deluxe',
                description: 'More spacious with breathtaking ocean views and high-end furnishings.',
                price: 350,
                capacity: 4,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View', 'Balcony', 'Room Service'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765356883/MW-Tower-Ocean-View-Deluxe-King-_2_igqoeu.webp'],
                featured: true,
                available: true,
            },
            // Suites
            {
                name: 'Executive Suite',
                type: 'suite',
                description: 'Large suite with living room, work desk, and premium amenities.',
                price: 500,
                capacity: 6,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Living Room', 'Work Area', 'Butler Service'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765354796/NYCPH-P0991-Central-Park-Balcony-Suite-East-Living-Room.16x9_r3bp3z.jpg'],
                featured: true,
                available: true,
            },
            // Specialty Rooms
            {
                name: 'Honeymoon Suite',
                type: 'honeymoon',
                description: 'Romantic suite designed for couples with Jacuzzi and special décor.',
                price: 450,
                capacity: 2,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Jacuzzi', 'Romantic Lighting', 'Champagne', 'Rose Petals'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765354958/DSC_5833_20180424-06550079_pjgxyj.jpg'],
                featured: false,
                available: true,
            },
            {
                name: 'Family Suite',
                type: 'family',
                description: 'Multiple bedrooms and larger living space perfect for families.',
                price: 320,
                capacity: 6,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Kitchenette', 'Extra Beds', 'Play Area'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765355039/family-suite-3-2023_hmfgiu.jpg'],
                featured: false,
                available: true,
            },
            {
                name: 'Accessible Room',
                type: 'accessible',
                description: 'ADA-compliant room designed for guests with disabilities.',
                price: 160,
                capacity: 2,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Wheelchair Access', 'Roll-in Shower', 'Grab Bars'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765355162/DV---Tillamook-135_brtyee.jpg'],
                featured: false,
                available: true,
            },
            // Ultra-Luxury Options
            {
                name: 'Presidential Suite',
                type: 'presidential',
                description: 'Most exclusive suite with personal butler service and premium furnishings.',
                price: 800,
                capacity: 8,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Butler Service', 'Private Dining', 'Panoramic Views', 'Luxury Bath'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765355317/bnr9kn9o3i1059duafmc3av9xes6j859_yzvm6p.jpg'],
                featured: true,
                available: true,
            },
            {
                name: 'Penthouse Suite',
                type: 'penthouse',
                description: 'Top floor ultra-luxury with private terrace and luxury amenities.',
                price: 1000,
                capacity: 6,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Private Terrace', 'Luxury Bath', 'City Views', 'Premium Service'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765357563/111-west-57th-street-quadplex-80-2-credit-to-hayes-davidson_dfjeer.jpg'],
                featured: true,
                available: true,
            },
            {
                name: 'Villa with Pool',
                type: 'villa',
                description: 'Separate luxury unit with private pool and exclusive amenities.',
                price: 1200,
                capacity: 10,
                amenities: ['WiFi', 'TV', 'Air Conditioning', 'Private Pool', 'Garden', 'Full Kitchen', 'Concierge'],
                images: ['https://res.cloudinary.com/dqtnppc7l/image/upload/v1765357462/hanalei-colony-resort_yy1crz.jpg'],
                featured: true,
                available: true,
            },
        ]);
        console.log(`✅ Created ${rooms.length} rooms`);
        console.log('Room types created:', rooms.map(r => r.type).join(', '));

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
