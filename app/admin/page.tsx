import React from 'react';
import { Links } from '@/app/admin/(components)/Links';
import { Copyright } from '@/app/admin/(components)/Copyright';

export default function Admin() {
    const FlaticonAttribution = () => {
        return (
            <div className="attribution">
                Icons made by{' '}
                <a href="https://www.flaticon.com/authors/freepik" title="Freepik" target="_blank">
                    Freepik
                </a>
                {', '}
                <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect" target="_blank">
                    Pixel perfect
                </a>
                {', '}
                <a
                    href="https://www.flaticon.com/free-icon/list_847476?term=list&page=2&position=67"
                    title="Kiranshastry"
                    target="_blank">
                    Kiranshastry
                </a>
                {', '}
                <a href="https://www.flaticon.com/authors/itim2101" title="itim2101" target="_blank">
                    itim2101
                </a>
                {', '}
                <a href="https://www.flaticon.com/authors/tomas-knop" title="Tomas Knop">
                    Tomas Knop
                </a>
                {', '}
                <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons" target="_blank">
                    Those Icons
                </a>{' '}
                from{' '}
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-[100svh] min-w-[100%] bg-primary justify-between">
            <section>
                <Links />
            </section>
            <Copyright fontColor={'white'}>
                <FlaticonAttribution />
            </Copyright>
        </div>
    );
}
