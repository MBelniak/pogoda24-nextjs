import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { cloudinary } from '@/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import classNames from 'classnames';
import { DayOrNight } from '@/app/admin/generator/page';

interface IconSelectLabelProps {
    iconCodesJson: Record<string, string>;
    iconCode: string;
    dayOrNight: DayOrNight;
}

export const IconSelectLabel: React.FC<IconSelectLabelProps> = props => {
    return (
        <div className={classNames('flex w-full  items-center', { 'bg-primary': props.dayOrNight === 'night' })}>
            <div className="w-[50px] h-[50px]">
                <AdvancedImage
                    format="png"
                    quality="auto"
                    cldImg={cloudinary
                        .image(props.iconCodesJson[props.iconCode] + '.png')
                        .format('png')
                        .quality('auto')
                        .resize(fill().gravity('faces'))}
                />
            </div>
            <div className="w-[50px] h-[50px]">
                <i style={{ font: 'italic', fontSize: '1rem' }}>({props.iconCode})</i>
            </div>
        </div>
    );
};
