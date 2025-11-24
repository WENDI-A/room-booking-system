# LuxuryStay Hotel Management System

A full-stack hotel management system built with Next.js 14, TypeScript, MongoDB, and TailwindCSS.

## Features

### Public Features
- 🏠 Homepage with hero section and featured rooms
- 🏨 Room listing with advanced filters (type, price, availability)
- 📸 Room details with image gallery and amenities
- 📅 Real-time booking form with price calculation
- 💳 Customer information collection

### Admin Features (Protected)
- 🔐 Secure admin authentication
- 📊 Dashboard with statistics (rooms, bookings, revenue)
- 🛏️ Complete room management (CRUD operations)
- 📋 Booking management with status updates
- 👥 Customer database with search functionality

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js (Credentials Provider)
- **Image Storage:** Cloudinary
- **UI Enhancements:** Framer Motion, React Hot Toast, React Icons
- **Utilities:** date-fns, bcryptjs

## Project Structure

```
hotel1/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth endpoints
│   │   │   ├── rooms/        # Room CRUD
│   │   │   ├── bookings/     # Booking management
│   │   │   ├── customers/    # Customer management
│   │   │   └── dashboard/    # Statistics
│   │   ├── admin/            # Admin pages
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── rooms/
│   │   │   ├── bookings/
│   │   │   └── customers/
│   │   ├── rooms/            # Public room pages
│   │   ├── layout.tsx
│   │   └── page.tsx          # Homepage
│   ├── components/           # Reusable components
│   ├── lib/                  # Utilities and helpers
│   ├── models/               # Mongoose models
│   └── types/                # TypeScript types
├── scripts/
│   └── seed.js               # Database seeding script
└── public/                   # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (optional, for image uploads)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd hotel1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory (use `env.template.txt` as reference):

   ```env
   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-management?retryWrites=true&w=majority

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

   # Cloudinary (optional)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Admin Credentials (for seeding)
   ADMIN_EMAIL=admin@hotel.com
   ADMIN_PASSWORD=admin123
   ```

   **To generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Seed the database:**
   ```bash
   npm run seed
   ```

   This will create:
   - 1 admin user (admin@hotel.com / admin123)
   - 5 sample rooms
   - 3 sample customers
   - 3 sample bookings

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Public Access
- Browse rooms at `/rooms`
- View room details and book at `/rooms/[id]`
- Filter rooms by type and price

### Admin Access
1. Navigate to `/admin/login`
2. Login with credentials:
   - Email: `admin@hotel.com`
   - Password: `admin123`
3. Access admin dashboard at `/admin/dashboard`
4. Manage rooms, bookings, and customers

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample data

## API Endpoints

### Public Endpoints
- `GET /api/rooms` - Get all rooms (with filters)
- `GET /api/rooms/[id]` - Get single room
- `POST /api/bookings` - Create booking
- `POST /api/customers` - Create customer

### Protected Endpoints (Admin Only)
- `POST /api/rooms` - Create room
- `PUT /api/rooms/[id]` - Update room
- `DELETE /api/rooms/[id]` - Delete room
- `GET /api/bookings` - Get all bookings
- `PUT /api/bookings/[id]` - Update booking status
- `GET /api/customers` - Get all customers
- `GET /api/dashboard` - Get statistics

## Database Models

### User
- name, email, password (hashed)
- role: 'admin' | 'customer'

### Room
- name, type, description, price, capacity
- amenities[], images[]
- featured, available

### Customer
- name, email, phone, address

### Booking
- room (ref), customer (ref)
- checkIn, checkOut, guests
- totalPrice, status, specialRequests

## Features in Detail

### Real-time Price Calculation
The booking form automatically calculates the total price based on:
- Number of nights (checkOut - checkIn)
- Room price per night

### Room Filtering
Filter rooms by:
- Type (single, double, suite, deluxe)
- Price range (min/max)
- Availability status

### Admin Dashboard Statistics
- Total rooms and available rooms
- Total bookings by status
- Total revenue from confirmed/completed bookings

## Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables
Ensure all environment variables are set in your production environment.

## License

This project is for educational purposes.

## Support

For issues or questions, please check the code comments or create an issue in the repository.
