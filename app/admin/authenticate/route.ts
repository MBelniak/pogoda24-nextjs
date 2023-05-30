import { NextRequest, NextResponse } from 'next/server';
import { btoa } from 'buffer';
import { serialize } from 'cookie';

export async function POST(req: NextRequest, res: any) {
    const formData = await req.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PWD) {
        return NextResponse.json('', {
            status: 200,
            headers: {
                'Set-Cookie': serialize('authorization', btoa(username + ':' + password), {
                    path: '/',
                    httpOnly: true,
                    sameSite: true,
                    secure: true
                })
            }
        });
    }

    return NextResponse.json(null, { status: 401 });
}
