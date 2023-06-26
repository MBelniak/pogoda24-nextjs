import React, { ChangeEvent } from 'react';
import { IconSelect } from '@/app/admin/generator/(components)/IconSelect';

interface CityComponentProps {
    cityName: string;
    dayOrNight: 'day' | 'night';
    temperature: string;
    onTemperatureChange: (cityName: string, temperature: string) => void;
    onIconSelected: (cityName: string, iconCode: string | null) => void;
    iconCode: string | null;
}

export const CityComponent: React.FC<CityComponentProps> = props => {
    const onTemperatureChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (input.value.length > 2) {
            input.value = input.value.substr(0, 2 + (parseInt(input.value) < 0 ? 1 : 0));
        }
        props.onTemperatureChange(props.cityName, input.value);
    };

    const onIconSelected = (iconCode: string | null) => {
        props.onIconSelected(props.cityName, iconCode);
    };

    return (
        <div className="flex-grow-0 flex-shrink basis-[220px] m-1 p-2 border-2 border-secondary rounded-xl">
            <p>{props.cityName}</p>
            <input className="input mb-2" type="number" onChange={onTemperatureChange} value={props.temperature} />
            <IconSelect
                onIconSelected={onIconSelected}
                dayOrNight={props.dayOrNight}
                defaultIconCode={props.iconCode}
            />
        </div>
    );
};
