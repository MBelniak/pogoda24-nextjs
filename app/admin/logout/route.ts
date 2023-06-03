import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    return NextResponse.json('', {
        status: 200,
        headers: {
            'Set-Cookie': serialize('authorization', '', {
                path: '/',
                httpOnly: true,
                sameSite: true,
                secure: true,
                expires: new Date()
            })
        }
    });
}
