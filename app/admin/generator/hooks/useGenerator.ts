'use client';
import { canvasHeight, canvasWidth } from '@/app/admin/generator/(components)/Canvas';
import { cityList, iconLabelH, iconLabelW, imgSrcsDay, imgSrcsNight } from '@/app/admin/generator/meta/consts';
import React, { useEffect, useRef, useState } from 'react';
import { CityDataMap, DayOrNight } from '@/app/admin/generator/page';
import { useModal } from '@/app/(components)/Modal';
import format from 'date-fns/format';

function getCookie(name: string) {
    const cks = document.cookie.split('; ');
    for (let x = 0; x < cks.length; x++) {
        const index = cks[x].indexOf('=');
        const nm = cks[x].substring(0, index);
        if (nm == name) {
            return cks[x].substring(index + 1);
        }
    }
    return null;
}
export const getInitialCityData = (): CityDataMap => {
    const dataMap: CityDataMap = {};
    cityList.forEach(city => {
        dataMap[city.name] = {
            temperature: getCookie('new_generator_' + city.name + '_temp') || '',
            iconCode: getCookie('new_generator_' + city.name + '_type')
        };
    });
    return dataMap;
};

export const useGenerator = () => {
    const savedDayOrNight = getCookie('new_generator_time');
    const { modalOpen, openModal, closeModal } = useModal();
    const [modalContent, setModalContent] = useState<React.ReactNode | undefined>(undefined);
    const canvasContext = useRef<CanvasRenderingContext2D | undefined>(undefined);
    const [dayOrNight, setDayOrNight] = useState<DayOrNight>((savedDayOrNight as DayOrNight) || 'night');
    const [cityDataMap, setCityDataMap] = useState<CityDataMap>(getInitialCityData());
    const [date, setDate] = useState<string>(format(new Date(), 'dd-MM-yyyy'));

    const redrawMap = (generateIconsFlag = false) => {
        const cImg = new Image();
        cImg.src =
            dayOrNight === 'day'
                ? 'https://res.cloudinary.com/pogoda24/image/upload/w_1080,h_720/mapa_dzien_ib0qcl.png'
                : 'https://res.cloudinary.com/pogoda24/image/upload/w_1080,h_720/mapa_noc_s7zhjv.png';
        cImg.onload = () => {
            const canvas = document.getElementById('canvas') as HTMLCanvasElement;
            canvasContext.current = canvas.getContext('2d') as CanvasRenderingContext2D;
            canvasContext.current.clearRect(0, 0, canvasWidth, canvasHeight);
            canvasContext.current.drawImage(cImg, 0, 0, canvasWidth, canvasHeight);

            if (generateIconsFlag) {
                generateIcons();
            }
        };
    };

    const generateIcons = (): void => {
        window.scrollTo(0, 0);
        const iconsJson = dayOrNight === 'day' ? imgSrcsDay : imgSrcsNight;
        for (let index = 0; index < cityList.length; ++index) {
            const iconCode = cityDataMap[cityList[index].name].iconCode;
            if (iconCode === null || typeof iconsJson[iconCode] === 'undefined') {
                setModalContent('Uzupełnij wszystkie ikonki!');
                openModal();
                return;
            }
        }
        const canvas = canvasContext.current;
        if (canvas) {
            cityList.forEach(city => {
                const cityIconCode = cityDataMap[city.name].iconCode!;
                const icon = new Image();
                icon.src =
                    `https://res.cloudinary.com/pogoda24/image/upload/w_${iconLabelW},h_${iconLabelH}/` +
                    iconsJson[cityIconCode] +
                    '.png';
                icon.onload = e => {
                    if (['Tatry', 'Sudety', 'Bieszczady'].indexOf(city.name) > -1) {
                        canvas.drawImage(e.target as CanvasImageSource, city.x, city.y, 60, 60);
                    } else {
                        canvas.drawImage(e.target as CanvasImageSource, city.x, city.y, 65, 65);
                    }
                };
                const temperature = cityDataMap[city.name].temperature;
                if (temperature === '' || parseInt(temperature) < 0) {
                    canvas.fillStyle = '#7CE';
                } else {
                    canvas.fillStyle = '#F40';
                }
                canvas.font = 'bold 33px Calibri';

                if (city.name === 'Poznań') {
                    canvas.fillText(temperature + '°C', city.x + 60, city.y + 45);
                    canvas.strokeText(temperature + '°C', city.x + 60, city.y + 45);
                } else if (city.name === 'Radom') {
                    canvas.fillText(temperature + '°C', city.x + 10, city.y + 5);
                    canvas.strokeText(temperature + '°C', city.x + 10, city.y + 5);
                } else {
                    if (['Tatry', 'Sudety', 'Bieszczady'].indexOf(city.name) > -1) {
                        canvas.font = 'bold 30px Calibri';
                    }
                    canvas.fillText(temperature + '°C', city.x + 60, city.y + 30);
                    canvas.strokeText(temperature + '°C', city.x + 60, city.y + 30);
                }
            });
            canvas.font = 'bold 45px Calibri';
            canvas.fillStyle = 'white';
            canvas.strokeStyle = 'black';
            canvas.fillText(date, 50, 620);
            canvas.strokeText(date, 50, 620);
        }
    };

    useEffect(() => {
        redrawMap();
    }, [dayOrNight]);

    return {
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
    };
};
