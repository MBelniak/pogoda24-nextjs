'use client';
import React, { ChangeEvent } from 'react';
import { DayOrNight } from '@/app/admin/generator/page';

interface DayNightDateProps {
    dayOrNight: DayOrNight;
    onDayNightChange: (dayOrNight: DayOrNight) => void;
    date: string;
    onDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface DayNightDateState {
    date: string;
}

export const DayNightDate: React.FC<DayNightDateProps> = props => {
    const onDayNightChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            props.onDayNightChange(e.target.id as DayOrNight);
        }
    }, []);

    return (
        <div className="flex-grow-0 flex-shrink basis-[220px] m-1 p-2 border-2 border-secondary rounded-xl">
            <input type="radio" id="day" checked={props.dayOrNight === 'day'} onChange={onDayNightChange} />
            <label htmlFor="day"> Dzień</label>
            <br />
            <input type="radio" id="night" checked={props.dayOrNight === 'night'} onChange={onDayNightChange} />
            <label htmlFor="night"> Noc</label>
            <input type="text" placeholder="Data" className="input" value={props.date} onChange={props.onDateChange} />
        </div>
    );
};
