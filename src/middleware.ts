import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const { pathname } = req.nextUrl;

        // Redirect based on user role after login
        if (pathname === '/' && token) {
            if (token.role === 'admin') {
                return NextResponse.redirect(new URL('/admin/dashboard', req.url));
            }
        }

        // Protect admin routes
        if (pathname.startsWith('/admin') && token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const { pathname } = req.nextUrl;
                
                // Allow access to auth pages
                if (pathname.startsWith('/auth') || pathname.startsWith('/api/auth')) {
                    return true;
                }
                
                // Allow access to public pages
                if (pathname === '/' || pathname.startsWith('/rooms')) {
                    return true;
                }
                
                // Require authentication for admin pages
                if (pathname.startsWith('/admin')) {
                    return !!token && token.role === 'admin';
                }
                
                return true;
            },
        },
    }
);

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};