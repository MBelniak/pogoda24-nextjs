import './globals.scss';
import { Inter } from 'next/font/google';
import React from 'react';
import * as admin from 'firebase-admin';
import { credential } from 'firebase-admin';
import { TopBar } from '@/app/(components)/TopBar';
const inter = Inter({ subsets: ['latin'] });

if (!admin.apps.length) {
    admin.initializeApp({
        credential: credential.cert({
            projectId: 'pogoda-24-7',
            privateKey: process.env.FIRESTORE_PRIVATE_KEY!.split(String.raw`\n`).join('\n'),
            clientEmail: 'firebase-adminsdk-p0fqw@pogoda-24-7.iam.gserviceaccount.com'
        }),
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
