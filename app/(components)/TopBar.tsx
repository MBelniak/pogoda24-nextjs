'use client';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faSmileBeam } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TopBar: React.FC = () => {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname.includes('admin')) {
            const $navbarBurger = document.querySelectorAll('.navbar-burger')[0];
            const $target = document.getElementById(($navbarBurger as HTMLElement).dataset.target!);

            $navbarBurger.addEventListener('click', () => {
                $navbarBurger.classList.toggle('is-active');
                $target?.classList.toggle('is-active');
            });

            const links = Array.prototype.slice.call(document.getElementsByClassName('navbar-item'), 0);
            links.forEach(link => {
                link.addEventListener('focus', () => link.blur());
                link.addEventListener('click', () => {
                    $target?.classList.remove('is-active');
                    $navbarBurger.classList.remove('is-active');
                });
            });
        }
    }, []);

    return (
        <>
            {pathname.includes('admin') || (
                <nav
                    className="overflow-hidden relative w-full topBar navbar"
                    role="navigation"
                    aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link href={'/'} className={'navbar-item navbar-brand-item'}>
                            <Image src="/logo-wHalo.png" alt="me" width="64" height="64" className={'logoImg'} />
                            <div style={{ marginLeft: '5px' }}>E-Pogoda24/7</div>
                        </Link>
                        <a
                            role="button"
                            className="navbar-burger burger"
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="pogodaMenu">
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                        </a>
                    </div>
                    <div id="pogodaMenu" className="navbar-menu">
                        <div className="navbar-end">
                            <Link href={'/posts/forecasts/0'} className={'navbar-item'}>
                                <FontAwesomeIcon fixedWidth icon={faCloudSun} className={'mx-2'} />
                                Prognozy
                            </Link>
                            <Link href={'/posts/warnings/0'} className={'navbar-item'}>
                                <FontAwesomeIcon fixedWidth icon={faBolt} className={'mx-2'} />
                                Ostrzeżenia
                            </Link>
                            <Link href={'/posts/facts/0'} className={'navbar-item'}>
                                <FontAwesomeIcon fixedWidth icon={faNewspaper} className={'mx-2'} />
                                Artykuły
                            </Link>
                            <Link href={'/onas'} className={'navbar-item'}>
                                <FontAwesomeIcon fixedWidth icon={faSmileBeam} className={'mx-2'} />O Nas
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};
