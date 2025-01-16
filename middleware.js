import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

export function middleware(request) {
    const token = request.cookies.get('userToken')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/'],
};
