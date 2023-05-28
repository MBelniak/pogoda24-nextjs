import './globals.scss';
import { Inter } from 'next/font/google';
import React from 'react';
import * as admin from 'firebase-admin';
import { credential } from 'firebase-admin';
import { TopBar } from '@/app/components/TopBar';
const inter = Inter({ subsets: ['latin'] });

const serviceAccount = require('../pogoda-24-7-key.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: credential.cert(serviceAccount),
        databaseURL: 'https://pogoda-24-7.firebaseio.com'
    });
}

export const metadata = {
    title: 'Pogoda 24/7',
    description: 'Official page of Pogoda 24/7'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TopBar />
                {children}
            </body>
        </html>
    );
}
