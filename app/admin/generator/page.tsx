'use client';
import React, { ChangeEvent } from 'react';
import { imgSrcsDay, imgSrcsNight } from '@/app/admin/generator/meta/consts';
import { saveCookie } from '@/app/(utils)/getCookie';
import { Canvas } from '@/app/admin/generator/(components)/Canvas';
import { DayNightDate } from '@/app/admin/generator/(components)/DayNightDate';
import { CityComponent } from '@/app/admin/generator/(components)/CityComponent';
import Link from 'next/link';
import { Copyright } from '@/app/admin/(components)/Copyright';
import { getInitialCityData, useGenerator } from '@/app/admin/generator/hooks/useGenerator';
import { Modal } from '@/app/(components)/Modal';
import classNames from 'classnames';

type CityData = {
    temperature: string;
    iconCode: keyof typeof imgSrcsDay | keyof typeof imgSrcsNight | null;
};

export interface CityDataMap {
    [cityKey: string]: CityData;
}

export type DayOrNight = 'day' | 'night';

export default function Generator() {
    const {
        cityDataMap,
        setCityDataMap,
        date,
        setDate,
        dayOrNight,
        setDayOrNight,
        redrawMap,
        modalOpen,
        modalContent,
        closeModal
    } = useGenerator();

    const onDayNightChange = (dayOrNight: DayOrNight) => {
        saveCookie('new_generator_time', dayOrNight);

        setDayOrNight(dayOrNight);
        setCityDataMap(getInitialCityData());
    };
    const onTemperatureChange = (cityName: string, temperature: string) => {
        const currentMap = cityDataMap;
        currentMap[cityName] = { ...currentMap[cityName], temperature: temperature };
        setCityDataMap({ ...currentMap });
        saveCookie('new_generator_' + cityName + '_temp', temperature);
    };

    const onIconSelected = (cityName: string, iconCode: string | null) => {
        const currentMap = cityDataMap;
        currentMap[cityName] = { ...currentMap[cityName], iconCode: iconCode };
        setCityDataMap(currentMap);
        saveCookie('new_generator_' + cityName + '_type', iconCode ?? '');
    };
    const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const clearTemperatureInputs = () => {
        const newMap: CityDataMap = {};
        Object.keys(cityDataMap).forEach(key => {
            newMap[key] = {
                temperature: '',
                iconCode: cityDataMap[key].iconCode
            };
        });
        setCityDataMap(newMap);
    };

    return (
        <div
            className={classNames('main', {
                'bg-primary': dayOrNight === 'night',
                'text-white': dayOrNight === 'night'
            })}>
            <section className="container is-fluid">
                <Modal isOpen={modalOpen}>
                    <div>
                        <p className="mb-2">{modalContent}</p>
                        <button
                            className="button bg-primary text-white"
                            style={{ float: 'right' }}
                            onClick={closeModal}>
                            Ok
                        </button>
                    </div>
                </Modal>
                <Canvas />
                <div className="flex flex-wrap justify-center mt-4">
                    <DayNightDate
                        dayOrNight={dayOrNight}
                        onDayNightChange={onDayNightChange}
                        onDateChange={onDateChange}
                        date={date}
                    />
                    <div className="basis-full h-0" />
                    {Object.keys(cityDataMap).map((cityName, key) => {
                        return (
                            <CityComponent
                                temperature={cityDataMap[cityName].temperature}
                                iconCode={cityDataMap[cityName].iconCode}
                                key={key}
                                cityName={cityName}
                                dayOrNight={dayOrNight}
                                onTemperatureChange={onTemperatureChange}
                                onIconSelected={onIconSelected}
                            />
                        );
                    })}
                </div>
                <button className="button w-full" onClick={() => redrawMap(true)}>
                    Generuj
                </button>
                <Link href="/write" className="button w-full">
                    Wróć
                </Link>
                <button className="button w-full" onClick={clearTemperatureInputs}>
                    Wyczyść temperatury
                </button>
            </section>
            <Copyright fontColor={'white'} />
        </div>
    );
}
