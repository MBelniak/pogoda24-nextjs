'use client';
import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { cloudinary } from '@/cloudinary';

export const ForecastMapList: React.FC<{ imagesPublicIds: string[] }> = ({ imagesPublicIds }) => {
    return (
        <div className="columns is-centered is-multiline">
            {imagesPublicIds.map((imagePublicId, i) => (
                <div className="forecastMapImage column is-half" key={i}>
                    <AdvancedImage
                        cldImg={cloudinary
                            .image(imagePublicId)
                            .format('png')
                            .quality('auto')
                            .resize(fill().gravity('faces'))}></AdvancedImage>
                </div>
            ))}
        </div>
    );
};
