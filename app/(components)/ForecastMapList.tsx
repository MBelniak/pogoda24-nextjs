'use client';
import React, { useEffect } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { cloudinary } from '@/cloudinary';
// import { closeModal, showModal } from './ModalWindow';

export const ForecastMapList: React.FC<{ imagesPublicIds: string[] }> = ({ imagesPublicIds }) => {
    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        body.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                // closeModal();
            }
        });

        if (imagesPublicIds.length > 0) {
            const images = document.querySelectorAll('.forecastMapImage img');
            images.forEach(img => {
                img.addEventListener('click', event => {
                    event.stopPropagation();
                    // showModal(
                    //     <div
                    //         style={{
                    //             textAlign: 'center',
                    //             maxWidth: '100%',
                    //             maxHeight: '100%'
                    //         }}
                    //         onClick={() => closeModal()}>
                    //         <img src={img.getAttribute('src')!!} />
                    //     </div>
                    // );
                    // const clickListener = () => closeModal();

                    // body.addEventListener('click', clickListener);
                    // body.addEventListener('click', () => body.removeEventListener('click', clickListener));
                });
            });
        }
    }, []);

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
