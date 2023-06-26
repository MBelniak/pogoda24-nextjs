import React from 'react';
import Select, { SingleValue } from 'react-select';
import { DayOrNight } from '@/app/admin/generator/page';
import { imgSrcsDay, imgSrcsNight } from '@/app/admin/generator/meta/consts';
import { IconSelectLabel } from '@/app/admin/generator/(components)/IconSelectLabel';
import styles from '@/app/theme.module.scss';
import { StylesConfig } from 'react-select/dist/declarations/src/styles';

type SelectOption = { value: string; label: JSX.Element | null };
const customStyles: (dayOrNight: DayOrNight) => StylesConfig<SelectOption> = dayOrNight =>
    ({
        control: base => ({
            ...base,
            backgroundColor: styles.primaryColor
        }),
        input: base => ({
            ...base,
            height: 55,
            width: 0
        }),
        singleValue: base => ({
            ...base,
            color: 'white',
            width: '100%'
        })
    } as StylesConfig<SelectOption>);

interface IconSelectProps {
    onIconSelected: (iconSrc: string | null) => void;
    dayOrNight: DayOrNight;
    defaultIconCode: string | null;
}

export const IconSelect: React.FC<IconSelectProps> = props => {
    const getOptions = (): SelectOption[] => {
        const iconCodesJson = props.dayOrNight === 'day' ? imgSrcsDay : imgSrcsNight;
        return Object.keys(iconCodesJson).map(obj => {
            return {
                value: obj,
                label: <IconSelectLabel iconCodesJson={iconCodesJson} iconCode={obj} dayOrNight={props.dayOrNight} />
            };
        });
    };

    // @ts-ignore
    const iconsCollection = props.dayOrNight === 'day' ? imgSrcsDay : imgSrcsNight;
    return (
        <>
            <Select<SelectOption>
                options={getOptions()}
                defaultValue={{
                    label: props.defaultIconCode ? (
                        iconsCollection[props.defaultIconCode] ? (
                            <IconSelectLabel
                                iconCodesJson={iconsCollection}
                                iconCode={props.defaultIconCode}
                                dayOrNight={props.dayOrNight}
                            />
                        ) : null
                    ) : null,
                    value: props.defaultIconCode || ''
                }}
                menuPlacement="top"
                placeholder={''}
                styles={customStyles(props.dayOrNight)}
                onChange={(value: SingleValue<SelectOption>) => {
                    value && props.onIconSelected(value.value);
                }}
            />
        </>
    );
};
