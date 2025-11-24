import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: string): Promise<string> {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'hotel-management',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image');
    }
}

export async function deleteImage(publicId: string): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete image');
    }
}

// Cloudinary URL builder for optimized images
export function getCloudinaryImageUrl(publicId: string, options?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
}): string {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

    const transformations: string[] = [];

    if (options?.width) transformations.push(`w_${options.width}`);
    if (options?.height) transformations.push(`h_${options.height}`);
    if (options?.crop) transformations.push(`c_${options.crop}`);
    if (options?.quality) transformations.push(`q_${options.quality}`);
    if (options?.format) transformations.push(`f_${options.format}`);

    const transformStr = transformations.length > 0 ? transformations.join(',') + '/' : '';

    return `${baseUrl}/${transformStr}${publicId}`;
}

// Cloudinary video URL builder
export function getCloudinaryVideoUrl(publicId: string, options?: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
}): string {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
    const baseUrl = `https://res.cloudinary.com/${cloudName}/video/upload`;

    const transformations: string[] = [];

    if (options?.width) transformations.push(`w_${options.width}`);
    if (options?.height) transformations.push(`h_${options.height}`);
    if (options?.quality) transformations.push(`q_${options.quality}`);
    if (options?.format) transformations.push(`f_${options.format}`);

    const transformStr = transformations.length > 0 ? transformations.join(',') + '/' : '';

    return `${baseUrl}/${transformStr}${publicId}`;
}

// Sample hotel images from Cloudinary demo account
export const HOTEL_IMAGES = {
    hero: 'samples/landscapes/beach-boat',
    rooms: {
        deluxe: 'samples/people/kitchen-bar',
        suite: 'samples/food/dessert',
        double: 'samples/landscapes/architecture-signs',
        single: 'samples/landscapes/girl-urban-view',
    },
    features: {
        luxury: 'samples/landscapes/beach-boat',
        service: 'samples/people/smiling-man',
        wifi: 'samples/cloudinary-icon',
        parking: 'samples/landscapes/architecture-signs',
    },
};

// Sample videos
export const HOTEL_VIDEOS = {
    hero: 'samples/sea-turtle',
    promo: 'samples/elephants',
};

export default cloudinary;
