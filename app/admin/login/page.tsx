'use client';
import React, { SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const handleAuth = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                '/admin/authenticate',
                {
                    username: (document.getElementById('username') as HTMLInputElement)?.value,
                    password: (document.getElementById('password') as HTMLInputElement)?.value
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            if (response.status === 200) {
                location.href = '/admin';
            } else {
                router.push('/admin/login?error=true');
            }
        } catch (e) {
            router.push('/admin/login?error=true');
        }
    };
    return (
        <main className="w-[100vw] h-[100svh] bg-primary flex justify-center items-center">
            <div className="container flex flex-col items-center bg-white w-[30%] min-w-[250px] max-w-[400px] rounded">
                <span className="text-2xl m-2">Pogoda24/7</span>
                <form onSubmit={handleAuth} className="form max-w-[400px] content-center" id="mainForm">
                    <div className={'p-2'}>
                        <label className="label mt-4" htmlFor={'username'}>
                            Login:{' '}
                        </label>
                        <input
                            className="input"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Login"
                            autoFocus
                            maxLength={100}
                        />
                        <br />
                        <label className="label mt-4" htmlFor={'password'}>
                            Hasło:
                        </label>
                        <input
                            className="input"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Hasło"
                            maxLength={100}
                        />
                        <br />
                        <button className="button is-primary bg-primary my-4 float-right" type={'submit'}>
                            Zaloguj
                        </button>
                    </div>
                </form>
                {searchParams.get('error') === 'true' && (
                    <p className={'text-red my-2'}>Nieprawidłowe dane logowania</p>
                )}
            </div>
        </main>
    );
}
