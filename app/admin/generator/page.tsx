'use client';
import React from 'react';
import { Generator as GeneratorComponent } from './(components)/Generator';
import { CookiesProvider } from 'react-cookie';

export default function Generator() {
    return (
        <CookiesProvider>
            <GeneratorComponent />
        </CookiesProvider>
    );
}
