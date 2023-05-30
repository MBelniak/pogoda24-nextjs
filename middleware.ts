import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: '/admin(/login)?'
};

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    if (req.url === '/admin/authenticate') {
        return;
    }

    const basicAuth = req.cookies.get('authorization');

    if (basicAuth) {
        const [user, pwd] = atob(basicAuth.value).split(':');
        console.log(url.pathname);
        if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PWD) {
            if (url.pathname.startsWith('/admin/login')) {
                url.pathname = '/admin';
                return NextResponse.redirect(url);
            }
            return NextResponse.next();
        }
    }

    if (url.pathname.startsWith('/admin/login')) {
        return NextResponse.next();
    }
    url.pathname = '/admin/login';
    return NextResponse.redirect(url, {
        headers: {
            'WWW-authenticate': 'Basic realm="Secure Area"'
        }
    });
}
