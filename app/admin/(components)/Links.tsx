'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3 });

export const Links = () => {
    const router = useRouter();
    async function logout() {
        const res = await axios.post('/admin/logout');
        if (res.status === 200) {
            router.push('/admin/login');
        }
    }

    return (
        <div className="my-2 flex flex-wrap justify-center content-start">
            <div className="border-4 border-white rounded-xl flex-grow-0 flex-shrink basis-[190px] p-2 m-1 text-center cursor-pointer">
                <Link href="generator">
                    <Image src="/poland.png" alt={'Generator'} width={100} height={100} className={'w-full p-2'} />
                    <span className={'text-white text-xl'}>Generator</span>
                </Link>
            </div>
            <div className="border-4 border-white rounded-xl flex-grow-0 flex-shrink basis-[190px] p-2 m-1 text-center cursor-pointer">
                <Link href="writer">
                    <Image src={'/add.png'} alt={'Dodaj post'} width={100} height={100} className={'w-full p-2'} />
                    <span className={'text-white text-xl'}>Nowy post</span>
                </Link>
            </div>
            <div className="border-4 border-white rounded-xl flex-grow-0 flex-shrink basis-[190px] p-2 m-1 text-center cursor-pointer">
                <Link href="factwriter">
                    <Image
                        src={'/addFact.png'}
                        alt={'Dodaj artykuł'}
                        width={100}
                        height={100}
                        className={'w-full p-2'}
                    />
                    <span className={'text-white text-xl'}>Nowy artykuł</span>
                </Link>
            </div>
            <div className="border-4 border-white rounded-xl flex-grow-0 flex-shrink basis-[190px] p-2 m-1 text-center cursor-pointer">
                <Link href="list">
                    <Image src={'/list.png'} alt={'Lista postów'} width={100} height={100} className={'w-full p-2'} />
                    <span className={'text-white text-xl'}>Lista postów</span>
                </Link>
            </div>
            <div className="border-4 border-white rounded-xl flex-grow-0 flex-shrink basis-[190px] p-2 m-1 text-center cursor-pointer">
                <Link href="traffic">
                    <Image
                        src={'/statistics.png'}
                        alt={'Statystyki'}
                        width={100}
                        height={100}
                        className={'w-full p-2'}
                    />
                    <span className={'text-white text-xl'}>Statystyki</span>
                </Link>
            </div>
            <div className="border-4 border-white rounded-xl flex-grow-0 flex-shrink basis-[190px] p-2 m-1 text-center cursor-pointer">
                <Link href="files">
                    <Image src={'/files.png'} alt={'Mapki'} width={100} height={100} className={'w-full p-2'} />
                    <span className={'text-white text-xl'}>Przydatne mapki</span>
                </Link>
            </div>
            <div className="border-4 border-white rounded-xl flex-grow-0 flex-shrink basis-[190px] p-2 m-1 text-center cursor-pointer">
                <Image
                    src={'/logout.png'}
                    alt={'Wyloguj'}
                    width={100}
                    height={100}
                    className={'w-full p-2'}
                    onClick={logout}
                />
                <span className={'text-white text-xl'}>Wyloguj</span>
            </div>
        </div>
    );
};
