import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('POLI_TOKEN')?.value; // Obtén el token de las cookies
    const url = request.nextUrl.pathname;

    const protectedRoutes = [
        { path: '/admin/clients', roles: ['Admin'] },
        { path: '/admin/home', roles: ['Admin', 'Cajero', 'Cocina', 'Mesero'] },
        { path: '/admin/inventory', roles: ['Admin', 'Cajero'] },
        { path: '/admin/orders', roles: ['Admin', 'Cocina', 'Mesero', 'Cajero'] },
        { path: '/admin/pos', roles: ['Admin', 'Cajero', 'Mesero'] },
        { path: '/admin/sales-report', roles: ['Admin', 'Cajero'] },
        { path: '/admin/users', roles: ['Admin'] },
    ];

    const route = protectedRoutes.find((r) => url.startsWith(r.path));
    if (!route) return NextResponse.next();

    if (!token) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    try {
        // Verifica el token usando jose
        const { payload } = await jwtVerify(token, secret);
        const role = payload.role as string;

        if (!route.roles.includes(role)) {
            const homeUrl = new URL('/admin/home', request.url);
            return NextResponse.redirect(homeUrl);
        }
    } catch (error) {
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
