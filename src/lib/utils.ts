import { differenceInDays } from 'date-fns';

export function calculateTotalPrice(
    checkIn: Date,
    checkOut: Date,
    pricePerNight: number
): number {
    const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
    return nights * pricePerNight;
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
