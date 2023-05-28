import React from 'react';
import { Divider } from './Divider';

export const ExternalApi = () => {
    return (
        <div className="px-4 h-full align-text-center">
            <div>
                <p className={'p-1 pt-0'}>Wyładowania (PŁB)</p>
                <a href="https://burze.dzis.net/?page=mapa&animacja=on">
                    <img src="https://burze.dzis.net/img/mapa_burzowa_anim.gif" alt="Mapa burzowa Polski" />
                </a>
            </div>
            <Divider />
            <div>
                <p className={'p-1 pt-0'}>Ostrzeżenia (PŁB)</p>
                <a href="https://burze.dzis.net/?page=mapa_ostrzezen" target="_blank">
                    <img src="https://burze.dzis.net/img/zagrozenia.gif" alt="Mapa ostrzeżeń dla Polski" />
                </a>
            </div>
            <Divider />
            <div>
                <p className={'p-1 pt-0'}>Zachmurzenie (Sat24)</p>
                <a href="https://pl.sat24.com/pl/pl/visual" target="_blank">
                    <img
                        src="https://api.sat24.com/animated/PL/visual/1/Central%20European%20Standard%20Time/7296177"
                        alt="Zachmurzenie"
                    />
                </a>
            </div>
            <Divider />
            <div>
                <p className={'p-1 pt-0'}>Opady (Sat24)</p>
                <a href="https://pl.sat24.com/pl/pl/rainTMC" target="_blank">
                    <img
                        src="https://api.sat24.com/animated/PL/rainTMC/1/Central%20European%20Standard%20Time/847023"
                        alt="Opady"
                    />
                </a>
            </div>
        </div>
    );
};
