export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'customer';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IRoom {
    _id?: string;
    name: string;
    type: 'single' | 'double' | 'suite' | 'deluxe';
    description: string;
    price: number;
    capacity: number;
    amenities: string[];
    images: string[];
    featured: boolean;
    available: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBooking {
    _id?: string;
    room: string | IRoom;
    customer: string | ICustomer;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    specialRequests?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICustomer {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DashboardStats {
    totalRooms: number;
    totalBookings: number;
    totalRevenue: number;
    availableRooms: number;
    pendingBookings: number;
    confirmedBookings: number;
}

export interface RoomFilter {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    available?: boolean;
}
