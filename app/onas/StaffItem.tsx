import React from 'react';
import config from '../../config/config';

const { cloud_name } = config;

interface Person {
    imagePublicId: string;
    description: string;
}

export const StaffItem: React.FC<{ person: Person }> = ({ person }) => {
    const getDescription = () => {
        const imgTag = `<img
                        src='http://res.cloudinary.com/${cloud_name}/image/upload/c_fill,g_faces/q_auto/${person.imagePublicId}'
                        class="float-left mx-4 w-[7rem] h-[7rem]"
                    />`;
        return imgTag + person.description;
    };

    return (
        <div className="rounded m-2 flex justify-start">
            <p className="text-start m-2 text-sm" dangerouslySetInnerHTML={{ __html: getDescription() }} />
        </div>
    );
};
