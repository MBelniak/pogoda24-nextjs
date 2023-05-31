import React from 'react';

import { firestore } from 'firebase-admin';
import Timestamp = firestore.Timestamp;
import { PostType } from '@/model';
import { Divider } from '@/shared-components/Divider';
import { ForecastMapList } from '@/app/(components)/ForecastMapList';

export interface PostProps {
    postType: PostType;
    postDate: Timestamp;
    title: string;
    description: string;
    imagesPublicIds: string[];
}

export const Post = (props: PostProps) => {
    const processDate = (postDate: Timestamp) => {
        const date = postDate.toDate().toLocaleString('pl-PL');
        return date.replace(', ', ' o ');
    };

    const processDescriptionForFact = (description: string) => {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: description.replace(/\\"/g, '"')
                }}
            />
        );
    };

    const processDescription = (description: string) => {
        return description.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
    };

    return (
        <div className="post mb-4 p-4 bg-white rounded-xl text-center">
            <div className="postdate fontSizeSmall">{processDate(props.postDate)}</div>
            <br />
            <div className="postTitle fontSizeLarge">
                <span style={{ wordWrap: 'break-word' }}>{props.title}</span>
            </div>
            <div className="postDescription fontSizeSmall">
                {props.postType === PostType.FACT ? (
                    processDescriptionForFact(props.description)
                ) : (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: processDescription(props.description)
                        }}
                        style={{
                            wordWrap: 'break-word'
                        }}
                    />
                )}
            </div>
            {props.postType !== PostType.FACT && props.imagesPublicIds.length > 0 ? (
                <>
                    <Divider />
                    <div style={{ textAlign: 'center' }}>
                        <ForecastMapList imagesPublicIds={props.imagesPublicIds} />
                    </div>
                </>
            ) : null}
        </div>
    );
};
